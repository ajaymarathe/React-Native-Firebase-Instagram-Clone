import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const PostGrid = ({ post }) => {
  const numColumns = 3;
  const imageSize = Dimensions.get('window').width / numColumns;

  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: post.mediaUrl }} style={[styles.image, { width: imageSize, height: imageSize }]} />
    </View>
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
