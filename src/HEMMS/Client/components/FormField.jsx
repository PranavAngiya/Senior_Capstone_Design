import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-medium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary items-center flex-row">
        {(title === "Place of Residence" || title === "Change Place of Residence") ? (
          <RNPickerSelect
            onValueChange={handleChangeText}
            items={props.options}
            value={value}
            placeholder={{ label: placeholder }}
            style={{
              inputIOS: {
                flex: 1,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                paddingTop: 30,
                color: 'white'
              },
              inputAndroid: {
                flex: 1,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                paddingTop: 30,
                color: 'white'
              },
              placeholder: {
                flex: 1,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                paddingTop: 30,
                color: '#7B7B8B'
              }
            }}
          />
        ) : (
          <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={(title === "Password" || title === "Confirm Password" || title === "Change Password") && !showPassword}
          />
        )}

        {(title === "Password" || title === "Confirm Password" || title === "Change Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
