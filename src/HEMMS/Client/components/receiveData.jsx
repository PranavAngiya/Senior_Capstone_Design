import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

import url from '../connection';

const receiveData = () => {
  const fetchurl = url + "/getdata?timeframe=day";
  
  fetch(fetchurl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        Alert.alert("Error", "Failed to get data");
      }
    })
    .then(async (data) => {
      const filePath = FileSystem.documentDirectory + 'data.json';
      const jsonData = JSON.stringify(data);
      
      try {
        await FileSystem.writeAsStringAsync(filePath, jsonData);

        console.log("Data written to data.json successfully");

      } catch (error) {
        console.error("Error writing to data.json:", error);
        
        Alert.alert("Error", "Failed to write data to data.json");
      }
    })
    .catch((error) => {
      Alert.alert("Network Error", "Failed to connect to the server");
    });
}

export default receiveData;
