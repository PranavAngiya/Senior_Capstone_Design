import React, { useState, useEffect } from 'react';
import { LineChart } from "react-native-chart-kit";
import { View, Alert, Dimensions } from 'react-native';
import { url } from '../connection';

const CustomChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    dataset: [{ data: [] }]
  });

  useEffect(() => {
    receiveData();
  }, []);

  const receiveData = () => {
    const fetchurl = url + "/getdata?timeframe=day";
    fetch(fetchurl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get data");
        }
        return response.json();
      })
      .then((responseData) => {
        if (!Array.isArray(responseData.data)) {
          throw new Error("Received data is not in the expected format");
        }

        const data = responseData.data;

        const labels = [];
        const powerData = [];

        // Loop through data with a step of 50
        for (let i = 0; i < data.length; i += 1) {
          const item = data[i];
          const date = new Date(item.datetime);
          labels.push(date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
          powerData.push(item.cost);
        }

        const dataset = [{
          data: powerData
        }];

        setChartData({ labels, dataset });
      })
      .catch((error) => {
        Alert.alert("Network Error", error.message);
      });
  }


  
  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: chartData.dataset
        }}
        width={Dimensions.get("window").width - 20}
        height={300}
        yAxisLabel="$ "
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