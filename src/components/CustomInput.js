import React from 'react';
import {Input, Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const CustomInput = ({placeholder, icon, value, setValue, secureTextEntry}) => {
  return (
    <Input
      placeholder={placeholder}
      leftIcon={<Icon name={icon} type="font-awesome" size={20} color="gray" />}
      value={value}
      onChangeText={setValue}
      secureTextEntry={secureTextEntry}
      containerStyle={styles.inputContainer}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
});

export default CustomInput;
