import { LineChart } from "react-native-chart-kit";

import data from '../../constants/data.json';

const LineChart = () => {
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

export default LineChart;
