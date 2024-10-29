import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import NotificationItem from '../components/NotificationItem';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {return;}

      const snapshot = await firestore()
        .collection('notifications')
        .where('userId', '==', currentUser.uid)
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get();

      const fetchedNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderNotification = ({item}) => (
    <NotificationItem
      avatar={item.avatar}
      message={item.message}
      time={item.createdAt}
      isFollowRequest={item.type === 'follow'}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Activity</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{paddingBottom: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationsScreen;
