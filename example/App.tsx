import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { StyleSheet, Text } from 'react-native';
import SpeedView from '@mindinventory/react-native-speed-view';

const App = () => {
  const initialvalue = 35;
  const [progressValue, setProgressValue] = useState<number>(initialvalue);
  const [circleSize, setCircleSize] = useState<number>(350);
  
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View>
        <Text
          style={[styles.progressStyle, { alignSelf: 'center', marginTop: 30 }]}
        >
          Circle Progress
        </Text>
        <View style={styles.sliderContainerStyle}>
          <Slider
            style={styles.sliderStyle}
            maximumValue={100}
            minimumValue={0}
            value={initialvalue}
            maximumTrackTintColor="lightgray"
            onSlidingComplete={(val) => {
              setProgressValue(Math.round(val));
            }}
          />
          <Text style={styles.progressStyle}>{progressValue}%</Text>
        </View>
        <Text
          style={[styles.progressStyle, { alignSelf: 'center', marginTop: 20 }]}
        >
          Circle Size
        </Text>
        <View style={styles.sliderContainerStyle}>
          <Slider
            style={styles.sliderStyle}
            maximumValue={450}
            minimumValue={150}
            value={circleSize}
            maximumTrackTintColor="lightgray"
            onSlidingComplete={(val) => {
              setCircleSize(Math.round(val));
              setProgressValue(progressValue);
            }}
          />
          <Text style={styles.progressStyle}>{circleSize}</Text>
        </View>
      </View>
      <SpeedView
        percentage={progressValue}
        size={circleSize}
        showProgress={true}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaStyle: {
    // backgroundColor: '#444B6F',
    backgroundColor: '#444B6F',
    flex: 1,
  },
  sliderContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  sliderStyle: {
    marginHorizontal: 20,
    width: '75%',
  },
  progressStyle: {
    fontWeight: '700',
    color: 'white',
  },
});
