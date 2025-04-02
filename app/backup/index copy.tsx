import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'lucide-react-native';
import { Link } from 'expo-router';

export default function UploadScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    material: string;
    suggestions: Array<{ id: string; title: string; difficulty: string }>;
  }>(null);

  const pickImage = async () => {
    try {
      // Request permissions first (important for web)
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Set the selected image
        setImage(result.assets[0].uri);
        // Start mock analysis
        simulateAnalysis();
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    }
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    
    // Mock AI analysis response after 2 seconds
    setTimeout(() => {
      setResult({
        material: 'Plastic Bottle',
        suggestions: [
          { id: '1', title: 'Plant Pot', difficulty: 'Easy' },
          { id: '2', title: 'Bird Feeder', difficulty: 'Medium' },
          { id: '3', title: 'Lamp Shade', difficulty: 'Hard' },
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.uploadArea} 
          onPress={pickImage}
          activeOpacity={0.7}
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
              >
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.placeholder}>
              <Camera size={48} color="#2F9E44" />
              <Text style={styles.uploadText}>Tap to upload an image</Text>
              <Text style={styles.uploadSubtext}>
                Choose a clear photo of the item you want to upcycle
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {analyzing && (
          <View style={styles.analyzing}>
            <Text style={styles.analyzingText}>🔍 Analyzing your item...</Text>
            <Text style={styles.analyzingSubtext}>
              Our AI is identifying materials and finding creative upcycling ideas
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
              <Link
                key={suggestion.id}
                href={`/idea/${suggestion.id}`}
                asChild>
                <TouchableOpacity style={styles.suggestionCard}>
                  <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                  <View style={[
                    styles.difficultyBadge,
                    suggestion.difficulty === 'Easy' ? styles.difficultyEasy :
                    suggestion.difficulty === 'Medium' ? styles.difficultyMedium :
                    styles.difficultyHard
                  ]}>
                    <Text style={styles.difficultyText}>{suggestion.difficulty}</Text>
                  </View>
                </TouchableOpacity>
              </Link>
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
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
});