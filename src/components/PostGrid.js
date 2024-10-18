import React from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const PostGrid = ({ posts }) => {
  const numColumns = 3;
  const imageSize = Dimensions.get('window').width / numColumns;

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={[styles.image, { width: imageSize, height: imageSize }]} />
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: 1,
  },
  image: {
    resizeMode: 'cover',
  },
});

export default PostGrid;
