import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import Post from '../components/Post';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Mock data for Posts */}
      <Post
        username="john_doe"
        userImage="https://randomuser.me/api/portraits/men/1.jpg"
        postImage="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
        likes={120}
        caption="Enjoying the beautiful view!"
        postedAt="2 hours ago"
      />
      <Post
        username="jane_doe"
        userImage="https://randomuser.me/api/portraits/women/1.jpg"
        postImage="https://images.unsplash.com/photo-1517260911339-4cddb815f0d4"
        likes={200}
        caption="Feeling the breeze!"
        postedAt="4 hours ago"
      />
      {/* Add more posts */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
