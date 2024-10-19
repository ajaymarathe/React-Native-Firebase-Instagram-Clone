import React, { useState } from 'react';
import { View, Image, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MediaPreviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { media } = route.params;  // The selected media passed from AddPostScreen
  const [caption, setCaption] = useState('');

  const handlePublish = () => {
    // Publish the post logic (upload media, save to Firestore, etc.)
    console.log('Publishing post:', { media, caption });
    navigation.navigate('Home');  // After publishing, navigate to Home
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: media.uri }} style={styles.media} />
      <TextInput
        placeholder="Write a caption..."
        style={styles.captionInput}
        value={caption}
        onChangeText={setCaption}
      />
      <Button title="Publish" onPress={handlePublish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  media: {
    width: '100%',
    height: 400,
    marginBottom: 10,
  },
  captionInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default MediaPreviewScreen;
