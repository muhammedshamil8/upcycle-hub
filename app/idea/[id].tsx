import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const IDEAS = {
  '1': {
    title: 'Plant Pot from Plastic Bottle',
    material: 'Plastic Bottle',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1534991187874-6cd741aaf39c?w=500',
    description:
      'Transform a plastic bottle into a beautiful plant pot with these simple steps.',
    steps: [
      'Clean the plastic bottle thoroughly',
      'Cut the bottle in half using scissors',
      'Make drainage holes in the bottom',
      'Paint or decorate the exterior (optional)',
      'Add soil and your plant',
    ],
    tools: ['Scissors', 'Paint (optional)', 'Drill or sharp object for holes'],
  },
  '2': {
    title: 'Bird Feeder',
    material: 'Plastic Bottle',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1590764258299-0f91fa7f95e8?w=500',
    description:
      'Create a functional bird feeder from a recycled plastic bottle.',
    steps: [
      'Clean and dry the bottle',
      'Cut small feeding holes',
      'Create perches using wooden dowels',
      'Attach hanging mechanism',
      'Fill with bird seed',
    ],
    tools: ['Scissors', 'Wooden dowels', 'String or wire'],
  },
  '3': {
    title: 'Lamp Shade',
    material: 'Glass Bottle',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
    description: 'Turn a glass bottle into an elegant lamp shade.',
    steps: [
      'Clean the glass bottle',
      'Remove any labels',
      'Install lighting fixture',
      'Add decorative elements',
      'Test the lighting',
    ],
    tools: ['Lighting kit', 'Sandpaper', 'Glass cleaner'],
  },
  '4': {
    title: 'Denim Tote Bag',
    material: 'Old Jeans',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563170351-82e6ba78682e?w=500',
    description: 'Upcycle worn-out jeans into a sturdy and stylish tote bag.',
    steps: [
      'Cut legs off jeans at desired bag height',
      'Sew bottom shut with strong thread',
      'Reinforce seams for durability',
      'Create handles from remaining denim',
      'Add pockets or decorations (optional)',
    ],
    tools: ['Scissors', 'Sewing machine/needle', 'Strong thread'],
  },
  '5': {
    title: 'Tin Can Herb Garden',
    material: 'Tin Cans',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500',
    description: 'Organize a vertical herb garden using cleaned tin cans.',
    steps: [
      'Remove labels and clean cans thoroughly',
      'Drill drainage holes in bottoms',
      'Paint or decorate exteriors',
      'Mount on wooden board or wall',
      'Add soil and herb plants',
    ],
    tools: ['Drill', 'Sandpaper', 'Paint (optional)'],
  },
  '6': {
    title: 'Sweater Pillow Covers',
    material: 'Old Sweaters',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1579656592043-0a1d0db1b8a6?w=500',
    description:
      'Give new life to cozy sweaters by transforming them into pillow covers.',
    steps: [
      'Cut sweater to fit pillow size',
      'Sew three sides (right sides together)',
      'Insert pillow form',
      'Sew final side with hidden stitch',
      'Add buttons or zipper (optional)',
    ],
    tools: ['Scissors', 'Sewing machine/needle', 'Measuring tape'],
  },
  '7': {
    title: 'CD Mosaic Art',
    material: 'Old CDs/DVDs',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1579783901589-2f3d5d7edf51?w=500',
    description: 'Create shimmering mosaic art from broken or obsolete discs.',
    steps: [
      'Break CDs into small pieces safely',
      'Design pattern on base surface',
      'Glue pieces in place',
      'Fill gaps with grout (optional)',
      'Seal with clear varnish',
    ],
    tools: ['Safety goggles', 'Strong adhesive', 'Base surface (wood/mirror)'],
  },
  '8': {
    title: 'Pallet Coffee Table',
    material: 'Wooden Pallet',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1555043722-4523113b0e0e?w=500',
    description: 'Build a rustic-chic coffee table from a single pallet.',
    steps: [
      'Sand pallet thoroughly',
      'Reinforce structure if needed',
      'Add legs or casters',
      'Stain or paint as desired',
      'Add glass top (optional)',
    ],
    tools: ['Sander', 'Saw', 'Drill', 'Wood stain/paint'],
  },
  '9': {
    title: 'Wine Cork Bulletin Board',
    material: 'Wine Corks',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1605000797499-95e51b1ddf90?w=500',
    description: 'Make a functional bulletin board from collected wine corks.',
    steps: [
      'Collect enough corks to cover frame',
      'Cut corks lengthwise (optional)',
      'Arrange in desired pattern',
      'Glue to backing board',
      'Mount in frame',
    ],
    tools: ['Hot glue gun', 'Frame', 'Cutting knife'],
  },
  '10': {
    title: 'T-Shirt Rug',
    material: 'Old T-Shirts',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1600181950695-10a2b4d2a1c0?w=500',
    description: 'Braid or weave strips of old t-shirts into a colorful rug.',
    steps: [
      'Cut shirts into long strips',
      'Braid three strips together',
      'Coil braid into oval shape',
      'Sew coils together',
      'Finish edges securely',
    ],
    tools: ['Scissors', 'Needle & thread', 'Non-slip backing (optional)'],
  },
  '11': {
    title: 'Book Shelf from Ladder',
    material: 'Old Ladder',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1586023492125-27a3a5a5c8a3?w=500',
    description: 'Repurpose a wooden ladder into a unique bookshelf.',
    steps: [
      'Clean and sand ladder',
      'Stabilize if needed',
      'Add wooden planks as shelves',
      'Secure to wall for safety',
      'Paint or stain as desired',
    ],
    tools: ['Sander', 'Wood planks', 'Level', 'Brackets'],
  },
  '12': {
    title: 'Mason Jar Organizer',
    material: 'Glass Jars',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500',
    description: 'Create kitchen or craft storage from mason jars.',
    steps: [
      'Clean jars and remove labels',
      'Paint lids (optional)',
      'Attach lids to underside of shelf',
      'Screw jars into lids',
      'Organize small items',
    ],
    tools: ['Screwdriver', 'Wooden board', 'Jar lids'],
  },
  '13': {
    title: 'Bicycle Wheel Clock',
    material: 'Bicycle Wheel',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500',
    description: 'Turn a bicycle wheel into a large wall clock.',
    steps: [
      'Clean and paint wheel (optional)',
      'Install clock mechanism at center',
      'Add numbers or markers',
      'Mount securely on wall',
      'Insert batteries',
    ],
    tools: ['Clock kit', 'Drill', 'Level', 'Sandpaper'],
  },
};

export default function IdeaScreen() {
  const { id } = useLocalSearchParams();
  const idea = IDEAS[id as keyof typeof IDEAS];

  if (!idea) {
    return (
      <View style={styles.container}>
        <Text>Idea not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: idea.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{idea.title}</Text>
        <View style={styles.details}>
          <Text style={styles.material}>Material: {idea.material}</Text>
          <Text style={styles.difficulty}>Difficulty: {idea.difficulty}</Text>
        </View>
        <Text style={styles.description}>{idea.description}</Text>

        <Text style={styles.sectionTitle}>Tools Needed:</Text>
        {idea.tools.map((tool, index) => (
          <Text key={index} style={styles.listItem}>
            • {tool}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Steps:</Text>
        {idea.steps.map((step, index) => (
          <Text key={index} style={styles.listItem}>
            {index + 1}. {step}
          </Text>
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
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  material: {
    fontSize: 16,
    color: '#495057',
  },
  difficulty: {
    fontSize: 16,
    color: '#2F9E44',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
    marginTop: 20,
  },
  listItem: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 8,
    lineHeight: 24,
  },
});
