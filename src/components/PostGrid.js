import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions, Modal, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const PostGrid = ({ post }) => {
  const numColumns = 3;
  const imageSize = Dimensions.get('window').width / numColumns;
  const [selectedPost, setSelectedPost] = useState(null);

  const openPostModal = () => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  const renderItem = () => (
    <TouchableOpacity onPress={openPostModal}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: post.mediaUrl }} style={[styles.image, { width: imageSize, height: imageSize }]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {renderItem()}

      {selectedPost && (
        <Modal
          visible={!!selectedPost}
          transparent={true}
          animationType="fade"
          onRequestClose={closePostModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBackground}>
              {/* Swipe down to dismiss */}
              <TouchableOpacity onPress={closePostModal} style={styles.closeIcon}>
                <Icon name="close" type="font-awesome" size={24} color="white" />
              </TouchableOpacity>

              {/* Centered Content */}
              <View style={styles.postContentContainer}>
                <Image source={{ uri: selectedPost.mediaUrl }} style={styles.modalImage} />
                <ScrollView contentContainerStyle={styles.captionContainer}>
                  <Text style={styles.username}>{selectedPost.displayName}</Text>
                  <Text style={styles.caption}>{selectedPost.caption}</Text>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '90%',
    height: '80%',
    backgroundColor: 'black',
    borderRadius: 12,
    overflow: 'hidden',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  postContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  captionContainer: {
    padding: 15,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    color: 'lightgray',
  },
});

export default PostGrid;
