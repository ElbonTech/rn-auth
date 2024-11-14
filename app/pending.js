import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
export default function PendingVerificationScreen({ navigation }) {
  const [email, setEmail] = useState('');


  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    fetchEmail();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="lock-clock" size={80} color="#FFA726" />
      </View>
      <Text style={styles.title}>Pending Verification</Text>
      <Text style={styles.message}>
        {email ? `${email}, ` : ''}Your account is currently under verification. Please check your email or wait while we complete the process.
      </Text>
      <Button title="Go Back" onPress={handleGoBack} color="#FFA726" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  iconContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF3E0',
    borderRadius: 50,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
});
