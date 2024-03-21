import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {styles} from '@screens/ExamQuestion/styles';
import Checkbox from './Checkbox';
type THollandQuestion = {
  question: IQuestion;
};
const HollandQuestion = ({question}: THollandQuestion) => {
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
      <Text style={styles.question}>{question.questionTitle}</Text>
      {question?.answers?.map((answer, index) => {
        return (
          <View style={styles.answerCard} key={index}>
            <Checkbox
              isCheck={selections?.includes(index)}
              onPress={() => onPress(index)}
            />
            <Text style={styles.answer}>{answer.content}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default HollandQuestion;
