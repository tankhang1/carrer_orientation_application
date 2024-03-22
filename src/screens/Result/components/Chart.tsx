import {View, Text} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-gifted-charts';
import {COLORS, FONT, width} from '@utils/config';

const Chart = () => {
  const data = [
    {
      value: 6,
      label: 'R',
      frontColor: COLORS.red,
    },
    {
      value: 9,
      label: 'I',
      frontColor: COLORS.orange,
    },
    {
      value: 7,
      label: 'A',
      frontColor: COLORS.yellow,
    },
    {
      value: 8,
      label: 'S',
      frontColor: COLORS.green,
    },
    {
      value: 6,
      label: 'I',
      frontColor: COLORS.blue,
    },
    {
      value: 5,
      label: 'C',
      frontColor: COLORS.purple,
    },
  ];
  return (
    <View>
      <BarChart
        width={width - 54}
        data={data}
        frontColor="#177AD5"
        horizontalRulesStyle={{
          strokeWidth: 2,
          strokeDasharray: [0, 0],
        }}
        yAxisTextStyle={FONT.content.S}
        xAxisLabelTextStyle={FONT.content.XS.medium}
        onPress={() => console.log('press')}
      />
    </View>
  );
};

export default Chart;
