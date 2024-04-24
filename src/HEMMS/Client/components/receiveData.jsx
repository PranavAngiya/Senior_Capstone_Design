import { Alert } from 'react-native';

import url from '../connection';

const receiveData = () => {

  const fetchurl = url + "/getdata?timeframe=day";
  
  fetch( fetchurl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        Alert.alert("Error", "Failed to get data");
      }
    })
    .then(async (data) => {
      console.log("A");
    })
    .catch((error) => {
      Alert.alert("Network Error", "Failed to connect to the server");
    })
}

export default receiveData;
