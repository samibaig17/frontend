import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import { auth } from '../../config/supabase';

const PhoneInputScreen = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleContinue = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    // Format phone number if needed (add country code, etc.)
    const formattedPhone = phone.startsWith('+') ? phone : `+1${phone}`;

    setIsLoading(true);
    try {
      // const { error } = await auth.signInWithPhone(formattedPhone);
      
      // if (error) throw error;
      
      // Navigate to OTP screen with the phone number
      // navigation.navigate('OTPVerification', { phone: formattedPhone });
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Surface style={styles.surface} elevation={2}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome to TapIn
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Enter your phone number to get started
        </Text>

        <TextInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
          mode="outlined"
          placeholder="+1 (123) 456-7890"
          left={<TextInput.Icon icon="phone" />}
          autoFocus
        />

        <Button
          mode="contained"
          onPress={handleContinue}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Continue
        </Button>
      </Surface>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  input: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
  buttonContent: {
    paddingVertical: 6,
  },
});

export default PhoneInputScreen;
