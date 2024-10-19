import React from 'react';
import {FlatList, StyleSheet, View, Button, Alert} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PostGrid from '../components/PostGrid';
import auth from '@react-native-firebase/auth';  // Import Firebase Auth

const mockPosts = [
  { id: '1', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '2', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '3', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '4', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '5', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '6', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
];

// Moved List Header Component outside the ProfileScreen component
const ProfileListHeader = ({ userProfile, handleLogout }) => {
  return (
    <View>
      <ProfileHeader
        username={userProfile.username}
        profilePicture={userProfile.profilePicture}
        postCount={userProfile.postCount}
        followerCount={userProfile.followerCount}
        followingCount={userProfile.followingCount}
        bio={userProfile.bio}
        isCurrentUser={userProfile.isCurrentUser}
        handleLogout={ handleLogout }
      />
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
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
    <View style={styles.container}>
      {/* Use FlatList to avoid nested VirtualizedList issue */}
      <FlatList
        data={mockPosts}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <PostGrid posts={[item]} />
        )}
        ListHeaderComponent={
          <ProfileListHeader userProfile={userProfile} handleLogout={handleLogout} />
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
  logoutButtonContainer: {
    margin: 20,
  },
});

export default ProfileScreen;
