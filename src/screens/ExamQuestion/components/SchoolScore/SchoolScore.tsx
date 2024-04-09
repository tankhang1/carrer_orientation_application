import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONT, s, vs} from '@utils/config';
import {AppTextInput} from '@components';

const SchoolScore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Vui lòng nhập điểm trung bình của từng môn nhé!
      </Text>
      <AppTextInput
        label="Toán"
        containerStyle={{backgroundColor: COLORS.white}}
      />
      <AppTextInput
        label="Văn"
        containerStyle={{backgroundColor: COLORS.white}}
      />
      <AppTextInput
        label="Anh"
        containerStyle={{backgroundColor: COLORS.white}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(27),
    gap: vs(10),
  },
  title: {
    ...FONT.content.M.semiBold,
  },
});
export default SchoolScore;
