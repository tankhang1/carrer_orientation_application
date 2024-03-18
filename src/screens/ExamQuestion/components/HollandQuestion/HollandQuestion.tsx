import {View, Text} from 'react-native';
import React, {useMemo, useState} from 'react';
import {styles} from '@screens/ExamQuestion/styles';
import {HOLLAND_TEST} from '@screens/ExamQuestion/mock';
import Checkbox from './Checkbox';
const HollandQuestion = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const question = useMemo(
    () => HOLLAND_TEST[questionNumber],
    [questionNumber],
  );
  const [selections, setSelections] = useState<number[]>([]);

  const onPress = (index: number) => {
    const selection = selections?.findIndex(item => item === index);
    if (selection === -1) {
      setSelections([...selections, index]);
    } else {
      let tmp = selections.filter(item => item !== index);
      setSelections(tmp);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      {question?.answers?.map((answer, index) => {
        return (
          <View style={styles.answerCard} key={index}>
            <Checkbox
              isCheck={selections?.includes(index)}
              onPress={() => onPress(index)}
            />
            <Text style={styles.answer}>{answer}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default HollandQuestion;
