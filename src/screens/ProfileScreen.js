import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PostGrid from '../components/PostGrid';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const ProfileListHeader = ({ userProfile, handleLogout, isCurrentUser }) => (
  <View>
    <ProfileHeader
      displayName={userProfile.displayName}
      profilePicture={userProfile.profilePicture}
      postCount={userProfile.postCount}
      followerCount={userProfile.followerCount}
      followingCount={userProfile.followingCount}
      bio={userProfile.bio}
      isCurrentUser={isCurrentUser}
      handleLogout={handleLogout}
    />
  </View>
);

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  // Current logged-in user ID
  const currentUserId = auth().currentUser?.uid;
  // userId from route.params or fallback to currentUserId
  const userId = route.params?.userId || currentUserId;

  // Determine if we're viewing the logged-in user's profile
  const isCurrentUser = userId === currentUserId;

  const fetchUserProfile = async () => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserProfile({
          displayName: userData.displayName || 'No Name',
          profilePicture:
            userData.profilePicture || 'https://via.placeholder.com/150',
          postCount: userData.postCount || 0,
          followerCount: userData.followersCount || 0,
          followingCount: userData.followingCount || 0,
          bio: userData.bio || 'No bio available',
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const postSnapshot = await firestore()
        .collection('posts')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      const posts = postSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserPosts(posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      fetchUserPosts();
    }, [userId])
  );

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Logged Out', 'You have been logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Logout Error', 'An error occurred while logging out.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({ item }) => <PostGrid post={item} />}
        ListHeaderComponent={
          userProfile && (
            <ProfileListHeader
              userProfile={userProfile}
              handleLogout={isCurrentUser ? handleLogout : null}
              isCurrentUser={isCurrentUser}
            />
          )
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
