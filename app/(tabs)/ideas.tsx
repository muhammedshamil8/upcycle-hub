import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Link } from 'expo-router';


const IDEAS = [
  {
    id: '1',
    title: 'Cardboard Cat Scratcher',
    material: 'Cardboard',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format',
    category: 0
  },
  {
    id: '2',
    title: 'Glass Bottle Terrarium',
    material: 'Glass',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1485908953667-cf6d88997642?w=500&auto=format',
    category: 1
  },
  {
    id: '3',
    title: 'Tin Can Wind Chimes',
    material: 'Metal',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&auto=format',
    category: 2
  },
  {
    id: '4',
    title: 'Newspaper Basket',
    material: 'Paper',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1583947581924-a6b1cf6b6a9e?w=500&auto=format',
    category: 3
  },
  {
    id: '5',
    title: 'Plastic Bottle Vertical Garden',
    material: 'Plastic',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1560851702-9e5cb104b505?w=500&auto=format',
    category: 4
  },
  {
    id: '6',
    title: 'Mixed Material Wall Art',
    material: 'Assorted Trash',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format',
    category: 5
  },
  {
    id: '7',
    title: 'Cardboard Toy Fort',
    material: 'Cardboard',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1608889825271-9696287a7cc6?w=500&auto=format',
    category: 0
  },
  {
    id: '8',
    title: 'Stained Glass Bottles',
    material: 'Glass',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1605000797499-95e51b1ddf90?w=500&auto=format',
    category: 1
  },
  {
    id: '9',
    title: 'Spoon Wind Spinner',
    material: 'Metal',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500&auto=format',
    category: 2
  },
  {
    id: '10',
    title: 'Paper Bead Jewelry',
    material: 'Paper',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format',
    category: 3
  }
];

export default function IdeasScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {IDEAS.map((idea) => (
          <Link key={idea.id} href={`/idea/${idea.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: idea.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.title}>{idea.title}</Text>
                <View style={styles.details}>
                  <Text style={styles.material}>{idea.material}</Text>
                  <Text style={styles.difficulty}>{idea.difficulty}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
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
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  material: {
    fontSize: 14,
    color: '#495057',
  },
  difficulty: {
    fontSize: 14,
    color: '#2F9E44',
    fontWeight: '500',
  },
});
