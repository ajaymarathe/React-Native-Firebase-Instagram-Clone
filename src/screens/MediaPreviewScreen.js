import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const MediaPreviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { media } = route.params;
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);

  // Function to upload media to Firebase Storage
  const uploadMedia = async (mediaUri) => {
    const user = auth().currentUser;
    if (!user) {
      return null;
    }

    const reference = storage().ref(`posts/${user.uid}/${Date.now()}`);
    await reference.putFile(mediaUri);
    return await reference.getDownloadURL();
  };

  // Fetch current user's data from Firestore
  useEffect(() => {
    const fetchCurrentUserData = async () => {
      const user = auth().currentUser;
      if (!user) {
        return;
      }

      try {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setCurrentUserData({
            displayName: userDoc.data().displayName || 'Unknown User',
            photoURL: userDoc.data().profilePicture || '',
          });
        }
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    };

    fetchCurrentUserData();
  }, []);

  // Function to create a notification for all users
  const createNotificationForAllUsers = async (postId) => {
    if (!currentUserData) return;

    try {
      const usersSnapshot = await firestore().collection('users').get();
      const notificationsBatch = firestore().batch();

      usersSnapshot.forEach((userDoc) => {
        const notificationRef = firestore().collection('notifications').doc();
        notificationsBatch.set(notificationRef, {
          userId: userDoc.id,
          senderId: auth().currentUser.uid,
          postId: postId,
          message: `${currentUserData.displayName} created a new post`,
          type: 'post',
          createdAt: firestore.FieldValue.serverTimestamp(),
          avatar: currentUserData.photoURL,
        });
      });

      await notificationsBatch.commit();
    } catch (error) {
      console.error('Error creating notifications:', error);
    }
  };

  // Function to handle post publishing
  const handlePublish = async () => {
    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a post.');
      return;
    }

    try {
      setLoading(true);

      // 1. Upload media to Firebase Storage and get the download URL
      const mediaUrl = await uploadMedia(media.uri);

      if (!mediaUrl) {
        Alert.alert('Error', 'Failed to upload media.');
        setLoading(false);
        return;
      }

      // 2. Save the post to Firestore
      const postRef = await firestore().collection('posts').add({
        userId: user.uid,
        mediaUrl: mediaUrl,
        caption: caption,
        likesCount: 0,
        commentsCount: 0,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // 3. Create notifications for all users
      await createNotificationForAllUsers(postRef.id);

      // 4. Navigate to Home after successful post creation
      Alert.alert('Success', 'Post published successfully.');
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error publishing post:', error);
      Alert.alert('Error', 'Failed to publish post.');
    } finally {
      setLoading(false);
    }
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
      <Button
        title={loading ? 'Publishing...' : 'Publish'}
        onPress={handlePublish}
        disabled={loading}
      />
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
