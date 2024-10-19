import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
// Import the stacks
import {AuthStack, HomeStack} from './src/screens/NavigationStack';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(userData) {
    setUser(userData);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (initializing) {return null;} // Optionally show a loading spinner

  return (
    <NavigationContainer>
      {/* If the user is logged in, show the HomeStack, otherwise show the AuthStack */}
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
