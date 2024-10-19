import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';

const ProfileHeader = ({
  username,
  profilePicture,
  postCount,
  followerCount,
  followingCount,
  bio,
  isCurrentUser,
  handleLogout,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image source={{uri: profilePicture}} style={styles.profilePicture} />
      </View>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{postCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{followerCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Edit Profile Button (for current user) or Follow Button (for others) */}
        {isCurrentUser ? (
          <Button
            title="Edit Profile"
            buttonStyle={styles.editProfileButton}
            titleStyle={styles.buttonText}
            onPress={() => navigation.navigate('EditProfile')}
          />
        ) : (
          <Button
            title="Follow"
            buttonStyle={styles.followButton}
            titleStyle={styles.buttonText}
          />
        )}

        {isCurrentUser && <Icon name="logout" onPress={handleLogout} />}
      </View>

      {/* Bio */}
      <View style={styles.bioContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 0.8,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    fontSize: 12,
    color: 'gray',
  },
  editProfileButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  followButton: {
    backgroundColor: '#3897f0',
    borderRadius: 5,
    paddingHorizontal: 30,
    width: 50,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  bioContainer: {
    marginTop: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  bio: {
    marginTop: 5,
    color: 'gray',
    textAlign: 'center',
  },
});

export default ProfileHeader;
