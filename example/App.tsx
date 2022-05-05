import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Slider from '@react-native-community/slider';
import SpeedView from 'react-native-speed-view';
import { StyleSheet, Text } from 'react-native';

const App = () => {
  const [progressValue, setProgressValue] = useState<number>(0);
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.sliderContainerStyle}>
        <Slider
          style={styles.sliderStyle}
          maximumValue={100}
          minimumValue={0}
          maximumTrackTintColor="lightgray"
          onSlidingComplete={(val) => {
            setProgressValue(Math.round(val));
          }}
        />
        <Text style={styles.progressStyle}>{progressValue}%</Text>
      </View>
      <SpeedView percentage={progressValue} enableBounceEffect={false} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaStyle: {
    // backgroundColor: '#444B6F',
    backgroundColor: '#444B6F',
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
