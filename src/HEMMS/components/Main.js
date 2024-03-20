import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, G, Circle } from 'react-native-svg';
import data from '../data/data.json';

const CustomYAxis = ({ ticks, scale, unit }) => (
  <Svg>
    <G>
      {ticks.map((tick, index) => (
        <Text
          key={index}
          x={10}
          y={scale(tick) + 10}
          fontSize={10}
          fill="grey"
          textAnchor="end"
        >
          {`${tick} ${unit}`}
        </Text>
      ))}
    </G>
  </Svg>
);

const Main = () => {
  const [selectedData, setSelectedData] = useState(null);

  const formatChartData = () => {
    return data.map(entry => ({
      date: new Date(`${entry.date} ${entry.time}`),
      power: entry.power,
      cost: entry.cost,
    }));
  };

  const chartData = formatChartData();

  const maxPower = Math.max(...chartData.map(entry => entry.power));
  const maxCost = Math.max(...chartData.map(entry => entry.cost));

  const costPerKWH = maxCost / maxPower;

  const handleDataPointPress = (index) => {
    setSelectedData(chartData[index]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <CustomYAxis
          ticks={[0, 5, 10, 15, 20]}
          scale={(value) => (Dimensions.get('window').height - 50) - (value * 10)}
          unit="KWH"
        />
        <LineChart
          data={{
            labels: chartData.map(entry => entry.date.toLocaleTimeString()),
            datasets: [
              {
                data: chartData.map(entry => entry.power),
              },
            ],
          }}
          width={Dimensions.get('window').width - 60}
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
          onDataPointClick={({ index }) => handleDataPointPress(index)}
        />
        <CustomYAxis
          ticks={[0, 1, 2, 3, 4]}
          scale={(value) => (Dimensions.get('window').height - 50) - (value * 10 * costPerKWH)}
          unit="$"
        />
        {selectedData && (
          <View style={styles.selectedDataContainer}>
            <Text>Date: {selectedData.date.toLocaleString()}</Text>
            <Text>Power: {selectedData.power}</Text>
            <Text>Cost: {selectedData.cost}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  selectedDataContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
    elevation: 4,
  },
});

export default Main;
