import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: '832907094489-7ag3tr45i2p9tkan7pclt4et34h5eg4c.apps.googleusercontent.com', // Example Web Client ID
    });
    
  }, []);

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
    // Handle email/password login logic here
  };

  // Google Sign-In handler
  const signInWithGoogle = async () => {
    try {
      // Get the user's ID token from Google
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with Firebase using the credential
      const user = await auth().signInWithCredential(googleCredential);

      console.log('User signed in with Google:', user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelled', 'The user cancelled the login process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login in progress', 'Login is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services not available', 'Google Play Services are required for Google Sign-In');
      } else {
        console.error('Error with Google Sign-In', error);
        Alert.alert('Login error', 'An error occurred during Google Sign-In');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Instagram logo */}
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' }}
        style={styles.logo}
      />

      {/* Email and Password Input */}
      <CustomInput
        placeholder="Phone number, username, or email"
        icon="user"
        value={email}
        setValue={setEmail}
      />
      <CustomInput
        placeholder="Password"
        icon="lock"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <CustomButton title="Log In" onPress={handleLogin} />

      {/* Forgot Password link */}
      <Text style={styles.forgotPassword} onPress={() => console.log('Forgot Password')}>
        Forgot Password?
      </Text>

      {/* OR Text */}
      <Text style={styles.orText}>OR</Text>

      {/* Google Sign-In Button */}
      <CustomButton
        title="Log in with Google"
        icon="google"
        backgroundColor="#F2BC05"
        onPress={signInWithGoogle}
      />

      {/* Sign Up link */}
      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <Text style={styles.signUpText} onPress={() => console.log('Sign Up')}>
          Sign up.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#00376b',
    marginVertical: 10,
  },
  orText: {
    color: 'gray',
    marginVertical: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signUpText: {
    color: '#3897f0',
  },
});

export default LoginScreen;
