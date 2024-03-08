import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import data from '../data/data.json';

export default function Main() {
  const formatChartData = () => {
    return data.map(entry => ({
      date: `${entry.date} ${entry.time}`,
      power: entry.power,
    }));
  };

  const chartData = formatChartData();

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: chartData.map(entry => entry.date),
          datasets: [
            {
              data: chartData.map(entry => entry.power),
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // Adjusted width for better fitting
        height={220}
        yAxisLabel="KWH"
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 10,
  },
});
