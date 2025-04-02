import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus } from 'lucide-react-native';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'light';

  const handleSignUp = async () => {
    try {
      setError('');
      await signUp(email, password, name);
      router.replace('/(tabs)/profile');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F9FAFB' }]}>
      <View style={[styles.card, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
        <UserPlus size={48} color={isDark ? '#FFFFFF' : '#111827'} />
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#111827' }]}>Create Account</Text>
        
        {error && <Text style={styles.error}>{error}</Text>}
        
        <TextInput
          style={[styles.input, { 
            backgroundColor: isDark ? '#374151' : '#F3F4F6',
            color: isDark ? '#FFFFFF' : '#111827'
          }]}
          placeholder="Full Name"
          placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, { 
            backgroundColor: isDark ? '#374151' : '#F3F4F6',
            color: isDark ? '#FFFFFF' : '#111827'
          }]}
          placeholder="Email"
          placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          style={[styles.input, { 
            backgroundColor: isDark ? '#374151' : '#F3F4F6',
            color: isDark ? '#FFFFFF' : '#111827'
          }]}
          placeholder="Password"
          placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
            Already have an account?
          </Text>
          <Link href="/login" asChild>
            <Pressable>
              <Text style={styles.link}>Sign In</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginVertical: 24,
  },
  input: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  button: {
    width: '100%',
    backgroundColor: '#34D399',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  error: {
    color: '#EF4444',
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 8,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
  },
  link: {
    color: '#34D399',
    fontFamily: 'Inter-SemiBold',
  },
});