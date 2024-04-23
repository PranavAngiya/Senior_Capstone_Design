import React, { useState } from "react";
import { curveBasis, line, scaleLinear, scaleTime } from "d3";
import { Easing, View, Pressable, Text, StyleSheet, Alert } from "react-native";
import { url } from "../connection";
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

interface DataItem {
  _id: string; // or whatever type _id is
  datetime: Date; // or whatever type datetime is
  day: string;
  power: number;
  cost: number;
  currentState: string;
}

const receiveData = () => {
  fetch( url + "/getalldata")
    .then((response) => {
      if (response.ok) {
        // Store the data into a variable
        return response.json();
      }
      else {
        Alert.alert("Error", "Failed to get data");
      }
    })
    .then(async (data : DataItem[]) => {
      console.log(data);
      // console.log("Current State: " + data[0].currentState);
    })
    .catch((error) => {
      Alert.alert("Network Error", "Failed to connect to the server");
    })

}


interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

export const LineChart = () => {
  receiveData();
  const transition = useValue<number>(1);
  const state = useValue<{
    current: number;
    next: number;
  }>({
    current: 0,
    next: 1,
  });
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("1D");
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
      <View style={styles.header}>
        <Pressable
          onPress={() => transitionStart(0)}
          style={[styles.buttonStyle, selectedButton === 0 && styles.selectedButton]}
        >
          <Text style={[styles.textStyle, selectedButton === 0 && styles.selectedTextStyle]}>
            Power
          </Text>
        </Pressable>
        <Pressable
          onPress={() => transitionStart(1)}
          style={[styles.buttonStyle, selectedButton === 1 && styles.selectedButton]}
        >
          <Text style={[styles.textStyle, selectedButton === 1 && styles.selectedTextStyle]}>
            Cost
          </Text>
        </Pressable>
      </View>
      
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
      
      <View style={styles.footer}>
        <Pressable
          onPress={() => {setSelectedTime("1D");}}
          style={[styles.timeButtonStyle, selectedTime === "1D" && styles.selectedTimeButtonStyle]}
        >
          <Text style={[styles.timeTextStyle, selectedTime === "1D" && styles.selectedTimeTextStyle]}>
            1D
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {setSelectedTime("1W");}}
          style={[styles.timeButtonStyle, selectedTime === "1W" && styles.selectedTimeButtonStyle]}
        >
          <Text style={[styles.timeTextStyle, selectedTime === "1W" && styles.selectedTimeTextStyle]}>
            1W
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {setSelectedTime("1M");}}
          style={[styles.timeButtonStyle, selectedTime === "1M" && styles.selectedTimeButtonStyle]}
        >
          <Text style={[styles.timeTextStyle, selectedTime === "1M" && styles.selectedTimeTextStyle]}>
            1M
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {setSelectedTime("1Y");}}
          style={[styles.timeButtonStyle, selectedTime === "1Y" && styles.selectedTimeButtonStyle]}
        >
          <Text style={[styles.timeTextStyle, selectedTime === "1Y" && styles.selectedTimeTextStyle]}>
            1Y
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
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    marginBottom: 40,
  },
  footer: {
    flexDirection: "row",
    marginTop: 40,
  },
  buttonStyle: {
    marginRight: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "black",
  },
  selectedButton: {
    backgroundColor: "#FF5722",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  selectedTextStyle: {
    color: "white",
  },
  timeButtonStyle: {
    marginRight: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  selectedTimeButtonStyle: {
    backgroundColor: "#FF5722",
  },
  timeTextStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  selectedTimeTextStyle: {
    color: "white",
  },
});

export default LineChart;
