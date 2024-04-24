import { LineChart } from "react-native-chart-kit";
import { View, SafeAreaView } from 'react-native';
import data from '../constants/data.json';
import { url } from '../connection';

const CustomChart = () => {
  const labels = data.map((item, index) => {
    if (index % 3 === 0) {
      const date = new Date(item.datetime);
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
      return '';
    }
  });
  const dataset = [{
    data: data.map(item => item.power)
  }];
  
  const receiveData = () => {
    const fetchurl = url + "/getdata?timeframe=day";
    fetch( fetchurl)
      .then((response) => {
        if (response.ok) {
          // Store the data into a variable
          return response.json();
        }
        else {
          Alert.alert("Error", "Failed to get data");
        }
      })
      .then(async (data) => {
        // console.log(data);
        // console.log("Current State: " + data[0].currentState);
      })
      .catch((error) => {
        Alert.alert("Network Error", "Failed to connect to the server");
      })
  }

  receiveData();
    
  return ( 
    <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>  
      <LineChart
        data={{
          labels: labels,
          datasets: dataset
        }}
        width={350}
        height={300}
        // yAxisLabel="$"
        yAxisSuffix=" kWh"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: "#ffa726",
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          },
          propsForBackgroundLines: {
            strokeDasharray: "",
          },
          propsForVerticalLabels: {
            fontWeight: 'bold'
          },
          propsForHorizontalLabels: {
            fontWeight: 'bold'
          }
        }}
        // bezier
        withVerticalLines
        withHorizontalLines
        verticalLabelRotation={30}
        style={{
          marginVertical: 20,
          borderRadius: 16
        }}
      />
    </View>
  );
};

export default CustomChart;
