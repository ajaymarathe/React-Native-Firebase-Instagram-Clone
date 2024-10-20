import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Modalize } from 'react-native-modalize';

const Post = ({
  displayName,
  userImage,
  postImage,
  likes,
  caption,
  postedAt,
  likedBy,
  totalLikes,
  comments,
}) => {
  const [newComment, setNewComment] = useState('');
  const modalizeRef = useRef(null);

  // Open the comment section
  const openCommentSection = () => {
    modalizeRef.current?.open();
  };

  // Handle adding a new comment
  const handleAddComment = () => {
    // Here you would send the new comment to your backend or database
    console.log('New comment:', newComment);
    setNewComment(''); // Clear the input field
  };

  return (
    <View style={styles.postContainer}>
      {/* Header: User Avatar and displayName */}
      <View style={styles.header}>
        <Image source={{ uri: userImage }} style={styles.userImage} />
        <Text style={styles.username}>{displayName}</Text>
      </View>

      {/* Post Image */}
      <Image source={{ uri: postImage }} style={styles.postImage} />

      {/* Post Actions: Like, Comment, Share */}
      <View style={styles.actions}>
        <Icon name="heart-o" type="font-awesome" size={24} color="#000" />
        <TouchableOpacity onPress={openCommentSection}>
          <Icon name="comment-o" type="font-awesome" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <Icon name="paper-plane-o" type="font-awesome" size={24} color="#000" style={styles.icon} />
      </View>

      {/* Likes Display */}
      <Text style={styles.likes}>
        Liked by <Text style={styles.bold}>{likedBy}</Text> and <Text style={styles.bold}>{totalLikes}</Text> others
      </Text>

      {/* Caption */}
      <Text style={styles.caption}>
        <Text style={styles.username}>{displayName} </Text>
        {caption}
      </Text>

      {/* Post Time */}
      <Text style={styles.postedAt}>{postedAt}</Text>

      {/* Comment Section Bottom Sheet */}
      <Modalize ref={modalizeRef} snapPoint={600}>
        <View style={styles.modalContent}>
          <Text style={styles.commentHeader}>Comments</Text>

          {/* Display comments */}
          <View style={styles.commentSection}>
            {comments.map((comment, index) => (
              <Text key={index} style={styles.comment}>
                <Text style={styles.username}>{comment.username} </Text>
                {comment.text}
              </Text>
            ))}
          </View>

          {/* Comment Input */}
          <KeyboardAvoidingView behavior="padding" style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Text style={styles.postButton}>Post</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    marginLeft: 10,
  },
  likes: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  caption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  postedAt: {
    color: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
  },
  modalContent: {
    padding: 20,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentSection: {
    marginBottom: 20,
  },
  comment: {
    marginBottom: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  commentInput: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  postButton: {
    color: '#3897f0',
    fontWeight: 'bold',
  },
});

export default Post;
