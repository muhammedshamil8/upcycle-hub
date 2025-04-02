import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Share2 } from 'lucide-react-native';
import { Link } from 'expo-router';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function UploadScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const { user } = useAuth();
  const [result, setResult] = useState<null | {
    material: string;
    suggestions: Array<{ id: string; title: string; difficulty: string }>;
    analysisId?: string;
  }>(null);

  const pickImage = async () => {
    try {
      // Request permissions first
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    }
  };

  const uploadImage = async (uri: string) => {
    setUploading(true);

    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(uri);

      // Store initial data in Firestore
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'userUploads'), {
        userId: user.uid,
        imageUrl: cloudinaryUrl,
        createdAt: serverTimestamp(),
        status: 'pending_analysis',
      });

      // Start real analysis with AI model
      await analyzeImageWithAI(cloudinaryUrl, docRef.id);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const uploadToCloudinary = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const base64Image = base64Data.split(',')[1];
    const uploadPreset = 'upcycle-hub';
    const cloudName = 'dygz69sh7';

    const formData = new FormData();
    formData.append('file', `data:image/jpeg;base64,${base64Image}`);
    formData.append('upload_preset', uploadPreset);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await cloudinaryResponse.json();
    return data.secure_url;
  };

  const analyzeImageWithAI = async (imageUrl: string, docId: string) => {
    setAnalyzing(true);

    try {
      // Replace with your actual AI API endpoint
      const API_ENDPOINT = 'https://your-ai-service.com/analyze';

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          userId: getAuth().currentUser?.uid,
          docId,
        }),
      });

      if (!response.ok) {
        throw new Error('AI analysis failed');
      }

      const analysisResult = await response.json();

      // Update Firestore with analysis results
      const db = getFirestore();
      await addDoc(collection(db, 'analysisResults'), {
        uploadId: docId,
        userId: getAuth().currentUser?.uid,
        results: analysisResult,
        createdAt: serverTimestamp(),
      });

      // Update UI with results
      setResult({
        material: analysisResult.material || 'Unknown Material',
        suggestions: analysisResult.suggestions || [],
        analysisId: docId,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback to mock data if API fails
      setResult({
        material: 'Plastic Bottle',
        suggestions: [
          { id: '1', title: 'Plant Pot', difficulty: 'Easy' },
          { id: '2', title: 'Bird Feeder', difficulty: 'Medium' },
          { id: '3', title: 'Lamp Shade', difficulty: 'Hard' },
        ],
        analysisId: docId,
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const shareIdea = async (suggestion: {
    id: string;
    title: string;
    difficulty: string;
  }) => {
    if (!result?.analysisId) return;

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('User not authenticated');
      }

      const db = getFirestore();

      // Store shared idea in Firestore
      await addDoc(collection(db, 'sharedIdeas'), {
        userId: user.uid,
        analysisId: result.analysisId,
        suggestion,
        sharedAt: serverTimestamp(),
        likes: 0,
        comments: [],
      });

      Alert.alert('Success', 'Your idea has been shared with the community!');

      // You could also implement actual social sharing:
      // await Share.share({
      //   message: `Check out my upcycling idea: ${suggestion.title} (Difficulty: ${suggestion.difficulty})`,
      //   url: `https://yourapp.com/idea/${suggestion.id}`,
      //   title: 'Share Upcycling Idea'
      // });
    } catch (error) {
      console.error('Sharing failed:', error);
      Alert.alert('Error', 'Failed to share your idea. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.uploadArea}
          onPress={pickImage}
          activeOpacity={0.7}
          disabled={uploading || analyzing}
        >
          {image ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={pickImage}
                activeOpacity={0.8}
                disabled={uploading || analyzing}
              >
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.placeholder}>
              <Camera size={48} color="#2F9E44" />
              <Text style={styles.uploadText}>
                {uploading ? 'Uploading...' : 'Tap to upload an image'}
              </Text>
              <Text style={styles.uploadSubtext}>
                Choose a clear photo of the item you want to upcycle
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {(uploading || analyzing) && (
          <View style={styles.analyzing}>
            <Text style={styles.analyzingText}>
              {uploading
                ? '📤 Uploading your image...'
                : '🔍 Analyzing your item...'}
            </Text>
            <Text style={styles.analyzingSubtext}>
              {uploading
                ? 'Please wait while we upload your image'
                : 'Our AI is identifying materials and finding creative upcycling ideas'}
            </Text>
          </View>
        )}

        {result && (
          <View style={styles.results}>
            <Text style={styles.materialText}>
              ✨ Detected Material: {result.material}
            </Text>
            <Text style={styles.suggestionsTitle}>
              Recommended Upcycling Projects:
            </Text>
            {result.suggestions.map((suggestion) => (
              <View key={suggestion.id} style={styles.suggestionContainer}>
                <Link href={`/idea/${suggestion.id}`} asChild>
                  <TouchableOpacity style={styles.suggestionCard}>
                    <Text style={styles.suggestionTitle}>
                      {suggestion.title}
                    </Text>
                    <View
                      style={[
                        styles.difficultyBadge,
                        suggestion.difficulty === 'Easy'
                          ? styles.difficultyEasy
                          : suggestion.difficulty === 'Medium'
                          ? styles.difficultyMedium
                          : styles.difficultyHard,
                      ]}
                    >
                      <Text style={styles.difficultyText}>
                        {suggestion.difficulty}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Link>
                {/* <TouchableOpacity 
                  style={styles.shareButton}
                  onPress={() => shareIdea(suggestion)}
                >
                  <Share2 size={18} color="#2F9E44" />
                  <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity> */}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
  },
  uploadArea: {
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2F9E44',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(47, 158, 68, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  changeImageText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uploadText: {
    marginTop: 12,
    fontSize: 18,
    color: '#2F9E44',
    fontWeight: '600',
  },
  uploadSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#868E96',
    textAlign: 'center',
  },
  analyzing: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#E6F3E6',
    borderRadius: 12,
  },
  analyzingText: {
    color: '#2F9E44',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  analyzingSubtext: {
    marginTop: 8,
    color: '#2F9E44',
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.8,
  },
  results: {
    marginTop: 24,
  },
  materialText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 16,
  },
  suggestionContainer: {
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  suggestionTitle: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyEasy: {
    backgroundColor: '#E6F3E6',
  },
  difficultyMedium: {
    backgroundColor: '#FFF3BF',
  },
  difficultyHard: {
    backgroundColor: '#FFE3E3',
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  shareButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  shareButtonText: {
    color: '#2F9E44',
    fontWeight: '600',
  },
});
