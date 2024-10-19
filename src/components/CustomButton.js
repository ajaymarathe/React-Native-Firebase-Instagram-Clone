/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const CustomButton = ({title, onPress, icon, backgroundColor = '#3897f0'}) => {
  return (
    <Button
      title={title}
      icon={
        icon && (
          <Icon
            name={icon}
            type="font-awesome"
            size={20}
            color="white"
            style={{marginLeft: 10}}
          />
        )
      }
      buttonStyle={[styles.button, {backgroundColor}]}
      titleStyle={styles.titleStyle} // Adjusting title style
      containerStyle={styles.containerStyle} // Adjusting button container
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '65%',
    marginVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  titleStyle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});

export default CustomButton;
