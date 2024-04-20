import React, { useState } from "react";
import { curveBasis, line, scaleLinear, scaleTime } from "d3";
import { Easing, View, Pressable, Text, StyleSheet, ScrollView } from "react-native";
import {
  Canvas,
  Line,
  Path,
  runTiming,
  Skia,
  SkPath,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";

import { CostData, DataPoint, PowerData } from "../constants/Data";

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

export const LineChart = () => {
  const transition = useValue(1);
  const [selectedDataType, setSelectedDataType] = useState<number>(0);
  const GRAPH_HEIGHT = 250;
  const GRAPH_WIDTH = 1000;
  const makeGraph = (data: DataPoint[]): GraphData => {
    const max = Math.max(...data.map((val) => val.value));
    const min = Math.min(...data.map((val) => val.value));
    const y = scaleLinear()
      .domain([0, max])
      .range([GRAPH_HEIGHT - 20, 20]);
    const x = scaleTime()
      .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
      .range([20, GRAPH_WIDTH - 20]);
    const curvedLine = line<DataPoint>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.value))
      .curve(curveBasis)(data);
    const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

    return {
      max,
      min,
      curve: skPath!,
    };
  };

  const transitionStart = (end: number) => {
    setSelectedDataType(end);

    transition.current = 0;
    runTiming(transition, 1, {
      duration: 750,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const graphData = [makeGraph(PowerData), makeGraph(CostData)];
  const path = useComputedValue(() => {
    const start = graphData[selectedDataType].curve;
    const end = graphData[selectedDataType === 0 ? 1 : 0].curve;
    const result = start.interpolate(end, transition.current);
    
    return result?.toSVGString() ?? "0";
  }, [selectedDataType, transition]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {selectedDataType === 0 ? "Power vs Time" : "Cost vs Time"}
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={{ width: GRAPH_WIDTH }}>
          <Canvas
            style={{
              width: GRAPH_WIDTH,
              height: GRAPH_HEIGHT,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <Line
              p1={vec(20, GRAPH_HEIGHT - 20)}
              p2={vec(GRAPH_WIDTH - 20, GRAPH_HEIGHT - 20)}
              color="black"
              style="stroke"
              strokeWidth={2}
            />
            <Line
              p1={vec(20, GRAPH_HEIGHT - 20)}
              p2={vec(20, 20)}
              color="black"
              style="stroke"
              strokeWidth={2}
            />

            <Path
              style="stroke"
              path={path}
              strokeWidth={4}
              color="#ff5b5b"
            />
          </Canvas>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => transitionStart(0)}
          style={[
            styles.buttonStyle,
            selectedDataType === 0 && styles.selectedButtonStyle,
          ]}
        >
          <Text style={[styles.textStyle, selectedDataType === 0 && styles.selectedTextStyle]}>
            Power
          </Text>
        </Pressable>
        <Pressable
          onPress={() => transitionStart(1)}
          style={[
            styles.buttonStyle,
            selectedDataType === 1 && styles.selectedButtonStyle,
          ]}
        >
          <Text style={[styles.textStyle, selectedDataType === 1 && styles.selectedTextStyle]}>
            Cost
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonStyle: {
    marginRight: 20,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedButtonStyle: {
    backgroundColor: "#ff5b5b",
    borderColor: "#ff5b5b",
  },
  textStyle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedTextStyle: {
    color: "#fff",
  },
});

export default LineChart;
