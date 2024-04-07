import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import RadioButton from './RadioButton';
import {styles} from '@screens/ExamQuestion/styles';
import {IQuestion} from '@interfaces/DTO';
type TEQQuestion = {
  question: IQuestion;
  questionNumber: number;
  setQuestionNumber: (questionNumber: number) => void;
};
const EQQuestion = ({
  question,
  questionNumber,
  setQuestionNumber,
}: TEQQuestion) => {
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    if (questionNumber !== 0) {
      setSelected(-1);
    }
  }, [questionNumber]);
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question?.questionTitle}</Text>
      {question?.options?.map((option, index) => {
        return (
          <View style={styles.optionCard} key={index}>
            <RadioButton
              selected={selected === index}
              onPress={() => {
                setSelected(index);
                //setTimeout(() => setQuestionNumber(questionNumber + 1));
              }}
            />
            <Text style={styles.option}>{option.content}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default EQQuestion;
