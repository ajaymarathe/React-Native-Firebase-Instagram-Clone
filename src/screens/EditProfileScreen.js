import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState('');

  const navigation = useNavigation();

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleSave = () => {
    // Logic to save profile updates (e.g., send to Firebase or your backend)
    // For now, we just navigate back to ProfileScreen
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={openImagePicker}>
        <Image
          source={profileImage ? { uri: profileImage } : { uri: 'https://randomuser.me/api/portraits/women/8.jpg'}}
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
      <Button title="Save" onPress={handleSave} />
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
