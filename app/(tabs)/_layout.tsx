import { Tabs } from 'expo-router';
import { Upload, Lightbulb, Users , UserCircle } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {

    const { user } = useAuth();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2F9E44',
        tabBarInactiveTintColor: '#868E96',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E9ECEF',
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F8F9FA',
        },
        headerTitleStyle: {
          color: '#2F9E44',
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color, size }) => <Upload size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => <Lightbulb size={size} color={color} />,
        }}
      />
        <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color, size }) => <UserCircle size={size} color={color} />,
          href: user ? '/profile' : '/login',
        }}
      />
    
    
    </Tabs>
  );
}