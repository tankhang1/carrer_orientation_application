import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import RadioButton from './RadioButton';
import {styles} from './styles';
import {IQuestion, TExam} from '@interfaces/DTO';
import AppImage from '@components/AppImage';
import {COLORS, width} from '@utils/config';
import Checkbox from './Checkbox';
import {TAnswer} from '@screens/ExamQuestion';
type Props = {
  question: IQuestion;
  questionNumber: number;
  type?: TExam;
  questionIndex: number;
  selections: number[];
  setSelections: (selections: number[]) => void;
  answers: TAnswer;
  error?: boolean;
};
type TImage = {
  w?: number;
  h?: number;
};
const Question = ({
  question,
  questionNumber,
  type = 'R',
  selections,
  setSelections,
  answers,
  questionIndex,
  error = false,
}: Props) => {
  useEffect(() => {
    if (type === 'IQ' || type === 'EQ') {
      const tmp = answers.get(type)!;
      setSelections([tmp[questionIndex] ?? -1]);
    } else {
      setSelections(answers.get(type)!);
    }
  }, [questionNumber, type]);

  const onPress = (index: number) => {
    if (type === 'EQ' || type === 'IQ') {
      setSelections([index]);
      return;
    }
    const selection = selections?.findIndex(item => item === index);
    if (selection === -1) {
      setSelections([...selections, index]);
    } else {
      let tmp = selections?.filter(item => item !== index);
      setSelections(tmp);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question?.questionTitle}</Text>
      {question?.image && (
        <AppImage
          source={{uri: question?.image}}
          style={styles.questionImage}
          resizeMode="contain"
        />
      )}
      {error && (
        <Text style={{color: COLORS.red}}>
          *<Text style={styles.error}> Vui lòng điền đáp án!</Text>
        </Text>
      )}

      <View style={styles.optionContainer}>
        {question?.options?.map((option, index) => {
          const {image, content} = option;
          return (
            <TouchableOpacity
              style={[styles.optionCard, {width: image ? width * 0.4 : 'auto'}]}
              key={index}
              onPress={() => onPress(index)}>
              {option?.image && (
                <AppImage
                  source={{uri: image}}
                  style={styles.optionImage}
                  resizeMode="contain"
                />
              )}
              <View style={styles.optionTitle}>
                {type === 'EQ' || type === 'IQ' ? (
                  <RadioButton
                    selected={selections.includes(index)}
                    onPress={() => onPress(index)}
                  />
                ) : (
                  <Checkbox
                    isCheck={selections?.includes(index)}
                    onPress={() => onPress(index)}
                  />
                )}

                <Text style={styles.option}>{content}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Question;
