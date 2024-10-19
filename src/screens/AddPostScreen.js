import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useFocusEffect, useIsFocused} from '@react-navigation/native';

const AddPostScreen = () => {
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to check if screen is focused


  // Function to open image picker and show recent items
  const openImagePicker = () => {
    console.log('openImagePicker');
    const options = {
      mediaType: 'photo', // you can also allow 'video' or 'mixed'
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        navigation.navigate('Home'); // Navigate back to Home on cancel
      } else if (response.assets) {
        setMedia(response.assets);
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      // Only open the image picker if this screen is focused
      if (isFocused) {
        setMedia([]);
        setSelectedMedia(null);
        openImagePicker();
      }
    }, [isFocused]) // Depend on the focus state
  );

  const handleNext = () => {
    navigation.navigate('MediaPreview', {media: selectedMedia});
  };

  const handleCancel = () => {
    setMedia([]);
    setSelectedMedia(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent</Text>
      <FlatList
        data={media}
        numColumns={3}
        keyExtractor={item => item.uri}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setSelectedMedia(item)}>
            <Image source={{uri: item.uri}} style={styles.image} />
            {selectedMedia?.uri === item.uri && (
              <View style={styles.selectedOverlay} />
            )}
          </TouchableOpacity>
        )}
      />

      {/* Footer with Cancel and Next buttons */}
      <View style={styles.footer}>
        <Button title="Cancel" onPress={handleCancel} />
        <Button title="Next" onPress={handleNext} disabled={!selectedMedia} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 1,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default AddPostScreen;
