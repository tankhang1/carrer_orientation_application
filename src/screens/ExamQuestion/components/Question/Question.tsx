import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import RadioButton from './RadioButton';
import {styles} from './styles';
import {IQuestion, TExam} from '@interfaces/DTO';
import AppImage from '@components/AppImage';
import {width} from '@utils/config';
import Checkbox from './Checkbox';
import {TAnswer} from '@screens/ExamQuestion';
type Props = {
  question: IQuestion;
  questionNumber: number;
  type?: TExam;
  answers: TAnswer;
  questionIndex: number;
};
type TImage = {
  w?: number;
  h?: number;
};
const Question = ({
  question,
  questionNumber,
  type = 'R',
  answers,
  questionIndex,
}: Props) => {
  const [selected, setSelected] = useState(-1);
  const [imageSize, setImageSize] = useState<TImage>({w: 0, h: 0});
  const [multipleSelections, setMultipleSelections] = useState<number[]>([]);
  useEffect(() => {
    if (questionNumber !== 0) {
      if (type === 'IQ' || type === 'EQ') {
        setSelected(-1);
        return;
      }
      console.log('multi', multipleSelections);

      setMultipleSelections([]);
    }
  }, [questionNumber]);

  //console.log(answers);
  // useEffect(() => {
  //   if (question?.image) {
  //     Image.getSize(question?.image!, (w, h) => {
  //       setImageSize({w: w > width * 0.8 ? width * 0.8 : w, h});
  //     });
  //   }
  // }, [question?.image]);

  const onPress = (index: number) => {
    const selection = multipleSelections?.findIndex(item => item === index);
    if (selection === -1) {
      setMultipleSelections([...multipleSelections, index]);
    } else {
      let tmp = multipleSelections?.filter(item => item !== index);
      setMultipleSelections(tmp);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question?.questionTitle}</Text>
      {question?.image && (
        <AppImage
          source={{uri: question?.image}}
          style={styles.questionImage}
          // style={{
          //   width: imageSize?.w,
          //   height: imageSize?.h,
          //   alignSelf: 'center',
          // }}
          resizeMode="contain"
        />
      )}
      <View style={styles.optionContainer}>
        {question?.options?.map((option, index) => {
          const {image, content} = option;
          return (
            <View
              style={[styles.optionCard, {width: image ? width * 0.4 : 'auto'}]}
              key={index}>
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
                    selected={selected === index}
                    onPress={() => {
                      setSelected(index);
                      answers.set(type, {[questionIndex]: selected});
                    }}
                  />
                ) : (
                  <Checkbox
                    isCheck={multipleSelections?.includes(index)}
                    onPress={() => onPress(index)}
                  />
                )}

                <Text style={styles.option}>{content}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Question;
