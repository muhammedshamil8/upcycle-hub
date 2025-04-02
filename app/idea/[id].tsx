import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { IDEAS } from '@/const/ideas';


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
