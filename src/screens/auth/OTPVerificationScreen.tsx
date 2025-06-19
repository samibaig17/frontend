import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, Surface, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
// import { auth } from '../../config/supabase';

type RootStackParamList = {
  OTPVerification: {
    phone: string;
  };
  RoleSelection: undefined;
};

type OTPVerificationRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(30);
  const navigation = useNavigation();
  const route = useRoute<OTPVerificationRouteProp>();
  const { phone } = route.params;

  useEffect(() => {
    // Start the resend countdown
    if (resendTimeout > 0) {
      const timer = setTimeout(() => {
        setResendTimeout(resendTimeout - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimeout]);

  const handleVerifyOTP = async (code: string) => {
    if (code.length !== 6) return;
    
    setIsLoading(true);
    try {
      // const { error } = await auth.verifyOTP(phone, code);
      
      // if (error) throw error;
      
      // Navigate to role selection on successful verification
      // navigation.navigate('RoleSelection');
    } catch (error) {
      console.error('OTP Verification Error:', error);
      Alert.alert('Error', 'Invalid or expired OTP. Please try again.');
      setOtp('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimeout > 0) return;
    
    setIsLoading(true);
    try {
      // const { error } = await auth.signInWithPhone(phone);
      
      // if (error) throw error;
      
      setResendTimeout(30);
      Alert.alert('Success', 'A new OTP has been sent to your phone.');
    } catch (error) {
      console.error('Resend OTP Error:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
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
          Verify Your Number
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          We've sent a 6-digit code to {phone}
        </Text>

        <View style={styles.otpContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" style={styles.loader} />
          ) : (
            <OTPInputView
              style={styles.otpInputContainer}
              pinCount={6}
              code={otp}
              onCodeChanged={setOtp}
              autoFocusOnLoad
              codeInputFieldStyle={styles.otpInput}
              codeInputHighlightStyle={styles.otpInputHighlight}
              onCodeFilled={handleVerifyOTP}
              keyboardType="number-pad"
            />
          )}
        </View>

        <Button
          mode="text"
          onPress={handleResendOTP}
          disabled={resendTimeout > 0 || isLoading}
          style={styles.resendButton}
        >
          {resendTimeout > 0 
            ? `Resend code in ${resendTimeout}s` 
            : 'Resend code'}
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
    alignItems: 'center',
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
  otpContainer: {
    width: '100%',
    height: 80,
    marginBottom: 16,
  },
  loader: {
    height: 60,
  },
  otpInputContainer: {
    width: '100%',
    height: 60,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    fontSize: 24,
    borderRadius: 4,
  },
  otpInputHighlight: {
    borderColor: '#6200ee',
  },
  resendButton: {
    marginTop: 8,
  },
});

export default OTPVerificationScreen;
