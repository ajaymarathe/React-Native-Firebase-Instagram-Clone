import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'; // For uploading profile picture

const EditProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for save process

  const navigation = useNavigation();

  useEffect(() => {
    // Fetch current user data from Firestore
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setName(userData.displayName || '');
            setUserName(userData.username || '');
            setWebsite(userData.website || '');
            setBio(userData.bio || '');
            setProfileImage(
              userData.profilePicture ||
                'https://randomuser.me/api/portraits/women/8.jpg',
            );
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'Failed to fetch user data.');
        }
      }
    };

    fetchUserData();
  }, []);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async imageUri => {
    const user = auth().currentUser;
    if (user && imageUri) {
      const reference = storage().ref(`profile_pictures/${user.uid}`);
      await reference.putFile(imageUri);
      return await reference.getDownloadURL(); // Return the image URL after upload
    }
    return null;
  };

  const handleSave = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        setLoading(true); // Start loading
        let profileImageUrl = profileImage;

        // Upload the profile image if it has been changed
        if (profileImage && !profileImage.startsWith('https://')) {
          profileImageUrl = await uploadImage(profileImage);
        }

        // Update the user data in Firestore
        await firestore().collection('users').doc(user.uid).update({
          displayName: name,
          username: userName,
          website: website,
          bio: bio,
          profilePicture: profileImageUrl,
        });

        Alert.alert('Success', 'Profile updated successfully.');
        navigation.navigate('ProfileScreen'); // Navigate back to ProfileScreen
      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Error', 'Failed to update profile.');
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={openImagePicker}>
        <Image
          source={
            profileImage
              ? {uri: profileImage}
              : {uri: 'https://randomuser.me/api/portraits/women/8.jpg'}
          }
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Profile Photo</Text>
      </TouchableOpacity>

      {/* Form Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Website"
        value={website}
        onChangeText={setWebsite}
      />
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      {/* Save Button */}
      <Button
        title={loading ? 'Updating...' : 'Update'}
        onPress={handleSave}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  changePhotoText: {
    textAlign: 'center',
    color: '#3897f0',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  bioInput: {
    height: 80,
  },
});

export default EditProfileScreen;
