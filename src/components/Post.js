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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Post = ({
  postId,
  displayName,
  userImage,
  postImage,
  caption,
  postedAt,
  likedBy,
  totalLikes,
  commentsCount,
  userId,
}) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false); // Track if the current user has liked the post
  const [likesCount, setLikesCount] = useState(totalLikes); // Track the number of likes
  const modalizeRef = useRef(null);
  const currentUser = auth().currentUser;
  const navigation = useNavigation();

  const openCommentSection = () => {
    modalizeRef.current?.open();
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('FriendProfile', {userId});
  };
  // Fetch comments from Firestore
  useEffect(() => {
    const fetchComments = firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const fetchedComments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);
      });

    return () => fetchComments();
  }, [postId]);

  // Check if the user has already liked the post
  useEffect(() => {
    const checkIfLiked = async () => {
      const postRef = firestore().collection('posts').doc(postId);
      const likeDoc = await postRef
        .collection('likes')
        .doc(currentUser.uid)
        .get();
      setLiked(likeDoc.exists); // If the user has liked, set liked to true
    };

    checkIfLiked();
  }, [postId, currentUser.uid]);

  // Add or remove like functionality
  const addLike = async () => {
    const postRef = firestore().collection('posts').doc(postId);

    if (liked) {
      // If the post is already liked, unlike it
      await postRef.collection('likes').doc(currentUser.uid).delete();
      await postRef.update({
        likesCount: firestore.FieldValue.increment(-1), // Decrease the likes count by 1
      });
      setLikesCount(likesCount - 1); // Update local state
      setLiked(false); // Mark as not liked
    } else {
      // If the post is not liked, add a like
      await postRef.collection('likes').doc(currentUser.uid).set({
        userId: currentUser.uid,
        displayName: displayName,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      await postRef.update({
        likesCount: firestore.FieldValue.increment(1), // Increase the likes count by 1
      });
      setLikesCount(likesCount + 1); // Update local state
      setLiked(true); // Mark as liked
    }
  };

  // Add a comment and update comments count
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const postRef = firestore().collection('posts').doc(postId);

        // Add new comment to the comments collection
        await postRef.collection('comments').add({
          comment: newComment,
          displayName: displayName,
          userId: currentUser.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        // Update commentsCount in the posts document
        await postRef.update({
          commentsCount: firestore.FieldValue.increment(1), // Increment the commentsCount by 1
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
      <TouchableOpacity onPress={handleNavigateToProfile} style={styles.header}>
        <Image source={{uri: userImage}} style={styles.userImage} />
        <Text style={styles.username}>{displayName}</Text>
      </TouchableOpacity>

      <Image source={{uri: postImage}} style={styles.postImage} />

      <View style={styles.actions}>
        <TouchableOpacity onPress={addLike} style={styles.commentContainer}>
          <Icon
            name={liked ? 'heart' : 'heart-o'} // Toggle between filled and empty heart
            type="font-awesome"
            size={24}
            color={liked ? 'red' : '#000'}
          />
          {likesCount !== 0 && (
            <Text style={styles.lightText}> {likesCount}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openCommentSection}
          style={styles.commentContainer}>
          <Icon name="comment-o" type="font-awesome" size={24} color="#000" />
          {commentsCount !== 0 && (
            <Text style={styles.lightText}> {commentsCount}</Text>
          )}
        </TouchableOpacity>

        <Icon name="paper-plane-o" type="font-awesome" size={24} color="#000" />
      </View>

      {likesCount > 0 && (
        <Text style={styles.likes}>
          Liked by <Text style={styles.bold}>{likedBy}</Text>
          {likesCount > 1 && (
            <>
              <Text style={styles.bold}> and {likesCount}</Text>
              <Text>others </Text>
            </>
          )}
        </Text>
      )}

      <Text style={styles.caption}>{caption}</Text>

      <Text style={styles.postedAt}>{postedAt}</Text>

      <Modalize ref={modalizeRef} snapPoint={600}>
        <View style={styles.modalContent}>
          <View style={styles.commentSection}>
            <Text style={styles.commentHeader}>Comments</Text>
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
    alignItems: 'center',
    width: '40%',
    justifyContent: 'space-around',
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
  lightText: {
    fontSize: 13,
    marginRight: 5,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
