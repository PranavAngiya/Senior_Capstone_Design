import { React, useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

import data from '../data/data.json';

export default function Main({navigation}) {
  const [showPowerGraph, setShowPowerGraph] = useState(true);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    setGraphData(data);
  }, []);

  const toggleGraph = () => {
    setShowPowerGraph(!showPowerGraph);
  };

  const renderYAxisLabel = value => {
    if (showPowerGraph) {
      return `${value} KWh`;
    } else {
      return `$ ${value}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.graphTitle}>
        {showPowerGraph ? 'Power Graph' : 'Cost Graph'}
      </Text>
      
      <View style={styles.graphContainer}>
        <View style={styles.graph}>
          <YAxis
            data={graphData.map(item => (showPowerGraph ? item.power : item.cost))}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fontSize: 10, fill: 'grey' }}
            numberOfTicks={5}
            formatLabel={renderYAxisLabel}
            style={{ width: 50, marginRight: 5 }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={graphData.map(item => (showPowerGraph ? item.power : item.cost))}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              contentInset={{ top: 20, bottom: 20 }}
            >
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10, height: 20 }}
              data={graphData}
              xAccessor={({ index }) => index}
              scale={scale.scaleTime}
              numberOfTicks={5}
              formatLabel={(_value, index) =>
                graphData[index] ? graphData[index].time : ''
              }
            />
          </View>
        </View>
        <Button
          title={showPowerGraph ? 'Show Cost Graph' : 'Show Power Graph'}
          onPress={toggleGraph}
        />

        <Button
          title="Devices"
          onPress={() => {
            navigation.navigate('Devices');
          }}
        />
        <Button
          title="Profile"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <Button
          title="Notifications"
          onPress={() => {
            navigation.navigate('Notifications');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  graphTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  graphContainer: {
    flex: 1,
    width: '95%',
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    padding: 10,
  },
  graph: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '95%',
  },
});
