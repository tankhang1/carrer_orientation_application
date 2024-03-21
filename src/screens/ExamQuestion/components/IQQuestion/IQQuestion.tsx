import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import AppImage from '@components/AppImage';
import {FONT, s, vs, width} from '@utils/config';
import {Source} from 'react-native-fast-image';
const ANSWERS = new Array(4).fill(require('@assets/images/sample2.png'));
type TIQQuestion = {
  question: IQuestion;
};
const IQQuestion = ({question}: TIQQuestion) => {
  return (
    <View>
      <Text style={styles.questionTitle}>{question.questionTitle}</Text>
      <AppImage source={{uri: question?.image}} style={styles.questionImage} />
      {/* {question?.answers?.map((answer, index) => {
        return (
          <TouchableOpacity key={index} style={styles.answerWrapper}>
            <Text style={[FONT.content.M.semiBold, {marginTop: vs(10)}]}>
              A
            </Text>
            <AppImage source={{uri: answer.image}} style={styles.answerImage} />
          </TouchableOpacity>
        );
      })} */}

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
