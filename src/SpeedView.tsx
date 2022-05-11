import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface GradientColor {
  color: string;
  opacity: number | string;
}

interface SpeedCircleViewProps {
  size: number;
  percentage: number;
  maxPercentage?: number;
  gradientColorStart?: GradientColor;
  gradientColorEnd?: GradientColor;
  showProgress?: boolean;
  enableBounceEffect?: boolean;
  progressFormatSign?: string;
}

const BACKGROUND_STROKE_COLOR = '#303858';

const SpeedView: React.FC<SpeedCircleViewProps> = ({
  size,
  percentage = 75,
  maxPercentage = 100,
  gradientColorStart = { color: '#00D9F5', opacity: 1.0 },
  gradientColorEnd = { color: '#00F5A0', opacity: 1.0 },
  showProgress = true,
  enableBounceEffect = true,
  progressFormatSign = undefined,
}) => {
  const center = size / 2;
  const radius = size / 2 - 50 / 2;
  const innerCircleRadius = radius / 1.55;

  const circleRef = useRef<any>();
  const circleCircumReference = 2 * Math.PI * innerCircleRadius;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [circlePercentage, setCerclePercentage] = useState<number>(0);
  const iTimeInterval: number = 500;
  const iTimeStoper: number = 2200;
  const duration: number = 600;
  const delay: number = 0;

  useEffect(() => {
    if (size > Dimensions.get('screen').width) {
      throw Error('Circle size should be undder screen width size.');
    }
  }, [size]);

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
    clearInterval(timeInterval);
    if (enableBounceEffect) {
      timeInterval = setInterval(() => {
        let newPercentage = randomNumber(randomNumber(20, 90), percentage);
        animation(newPercentage);
        setCerclePercentage(Math.round(newPercentage));
        startAnimation();
      }, iTimeInterval);
    }

    setTimeout(
      () => {
        clearInterval(timeInterval);
        animation(percentage);
        startAnimation();
      },
      enableBounceEffect ? iTimeStoper : iTimeInterval
    );
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

  function randomNumber(min: number = 1, max: number = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <Svg width={size} height={size} style={{ alignSelf: 'center' }}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={BACKGROUND_STROKE_COLOR}
        strokeWidth={size / 7}
      />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={'url(#outerpath)'}
        strokeOpacity={1}
        strokeWidth={size / 20}
        strokeDasharray={2}
      />
      {/* Inner Circle */}
      <Circle
        cx={center}
        cy={center}
        r={radius / 2.1}
        fill={BACKGROUND_STROKE_COLOR}
      />

      <Circle
        cx={center}
        cy={center}
        r={radius / 2.5}
        stroke={'#00D9F5'}
        strokeWidth={size / 45}
        strokeDasharray={1}
      />

      {showProgress && (
        <SvgText
          x={center - 10}
          y={center + 5}
          fontSize={size / 15}
          letterSpacing={10}
          fontWeight="800"
          fill="white"
          textAnchor={'middle'}
        >
          {circlePercentage}
          {progressFormatSign == undefined ? '%' : progressFormatSign}
        </SvgText>
      )}

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

      <AnimatedCircle
        ref={circleRef}
        cx={center}
        cy={center}
        r={innerCircleRadius}
        stroke={'url(#path)'}
        strokeWidth={size / 20}
        strokeDasharray={circleCircumReference}
        strokeDashoffset={circleCircumReference}
        strokeLinecap={'round'}
        transform={`rotate(-90, ${center}, ${center})`}
      />

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
  );
};

export default SpeedView;
