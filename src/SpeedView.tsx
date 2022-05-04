import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
  Text,
} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface GradientColor {
  color: string;
  opacity: number | string;
}
interface SpeedViewProps {
  percentage: number;
  maxPercentage?: number;
  gradientColorStart?: GradientColor;
  gradientColorEnd?: GradientColor;
  showProgress?: boolean;
  enableBounceEffect?: boolean;
  progressFormatSign?: string;
}

const SpeedView: React.FC<SpeedViewProps> = ({
  percentage = 75,
  maxPercentage = 100,
  gradientColorStart = { color: '#00D9F5', opacity: 1.0 },
  gradientColorEnd = { color: '#00F5A0', opacity: 1.0 },
  showProgress = true,
  enableBounceEffect = true,
  progressFormatSign = undefined,
}) => {
  /* Circle design layout and circular radius */
  const BACKGROUND_STROKE_COLOR = '#303858';
  const { width, height } = Dimensions.get('window');

  const OUTER_CIRCLE_LENGTH = 1000; // 2PI*R
  const Outer_R = OUTER_CIRCLE_LENGTH / (2 * Math.PI);
  const INNER_CIRCLE_LENGTH = 680; // 2PI*R
  const Inner_R = INNER_CIRCLE_LENGTH / (2 * Math.PI);

  // -----
  const circleRef = useRef<any>();
  const circleCircumReference = 2 * Math.PI * Inner_R;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [circlePercentage, setCerclePercentage] = useState<number>(0);
  const iTimeInterval: number = 600;
  const iTimeStoper: number = 2200;
  const duration: number = 600;
  const delay: number = 0;

  useEffect(() => {
    repeateAnimtion();
  }, [percentage]);

  /* 
    Prepare and start animatino of the glowing progress
  */
  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue: toValue,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  /* 
    Set repreated animation for several times to play. play in Time Interval and later destroy repetation
    timer to remove and set percetnage from props 
  */
  let timeInterval: NodeJS.Timer;
  const repeateAnimtion = () => {
    // if (percentage == 0) {
    //   animation(0).stop();
    //   startAnimation();
    //   setCerclePercentage(0);
    //   return;
    // }
    if (enableBounceEffect) {
      clearInterval(timeInterval);
      timeInterval = setInterval(() => {
        let newPercentage = getRandomNumberFromRange(
          getRandomNumberFromRange(20, 90),
          percentage
        );
        animation(newPercentage);
        setCerclePercentage(Math.round(newPercentage));
        startAnimation();
      }, iTimeInterval);

      setTimeout(() => {
        clearInterval(timeInterval);
        animation(percentage);
        startAnimation();
      }, iTimeStoper);
    } else {
      const maxPer = (100 * percentage) / maxPercentage;
      let strokeDashoffset =
        circleCircumReference - (circleCircumReference * maxPer) / 100;
      setCerclePercentage(Math.round(maxPer));
      circleRef?.current?.setNativeProps({
        strokeDashoffset,
      });
    }
  };

  const startAnimation = () => {
    if (circleRef?.current) {
      animatedValue.addListener((e) => {
        const maxPer = (100 * e.value) / maxPercentage;
        let strokeDashoffset =
          circleCircumReference - (circleCircumReference * maxPer) / 100;
        setCerclePercentage(Math.round(maxPer));
        circleRef?.current?.setNativeProps({
          strokeDashoffset,
        });
      });
    }
  };

  function getRandomNumberFromRange(min: number = 1, max: number = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <View style={styles.container}>
      <Svg style={styles.containerSVG}>
        {/* Most Outer Circle */}
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={Outer_R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={50}
        />
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={Outer_R / 1.02}
          stroke={'url(#outerpath)'}
          strokeOpacity={1}
          strokeWidth={15}
          strokeDasharray={2}
        />
        {/* Inner Circle */}
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={Outer_R / 2}
          fill={BACKGROUND_STROKE_COLOR}
          strokeWidth={20}
        />
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={Outer_R / 2.4}
          stroke={'#00D9F5'}
          strokeWidth={8}
          strokeDasharray={1}
        />

        <Defs>
          <RadialGradient
            id="outerpath"
            cx="300"
            cy="550"
            rx="450"
            ry="450"
            fx="200"
            fy="450"
            gradientUnits="userSpaceOnUse"
          >
            <>
              <Stop offset="0" stopColor="#F9F9F9" stopOpacity={0.5} />
              <Stop offset="1" stopColor="#01F3A6" stopOpacity={1.0} />
            </>
          </RadialGradient>
        </Defs>
      </Svg>

      {/* Outer Circle */}
      <Svg style={styles.grdientSvg}>
        {/* Gradient animated circle */}
        <AnimatedCircle
          ref={circleRef}
          cx={width / 2}
          cy={height / 2}
          r={Inner_R}
          stroke={'url(#path)'}
          strokeWidth={15}
          strokeDasharray={circleCircumReference}
          strokeDashoffset={circleCircumReference}
          strokeLinecap={'round'}
          transform={`rotate(-90, ${width / 2}, ${height / 2})`}
        />
        {showProgress && (
          <>
            <Text
              x={width / (progressFormatSign != undefined ? 2 : 2.15)}
              y={height / (progressFormatSign != undefined ? 2.05 : 1.97)}
              fontSize={25}
              fontWeight="800"
              fill="white"
              textAnchor={'middle'}
            >
              {circlePercentage} {progressFormatSign == undefined && '%'}
            </Text>
            {progressFormatSign != undefined && (
              <Text
                x={width / 2}
                y={height / 1.93}
                fontSize={20}
                fontWeight="800"
                fill="white"
                textAnchor={'middle'}
              >
                {progressFormatSign}
              </Text>
            )}
          </>
        )}
        <Defs>
          <LinearGradient id="path" x1={'70%'} y1={'20%'} x2={'40%'} y2={'10%'}>
            <Stop
              offset="0"
              stopColor={gradientColorStart.color}
              stopOpacity={gradientColorStart.opacity}
            />
            <Stop
              offset="1"
              stopColor={gradientColorEnd.color}
              stopOpacity={gradientColorEnd.opacity}
            />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#444B6F',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  containerSVG: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 9,
  },
  grdientSvg: {
    shadowColor: '#00F5A0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 9,
  },
});

export default SpeedView;
