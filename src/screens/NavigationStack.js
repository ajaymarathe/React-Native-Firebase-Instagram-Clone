/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

//Screens
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import AddPostStack from '../navigationstacks/AddPostStack';
import NotificationsScreen from './NotificationScreen';
import ProfileScreenStack from '../navigationstacks/ProfileScreenStack';

// Stack and Tab Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Add') {
            iconName = 'plus-square';
          } else if (route.name === 'Notifications') {
            iconName = 'heart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return (
            <Icon
              name={iconName}
              type="font-awesome"
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddPostStack} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreenStack} />
    </Tab.Navigator>
  );
};

export {HomeStack, AuthStack};
