import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  useColorScheme,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Container } from '@/components/shared/Container';
import { LogOut, User, Mail, Edit2 } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'light';

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile(displayName);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  useEffect(() => {
    setDisplayName(user?.displayName || '');
    if (!user) {
      // router.replace('/login');
      // router.push('/login');
    }
  }, [user]);
  return (
    <Container>
      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' },
        ]}
      >
        <View style={styles.header}>
          {/* <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#111827' }]}>Profile</Text> */}
          <View></View>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={24} color={isDark ? '#FFFFFF' : '#111827'} />
          </Pressable>
        </View>
        <View style={styles.profileSection}>
          <View style={styles.avatarPlaceholder}>
            <User size={32} color={isDark ? '#9CA3AF' : '#6B7280'} />
          </View>

          <View style={styles.infoContainer}>
            {isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDark ? '#374151' : '#F3F4F6',
                      color: isDark ? '#FFFFFF' : '#111827',
                    },
                  ]}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Enter your name"
                  placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                />
                <Pressable
                  style={styles.saveButton}
                  onPress={handleUpdateProfile}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.nameContainer}>
                <Text
                  style={[
                    styles.name,
                    { color: isDark ? '#FFFFFF' : '#111827' },
                  ]}
                >
                  {user?.displayName || 'No name set'}
                </Text>
                <Pressable onPress={() => setIsEditing(true)}>
                  <Edit2 size={20} color="#34D399" />
                </Pressable>
              </View>
            )}

            <View style={styles.emailContainer}>
              <Mail size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
              <Text
                style={[
                  styles.email,
                  { color: isDark ? '#9CA3AF' : '#6B7280' },
                ]}
              >
                {user?.email}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  logoutButton: {
    padding: 8,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  editContainer: {
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  saveButton: {
    backgroundColor: '#34D399',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});
