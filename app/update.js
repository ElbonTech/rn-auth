import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { updateUserDetails } from '@/components/database';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';


const UserDetailsScreen = ({ route, navigation }) => {
    const { email } = useLocalSearchParams(); 

  const [userDetails, setUserDetails] = useState({
    store_details_available: 0,
    verified: 0,
    store_details_number: '',
    company: '',
    company_address: '',
    description: '',
    city: '',
    state: '',
    phone: '',
    company_email: '',
  });

  const handleInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handleUpdate = () => {
    updateUserDetails(
      email,
      userDetails,
      () => {
        Alert.alert('Success', 'User details updated successfully');
        router.push("loading"); // Navigate back to the previous screen
      },
      (error) => {
        Alert.alert('Error', 'Failed to update user details');
        console.error(error);
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Store Details Available 
        e:{email} (1 for Yes, 0 for No):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(userDetails.store_details_available)}
        onChangeText={(value) => handleInputChange('store_details_available', Number(value))}
      />

      <Text style={styles.label}>Verified (1 for Yes, 0 for No):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(userDetails.verified)}
        onChangeText={(value) => handleInputChange('verified', Number(value))}
      />

      <Text style={styles.label}>Store Details Number:</Text>
      <TextInput
        style={styles.input}
        value={userDetails.store_details_number}
        onChangeText={(value) => handleInputChange('store_details_number', value)}
      />

      <Text style={styles.label}>Company:</Text>
      <TextInput
        style={styles.input}
        value={userDetails.company}
        onChangeText={(value) => handleInputChange('company', value)}
      />

      <Text style={styles.label}>Company Address:</Text>
      <TextInput
        style={styles.input}
        value={userDetails.company_address}
        onChangeText={(value) => handleInputChange('company_address', value)}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={userDetails.description}
        onChangeText={(value) => handleInputChange('description', value)}
      />

      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        value={userDetails.city}
        onChangeText={(value) => handleInputChange('city', value)}
      />

      <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        value={userDetails.state}
        onChangeText={(value) => handleInputChange('state', value)}
      />

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={userDetails.phone}
        onChangeText={(value) => handleInputChange('phone', value)}
      />

      <Text style={styles.label}>Company Email:</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={userDetails.company_email}
        onChangeText={(value) => handleInputChange('company_email', value)}
      />
 <Text style={styles.label}></Text>
      <Button title="Update Details" onPress={handleUpdate} color="#FFA726" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 50,
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

export default UserDetailsScreen;
