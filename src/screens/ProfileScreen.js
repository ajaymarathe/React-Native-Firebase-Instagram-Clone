import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PostGrid from '../components/PostGrid';

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
  // Add more mock posts as needed
];

const ProfileScreen = () => {
  const userProfile = {
    username: 'john_doe',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
    postCount: 120,
    followerCount: 250,
    followingCount: 180,
    bio: 'Photographer | Traveler | Dreamer',
    isCurrentUser: true, // Set this to false when viewing other users
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
