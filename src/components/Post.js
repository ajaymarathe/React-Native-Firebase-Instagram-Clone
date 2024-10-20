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

const Post = ({
  postId,
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
  const [comments, setComments] = useState([]);
  const modalizeRef = useRef(null);
  const currentUser = auth().currentUser;

  const openCommentSection = () => {
    modalizeRef.current?.open();
  };

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

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await firestore()
          .collection('posts')
          .doc(postId)
          .collection('comments')
          .add({
            comment: newComment,
            displayName: currentUser.displayName,
            userId: currentUser.uid,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        setNewComment('');
      } catch (error) {
        Alert.alert('Error', 'Failed to add comment');
      }
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{uri: userImage}} style={styles.userImage} />
        <Text style={styles.username}>{displayName}</Text>
      </View>

      <Image source={{uri: postImage}} style={styles.postImage} />

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

      <Text style={styles.likes}>
        Liked by <Text style={styles.bold}>{likedBy}</Text> and{' '}
        <Text style={styles.bold}>{totalLikes}</Text> others
      </Text>

      <Text style={styles.caption}>
        <Text style={styles.username}>{displayName} </Text>
        {caption}
      </Text>

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
