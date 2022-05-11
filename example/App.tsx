import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Slider from '@react-native-community/slider';
import SpeedView from 'react-native-speed-view';
import { StyleSheet, Text } from 'react-native';

const App = () => {
  const initialvalue = 35;
  const [progressValue, setProgressValue] = useState<number>(initialvalue);
  const [circleSize, setCircleSize] = useState<number>(150);
  
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
            value={150}
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
        gradientColorStart={{ color: '#de6262', opacity: '0.6' }}
        gradientColorEnd={{ color: '#ffb88c', opacity: '0.6' }}
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
