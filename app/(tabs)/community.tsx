import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';

const POSTS = [
  {
    id: '1',
    username: 'EcoCreator',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    image: 'https://images.unsplash.com/photo-1590764258299-0f91fa7f95e8?w=500',
    title: 'Turned an old plastic bottle into a beautiful plant pot! 🌱',
    likes: 124,
    comments: 15,
  },
  {
    id: '2',
    username: 'UpcyclingPro',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    image: 'https://images.unsplash.com/photo-1590764258299-0f91fa7f95e8?w=500',
    title: 'Made this bird feeder from recycled materials 🐦',
    likes: 89,
    comments: 8,
  },
];

export default function CommunityScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>community page coming soon</Text>

      {/* {POSTS.map((post) => (
        <View key={post.id} style={styles.post}>
          <View style={styles.header}>
            <Image source={{ uri: post.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{post.username}</Text>
          </View>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Heart size={24} color="#495057" />
              <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={24} color="#495057" />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={24} color="#495057" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{post.title}</Text>
        </View>
      ))} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  post: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  actions: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 6,
    color: '#495057',
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    color: '#212529',
    padding: 12,
  },
});
