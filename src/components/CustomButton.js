import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, icon, backgroundColor = '#3897f0' }) => {
  return (
    <Button
      title={title}
      icon={icon && <Icon name={icon} type="font-awesome" size={20} color="white" />}
      buttonStyle={[styles.button, { backgroundColor }]}
      titleStyle={styles.titleStyle}   // Adjusting title style
      containerStyle={styles.containerStyle}  // Adjusting button container
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '60%',
    marginVertical: 10,
  },
  button: {
    justifyContent: 'center',    // Centers content horizontally
    alignItems: 'center',        // Centers content vertically
    flexDirection: 'row',        // Ensures icon and text are in the same row
    paddingVertical: 10,         // Adds padding for better visual appearance
  },
  titleStyle: {
    flex: 1,                      // Ensures the title takes the space equally
    textAlign: 'center',          // Centers text
    fontSize: 16,                 // Adjusts the font size
    color: 'white',               // Text color
  },
});

export default CustomButton;
