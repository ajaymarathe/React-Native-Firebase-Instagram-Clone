import React, {useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PostGrid from '../components/PostGrid';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useRoute} from '@react-navigation/native';

const ProfileListHeader = ({userProfile}) => (
  <View>
    <ProfileHeader
      displayName={userProfile.displayName}
      profilePicture={userProfile.profilePicture}
      postCount={userProfile.postCount}
      followerCount={userProfile.followerCount}
      followingCount={userProfile.followingCount}
      bio={userProfile.bio}
    />
  </View>
);

const FriendProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  const userId = route.params?.userId;

  const fetchUserProfile = async () => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserProfile({
          displayName: userData.displayName || 'No Name',
          profilePicture:
            userData.profilePicture || 'https://via.placeholder.com/150',
          postCount: userData.postCount || 0,
          followerCount: userData.followersCount || 0,
          followingCount: userData.followingCount || 0,
          bio: userData.bio || 'No bio available',
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const postSnapshot = await firestore()
        .collection('posts')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      const posts = postSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserPosts(posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      fetchUserPosts();
    }, [userId]),
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({item}) => <PostGrid post={item} />}
        ListHeaderComponent={
          userProfile && <ProfileListHeader userProfile={userProfile} />
        }
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendProfile;
