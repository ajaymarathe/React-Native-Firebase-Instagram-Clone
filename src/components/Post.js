import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const Post = ({username, userImage, postImage, likes, caption, postedAt}) => {
  return (
    <View style={styles.postContainer}>
      {/* Header: User Avatar and Username */}
      <View style={styles.header}>
        <Image source={{uri: userImage}} style={styles.userImage} />
        <Text style={styles.username}>{username}</Text>
      </View>

      {/* Post Image */}
      <Image source={{uri: postImage}} style={styles.postImage} />

      {/* Post Actions: Like, Comment, Share */}
      <View style={styles.actions}>
        <Icon name="heart-o" type="font-awesome" size={24} color="#000" />
        <Icon
          name="comment-o"
          type="font-awesome"
          size={24}
          color="#000"
          style={styles.icon}
        />
        <Icon
          name="paper-plane-o"
          type="font-awesome"
          size={24}
          color="#000"
          style={styles.icon}
        />
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{likes} likes</Text>

      {/* Caption */}
      <Text style={styles.caption}>
        <Text style={styles.username}>{username} </Text>
        {caption}
      </Text>

      {/* Post Time */}
      <Text style={styles.postedAt}>{postedAt}</Text>
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
});

export default Post;
