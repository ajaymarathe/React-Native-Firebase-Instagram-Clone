import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import PostGrid from '../components/PostGrid';
import firestore from '@react-native-firebase/firestore';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const postsSnapshot = await firestore()
          .collection('posts')
          .orderBy('likesCount', 'desc')
          .limit(20)
          .get();

        const postsData = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTopPosts(postsData);
      } catch (error) {
        console.error('Error fetching top posts:', error);
        Alert.alert('Error', 'Failed to load top posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  const renderItem = ({item}) => <PostGrid post={item} />;

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={topPosts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default SearchScreen;
