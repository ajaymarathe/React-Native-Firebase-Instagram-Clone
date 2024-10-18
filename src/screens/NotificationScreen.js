import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import NotificationItem from '../components/NotificationItem';

const mockNotifications = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    message: 'john_doe liked your post.',
    time: '2 hours ago',
    isFollowRequest: false,
  },
  {
    id: '2',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    message: 'jane_doe started following you.',
    time: '3 hours ago',
    isFollowRequest: true,
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    message: 'michael_commented on your post.',
    time: '5 hours ago',
    isFollowRequest: false,
  },
  // Add more mock notifications as needed
];

const NotificationsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Activity</Text>
      </View>

      {mockNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          avatar={notification.avatar}
          message={notification.message}
          time={notification.time}
          isFollowRequest={notification.isFollowRequest}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationsScreen;
