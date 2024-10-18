import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic
    console.log('Logging in with:', email, password);
  };

  return (
    <View style={styles.container}>
      {/* Instagram logo */}
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' }}
        style={styles.logo}
      />

      {/* Reusable Input components */}
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

      {/* Or login with Facebook */}
      <Text style={styles.orText}>OR</Text>
      <CustomButton
        title="Log in with Facebook"
        icon="facebook"
        backgroundColor="#4267B2"
        onPress={() => console.log('Log in with Facebook')}
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
