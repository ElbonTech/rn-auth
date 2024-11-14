import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByEmail } from '@/components/database';
import { router } from 'expo-router';

export default function StartupScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Retrieve email from AsyncStorage
        const email = await AsyncStorage.getItem('userEmail');
        
        if (email) {
          // If email exists, fetch the user details
          getUserByEmail(
            email,
            (user) => {
              if (user) {
                // Navigate based on user data
                if (user.store_details_available === 0) {
                  router.push('update', { email: user.email });
                } else if (user.store_details_available === 1 && user.verified === 0) {
                  router.push('pending', { email: user.email });
                } else if (user.store_details_available === 1 && user.verified === 1) {
                  router.push('(tabs)');
                } else {
                  Alert.alert("Error", "Invalid user data");
                  router.push('LoginScreen');
                }
              } else {
                Alert.alert("Error", "User not found");
                router.push('LoginScreen');
              }
            },
            (error) => {
              console.log("Error retrieving user:", error);
              Alert.alert("Error", "Could not retrieve user details");
              router.push('LoginScreen');
            }
          );
        } else {
          // If no email found, redirect to login
          router.push('LoginScreen');
        }
      } catch (error) {
        console.log("Error accessing AsyncStorage:", error);
        Alert.alert("Error", "An error occurred");
        router.push('LoginScreen');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
    </View>
  );
}
