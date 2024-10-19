import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AddPostScreen from '../screens/AddPostScreen';
import MediaPreviewScreen from '../screens/MediaPreviewScreen';

const Stack = createStackNavigator();

function AddPostStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="MediaPreview" component={MediaPreviewScreen} />
    </Stack.Navigator>
  );
}

export default AddPostStack;
