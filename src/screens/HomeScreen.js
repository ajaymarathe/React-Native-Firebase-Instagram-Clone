import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator, RefreshControl} from 'react-native';
import Post from '../components/Post';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import { formatTimeAgo } from '../helpers';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // For showing loading indicator while data is being fetched
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh functionality

  const fetchPosts = async () => {
    try {
      const postSnapshot = await firestore()
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get();

      // Array to store promises for fetching user data
      const postsWithUserDataPromises = postSnapshot.docs.map(async doc => {
        const postData = doc.data();
        const userId = postData.userId; // Assuming each post has a userId field

        // Fetch user data from 'users' collection
        const userSnapshot = await firestore()
          .collection('users')
          .doc(userId)
          .get();
        const userData = userSnapshot.data();

        // Merge post data with user data
        return {
          id: doc.id,
          ...postData,
          displayName: userData.displayName,
          userImage: userData.profilePicture,
        };
      });

      // Wait for all the promises to resolve
      const postsWithUserData = await Promise.all(postsWithUserDataPromises);

      setPosts(postsWithUserData);
      setLoading(false); // Data has been fetched
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false); // In case of error, stop loading
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts(); // Refetch the posts
    setRefreshing(false);
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
      renderItem={({item}) => (
        <Post
          postId={item.id}
          displayName={item.displayName}
          userImage={item.userImage}
          postImage={item.mediaUrl}
          likes={item.likesCount}
          caption={item.caption}
          postedAt={formatTimeAgo(item.createdAt)}
          {...item}
          likedBy="Jane Doe"
          totalLikes={item.likesCount}
        />
      )}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
