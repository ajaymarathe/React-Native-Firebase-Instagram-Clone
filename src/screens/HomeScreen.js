import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Post from '../components/Post';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import { formatDistanceToNow } from 'date-fns';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // For showing loading indicator while data is being fetched

  useEffect(() => {
    // Function to fetch posts from Firestore
    const fetchPosts = async () => {
      try {
        const snapshot = await firestore().collection('posts').orderBy('createdAt', 'desc').get();
        const postData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData);
        setLoading(false); // Data has been fetched
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false); // In case of error, stop loading
      }
    };

    fetchPosts();
  }, []);

    // Function to format timestamp into "time ago" using date-fns
    const formatTimeAgo = (timestamp) => {
      const postTime = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to Date object
      return formatDistanceToNow(postTime, { addSuffix: true }); // Returns "x minutes ago", "y days ago", etc.
    };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Post
          username={item.username}
          userImage={item.userImage}
          postImage={item.mediaUrl}
          likes={item.likesCount}
          caption={item.caption}
          postedAt={formatTimeAgo(item.createdAt)} // Use formatTimeAgo function with date-fns
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
