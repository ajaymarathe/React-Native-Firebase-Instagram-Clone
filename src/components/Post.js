import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Modalize} from 'react-native-modalize';
import firestore from '@react-native-firebase/firestore'; // Firestore for adding comments
import auth from '@react-native-firebase/auth'; // For getting the current user

const Post = ({
  postId, // Assume each post has a unique postId
  displayName,
  userImage,
  postImage,
  likes,
  caption,
  postedAt,
  likedBy,
  totalLikes,
}) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]); // Store comments
  const modalizeRef = useRef(null);
  const currentUser = auth().currentUser;

  // Open the comment section
  const openCommentSection = () => {
    modalizeRef.current?.open();
  };

  console.log('comments', comments)

  // Fetch comments from Firestore
  useEffect(() => {
    const fetchComments = firestore()
      .collection('posts')
      .doc(postId) // Access specific post by postId
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const fetchedComments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);
      });

    return () => fetchComments(); // Cleanup listener
  }, [postId]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (newComment.trim()) {
      const user = {
        displayName: displayName, // Replace with the current user's username
        userId: currentUser.uid, // Replace with the current user's ID
      };

      try {
        await firestore()
          .collection('posts')
          .doc(postId)
          .collection('comments')
          .add({
            comment: newComment,
            displayName: user.displayName,
            userId: user.userId,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        setNewComment(''); // Clear the input field after posting
      } catch (error) {
        Alert.alert('Error', 'Failed to add comment');
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <View style={styles.postContainer}>
      {/* Header: User Avatar and displayName */}
      <View style={styles.header}>
        <Image source={{uri: userImage}} style={styles.userImage} />
        <Text style={styles.username}>{displayName}</Text>
      </View>

      {/* Post Image */}
      <Image source={{uri: postImage}} style={styles.postImage} />

      {/* Post Actions: Like, Comment, Share */}
      <View style={styles.actions}>
        <Icon name="heart-o" type="font-awesome" size={24} color="#000" />
        <TouchableOpacity onPress={openCommentSection}>
          <Icon
            name="comment-o"
            type="font-awesome"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Icon
          name="paper-plane-o"
          type="font-awesome"
          size={24}
          color="#000"
          style={styles.icon}
        />
      </View>

      {/* Likes Display */}
      <Text style={styles.likes}>
        Liked by <Text style={styles.bold}>{likedBy}</Text> and{' '}
        <Text style={styles.bold}>{totalLikes}</Text> others
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
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Text key={index} style={styles.comment}>
                  <Text style={styles.username}>{comment.displayName} </Text>
                  {comment.comment}
                </Text>
              ))
            ) : (
              <Text>No comments yet. Be the first to comment!</Text>
            )}
          </View>

          {/* Comment Input */}
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.commentInputContainer}>
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
