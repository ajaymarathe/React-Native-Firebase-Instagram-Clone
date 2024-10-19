import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PostGrid from '../components/PostGrid';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const mockPosts = [
  { id: '1', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '2', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '3', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '4', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '5', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '6', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
];

const ProfileListHeader = ({ userProfile, handleLogout }) => {
  return (
    <View>
      <ProfileHeader
        displayName={userProfile.displayName}
        profilePicture={userProfile.profilePicture}
        postCount={userProfile.postCount}
        followerCount={userProfile.followerCount}
        followingCount={userProfile.followingCount}
        bio={userProfile.bio}
        isCurrentUser={userProfile.isCurrentUser}
        handleLogout={handleLogout}
      />
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const user = auth().currentUser;
      setLoading(true)
      if (user) {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserProfile({
            displayName: userData.displayName || 'No Name',
            profilePicture: userData.profilePicture || 'https://via.placeholder.com/150',
            postCount: userData.postCount || 0,
            followerCount: userData.followersCount || 0,
            followingCount: userData.followingCount || 0,
            bio: userData.bio || 'No bio available',
            isCurrentUser: true,
          });
        } else {
          console.log('No user data found!');
        }
      }
    } catch (error) {

      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
        data={mockPosts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => <PostGrid posts={[item]} />}
        ListHeaderComponent={
          userProfile && (
            <ProfileListHeader userProfile={userProfile} handleLogout={handleLogout} />
          )
        }
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
