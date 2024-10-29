import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FriendProfile from '../screens/FriendProfile';

const Stack = createStackNavigator();

function ProfileScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default ProfileScreenStack;
