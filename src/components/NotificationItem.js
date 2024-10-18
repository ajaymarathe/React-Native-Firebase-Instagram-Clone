import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const NotificationItem = ({avatar, message, time, isFollowRequest}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: avatar}} style={styles.avatar} />

      <View style={styles.textContainer}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      {/* Show Follow Button only for follow requests */}
      {isFollowRequest && (
        <Button
          title="Follow"
          buttonStyle={styles.followButton}
          titleStyle={styles.followButtonText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  followButton: {
    backgroundColor: '#3897f0',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  followButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

export default NotificationItem;
