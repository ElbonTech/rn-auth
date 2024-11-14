import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const router = useRouter();
  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    fetchEmail();
  }, []);
  const [email, setEmail] = useState('');

  const handleNavigateToLoading = () => {
    router.push('/auth'); // Adjust the path to match your loading screen route
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <TouchableOpacity onPress={handleNavigateToLoading} style={styles.touchable}>
        <ThemedView style={styles.titleContainer}>
          <Text type="title">Welcome {email}!</Text>
          <HelloWave />
        </ThemedView>
      </TouchableOpacity>

     
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  touchable: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
