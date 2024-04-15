import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';

const Graph = ({ graphData, xDataKey, yDataKey }) => {
  return (
    <VictoryChart>
      <VictoryLine
        data={graphData}
        x={xDataKey}
        y={yDataKey}
      />
      <VictoryAxis
        dependentAxis
        label={yDataKey}
      />
      <VictoryAxis
        label={xDataKey}
      />
    </VictoryChart>
  );
};

export default Graph;
