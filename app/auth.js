import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { insertUser, getUserByEmail } from '@/components/database';
import { router } from 'expo-router';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);

  const saveEmailToStorage = async (email) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
      console.log("Email saved to AsyncStorage");
    } catch (error) {
      console.log("Failed to save email to AsyncStorage", error);
    }
  };

  const handleSignup = () => {
    insertUser(
      email,
      password,
      async () => {
        Alert.alert("Success", "User registered successfully!");
        setIsSignup(false); // Switch to login mode
        await saveEmailToStorage(email);
      },
      (error) => {
        Alert.alert("Error", "This email is already registered!");
        console.log(error);
      }
    );
  };

  const handleLogin = () => {
    getUserByEmail(
      email,
      async (user) => {
        if (user && user.password === password) {
          await saveEmailToStorage(email);
          if (user.store_details_available === 0) {
            // Navigate to Update Screen
           /// router.push('update', { email: user.email });
            router.push({ pathname: '/update', params: { email: user.email } });
          } else if (user.store_details_available === 1 && user.verified === 0) {
            // Navigate to Pending Verification Screen
            router.push('pending', { email: user.email });
          } else if (user.store_details_available === 1 && user.verified === 1) {
            // Navigate to Dashboard Screen
            router.push('(tabs)');
          }
        } else {
          Alert.alert("Error", "Invalid email or password");
        }
      },
      (error) => {
        Alert.alert("Error", "User not found");
        console.log(error);
      }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
        {isSignup ? "Sign Up" : "Login"}
      </Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 12, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 12, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />
      
      <Button
        title={isSignup ? "Sign Up" : "Login"}
        onPress={isSignup ? handleSignup : handleLogin}
        color="#FFA726"
      />

      <Text
        style={{ marginTop: 20, color: 'blue', textAlign: 'center' }}
        onPress={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </Text>
    </View>
  );
}
