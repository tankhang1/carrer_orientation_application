import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AppImage from '@components/AppImage';
import {FONT, s, vs, width} from '@utils/config';
import {IQuestion} from '@interfaces/DTO';
const OPTIONS = new Array(4).fill(require('@assets/images/sample2.png'));
type TIQQuestion = {
  question: IQuestion;
};
const IQQuestion = ({question}: TIQQuestion) => {
  return (
    <View>
      <Text style={styles.questionTitle}>{question.questionTitle}</Text>
      <AppImage
        source={{uri: question?.image}}
        style={styles.questionImage}
        resizeMode="contain"
      />
      <View style={styles.optionContainer}>
        {question.options?.map((option, index) => {
          return (
            <TouchableOpacity key={index} style={styles.optionWrapper}>
              <Text style={[FONT.content.M.semiBold, {marginTop: vs(10)}]}>
                {option.content}
              </Text>
              {option.image && (
                <AppImage
                  source={{uri: option.image}}
                  style={styles.optionImage}
                />
              )}
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
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    marginVertical: vs(10),
    //paddingHorizontal: s(20),
  },
  optionImage: {
    width: s(100),
    height: s(100),
  },
  optionWrapper: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(10),
  },
});
export default IQQuestion;
