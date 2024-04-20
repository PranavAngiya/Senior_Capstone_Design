import React, { useState } from "react";
import { curveBasis, line, scaleLinear, scaleTime } from "d3";
import { Easing, View, Pressable, Text, StyleSheet } from "react-native";
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
  const transition = useValue<number>(1);
  const state = useValue<{
    current: number;
    next: number;
  }>({
    current: 0,
    next: 1,
  });
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const GRAPH_HEIGHT = 250;
  const GRAPH_WIDTH = 320;
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
    state.current = {
      current: end,
      next: state.current.current,
    };

    transition.current = 0;
    runTiming(transition, 1, {
      duration: 750,
      easing: Easing.inOut(Easing.cubic),
    });
    setSelectedButton(end);
  };

  const graphData = [makeGraph(PowerData), makeGraph(CostData)];
  const path = useComputedValue(() => {
    const start = graphData[state.current.current]?.curve;
    const end = graphData[state.current.next]?.curve;
    if (!start || !end) return "0";
    const result = start.interpolate(end, transition.current);
    return result?.toSVGString() ?? "0";
  }, [state, transition]);

  return (
    <View style={styles.container}>
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

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => transitionStart(0)}
          style={[styles.buttonStyle, selectedButton === 0 && styles.selectedButton]}
        >
          <Text style={styles.textStyle}>
            Power
          </Text>
        </Pressable>
        <Pressable
          onPress={() => transitionStart(1)}
          style={[styles.buttonStyle, selectedButton === 1 && styles.selectedButton]}
        >
          <Text style={styles.textStyle}>
            Cost
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonStyle: {
    marginRight: 20,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  selectedButton: {
    backgroundColor: "#FF5722",
  },
  textStyle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedTextStyle: {
    color: "white",
  },
});

export default LineChart;
