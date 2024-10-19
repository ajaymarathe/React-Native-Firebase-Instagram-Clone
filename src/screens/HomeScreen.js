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
        postImage="https://images.unsplash.com/photo-1445052693476-5134dfe40f70?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        likes={200}
        caption="Feeling the breeze!"
        postedAt="4 hours ago"
      />
      <Post
        username="jane_doe"
        userImage="https://randomuser.me/api/portraits/women/5.jpg"
        postImage="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        likes={200}
        caption="Feeling the breeze!"
        postedAt="4 hours ago"
      />
      <Post
        username="Rita Kumari"
        userImage="https://randomuser.me/api/portraits/women/8.jpg"
        postImage="https://plus.unsplash.com/premium_photo-1676667573156-7d14e8b79ad3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
