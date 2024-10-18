import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import PostGrid from '../components/PostGrid';

const mockPosts = [
  { id: '1', image: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50' },
  { id: '2', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '3', image: 'https://images.unsplash.com/photo-1517260911339-4cddb815f0d4' },
  { id: '4', image: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50' },
  { id: '5', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '6', image: 'https://images.unsplash.com/photo-1517260911339-4cddb815f0d4' },
  // Add more posts as needed
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Grid of Posts */}
      <PostGrid posts={mockPosts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SearchScreen;
