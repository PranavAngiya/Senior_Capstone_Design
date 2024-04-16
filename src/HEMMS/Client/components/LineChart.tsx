import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { GraphData } from '../components/GraphData';
import ButtonSection from '../components/ButtonSection';

type LineChartProps = {
  height: number;
  width: number;
  data: GraphData[];
  leftPadding: number;
  bottomPadding: number;
};

const LineChart: FC<LineChartProps> = ({ height, width, data, leftPadding, bottomPadding }) => {
  const dataToPath = (data: GraphData[]): string => {
    if (data.length === 0) return '';
  
    const maxValue = Math.max(...data.map(point => point.value));
    const path = data.reduce((acc, point, index) => {
      const x = (index / (data.length - 1)) * (width - leftPadding);
      const y = height - (point.value / maxValue) * (height - bottomPadding);
      return acc + `${index === 0 ? 'M' : 'L'}${x},${y}`;
    }, '');
  
    return path;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>LINE CHART</Text>
      </View>
      <Svg style={{ height, width }}>
        <Path
          d={dataToPath(data)}
          stroke="blue"
          fill="none"
          strokeWidth={2}
        />
      </Svg>
      <ButtonSection
        q1Tapped={() => {}}
        q2Tapped={() => {}}
        q3Tapped={() => {}}
        q4Tapped={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default LineChart;
