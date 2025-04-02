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
    title: 'Plant Pot from Plastic Bottle',
    material: 'Plastic Bottle',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
  },
  {
    id: '2',
    title: 'Bird Feeder',
    material: 'Plastic Bottle',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1590764258299-0f91fa7f95e8?w=500',
  },
  {
    id: '3',
    title: 'Lamp Shade',
    material: 'Glass Bottle',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
  },
  {
    id: '4',
    title: 'Denim Tote Bag',
    material: 'Old Jeans',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563170351-82e6ba78682e?w=500',
  },
  {
    id: '5',
    title: 'Tin Can Herb Garden',
    material: 'Tin Cans',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500',
  },
  {
    id: '6',
    title: 'Sweater Pillow Covers',
    material: 'Old Sweaters',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1579656592043-0a1d0db1b8a6?w=500',
  },
  {
    id: '7',
    title: 'CD Mosaic Mirror',
    material: 'Old CDs/DVDs',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1579783901589-2f3d5d7edf51?w=500',
  },
  {
    id: '8',
    title: 'Pallet Coffee Table',
    material: 'Wooden Pallet',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1555043722-4523113b0e0e?w=500',
  },
  {
    id: '9',
    title: 'Wine Cork Key Holder',
    material: 'Wine Corks',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1605000797499-95e51b1ddf90?w=500',
  },
  {
    id: '10',
    title: 'T-Shirt Braided Rug',
    material: 'Old T-Shirts',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1600181950695-10a2b4d2a1c0?w=500',
  },
  {
    id: '11',
    title: 'Ladder Bookshelf',
    material: 'Old Ladder',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1586023492125-27a3a5a5c8a3?w=500',
  },
  {
    id: '12',
    title: 'Mason Jar Spice Rack',
    material: 'Glass Jars',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500',
  },
  {
    id: '13',
    title: 'Bicycle Wheel Clock',
    material: 'Bicycle Wheel',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500',
  },
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
