import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AppImage from '@components/AppImage';
import {FONT, s, vs, width} from '@utils/config';
const ANSWERS = new Array(4).fill(require('@assets/images/sample2.png'));
const IQQuestion = () => {
  return (
    <View>
      <Text style={styles.questionTitle}>Chọn đáp án đúng nhất</Text>
      <AppImage
        source={require('@assets/images/sample1.png')}
        style={styles.questionImage}
      />
      <View style={styles.answerContainer}>
        {ANSWERS?.map((answer, index) => {
          return (
            <TouchableOpacity key={index} style={styles.answerWrapper}>
              <Text style={[FONT.content.M.semiBold, {marginTop: vs(10)}]}>
                A
              </Text>
              <AppImage source={answer} style={styles.answerImage} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  questionImage: {
    width: s(200),
    height: s(200),
    alignSelf: 'center',
  },
  questionTitle: {
    paddingHorizontal: s(20),
    ...FONT.content.M.semiBold,
    marginBottom: vs(10),
  },
  answerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    marginVertical: vs(10),
    //paddingHorizontal: s(20),
  },
  answerImage: {
    width: s(100),
    height: s(100),
  },
  answerWrapper: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(10),
  },
});
export default IQQuestion;
