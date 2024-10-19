import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId:
        '832907094489-7ag3tr45i2p9tkan7pclt4et34h5eg4c.apps.googleusercontent.com', // Example Web Client ID
    });
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('User logged in:', userCredential);
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Login Error', error.message);
    }
  };

  const handleSignUp = async () => {
    if (email && password) {
      try {
        // Sign up the user with email and password
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const {uid, email: userEmail} = userCredential.user;
        console.log('User signed up:', userCredential);

        // Save user data in Firestore
        await firestore().collection('users').doc(uid).set({
          uid: uid,
          username: '',
          bio: '',
          email: userEmail,
          profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
          createdAt: firestore.FieldValue.serverTimestamp(),
          displayName: '',
          website: '',
          followersCount: 0,
          followingCount: 0,
          lastLogin: null,
        });

        Alert.alert('Success', 'User registered successfully!');
        // Navigate to home or profile screen
        // navigation.navigate('HomeStack');
      } catch (error) {
        console.error('Error signing up:', error);
        Alert.alert('Sign-Up Error', error.message);
      }
    } else {
      Alert.alert('Input Error', 'Please enter email and password');
    }
  };

  // Google Sign-In handler
  const signInWithGoogle = async () => {
    try {
      // Get the user's ID token from Google
      const {idToken} = await GoogleSignin.signIn();

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
        Alert.alert(
          'Play Services not available',
          'Google Play Services are required for Google Sign-In',
        );
      } else {
        console.error('Error with Google Sign-In', error);
        Alert.alert('Login error', 'An error occurred during Google Sign-In');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        {/* Instagram logo */}
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
          }}
          style={styles.logo}
        />

        {/* Email and Password Input */}
        <CustomInput
          placeholder="Email"
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
        <Text
          style={styles.forgotPassword}
          onPress={() => console.log('Forgot Password')}>
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
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign up.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
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
