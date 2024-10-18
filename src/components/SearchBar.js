import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchBarContainer}>
      <Input
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Icon name="search" type="font-awesome" color="gray" />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    backgroundColor: '#efefef',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
  },
  input: {
    fontSize: 16,
  },
});

export default SearchBar;
