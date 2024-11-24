import AppImage from '@components/AppImage';
import { IQuestion } from '@interfaces/DTO';
import Checkbox from '@screens/ExamQuestion/components/Question/Checkbox';
import RadioButton from '@screens/ExamQuestion/components/Question/RadioButton';
import { COLORS, FONT, s, vs, width } from '@utils';
import { EQuestionType } from '@utils/enum/exam.enum';
import { isContainsHTMLTags } from '@utils/helpers/string.helper';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
type DoExamQuestionProps = {
  question?: IQuestion;
};
const DoExamQuestion = ({ question }: DoExamQuestionProps) => {
  return (
    <View style={styles.container}>
      {isContainsHTMLTags(question?.questionTitle) ? (
        <RenderHTML
          source={{
            html: question?.questionTitle as unknown as string,
          }}
          contentWidth={200}
          enableExperimentalMarginCollapsing={true}
          tagsStyles={{
            article: { color: COLORS.black },
            //h3: { alignSelf: 'center' },
            p: { ...FONT.content.M.semiBold },
          }}
        />
      ) : (
        <Text style={styles.question}>{question?.questionTitle}</Text>
      )}

      {question?.image && <AppImage source={{ uri: question?.image }} style={styles.questionImage} resizeMode='contain' />}

      <View style={styles.optionContainer}>
        {question?.options?.map((option, index) => {
          const { image, content } = option;
          return (
            <TouchableOpacity style={[styles.optionCard, { width: image ? width * 0.4 : 'auto' }]} key={index} onPress={() => {}}>
              {option?.image && <AppImage source={{ uri: image }} style={styles.optionImage} resizeMode='contain' />}
              <View style={styles.optionTitle}>
                {question?.questionType === EQuestionType.MULTIPLE_CHOICE ? <RadioButton /> : <Checkbox />}
                <Text style={styles.option}>{content}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    ...FONT.content.M.semiBold,
  },
  questionImage: {
    width: s(200),
    height: s(200),
    alignSelf: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: vs(10),
    gap: s(10),
    justifyContent: 'center',
  },
  optionCard: {
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    padding: s(10),
    gap: s(5),
    width: width - s(27) * 2,
  },
  optionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
  },
  option: {
    ...FONT.content.M.regular,
    width: '90%',
  },
  optionImage: {
    width: s(100),
    height: s(100),
    alignSelf: 'center',
  },
});
export default DoExamQuestion;
