import React from 'react';
import {ScrollView, StyleSheet, Button, Alert, View} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PostGrid from '../components/PostGrid';
import auth from '@react-native-firebase/auth'; // Import Firebase Auth

const mockPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  },
];

const ProfileScreen = ({navigation}) => {
  const userProfile = {
    username: 'Rita Kumari',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
    postCount: 120,
    followerCount: 250,
    followingCount: 180,
    bio: 'Photographer | Traveler | Dreamer',
    isCurrentUser: true, // Set this to false when viewing other users
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Logged Out', 'You have been logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Logout Error', 'An error occurred while logging out.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <ProfileHeader
        username={userProfile.username}
        profilePicture={userProfile.profilePicture}
        postCount={userProfile.postCount}
        followerCount={userProfile.followerCount}
        followingCount={userProfile.followingCount}
        bio={userProfile.bio}
        isCurrentUser={userProfile.isCurrentUser}
      />

      {/* Post Grid */}
      <PostGrid posts={mockPosts} />

      {/* Logout Button (only visible for the current user) */}
      {userProfile.isCurrentUser && (
        <View style={styles.logoutButtonContainer}>
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoutButtonContainer: {
    margin: 20,
  },
});

export default ProfileScreen;
