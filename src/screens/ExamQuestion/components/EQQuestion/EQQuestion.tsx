import {View, Text} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {FONT} from '@utils/config';
import RadioButton from './RadioButton';
import {EQ_TEST} from '@screens/ExamQuestion/mock';
import {styles} from '@screens/ExamQuestion/styles';
const EQQuestion = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const question = useMemo(() => EQ_TEST[questionNumber], [questionNumber]);
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    if (questionNumber !== 0) {
      setSelected(-1);
    }
  }, [questionNumber]);
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      {question?.answers?.map((answer, index) => {
        return (
          <View style={styles.answerCard} key={index}>
            <RadioButton
              selected={selected === index}
              onPress={() => {
                setSelected(index);
                setTimeout(() => setQuestionNumber(questionNumber + 1));
              }}
            />
            <Text style={styles.answer}>{answer}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default EQQuestion;
