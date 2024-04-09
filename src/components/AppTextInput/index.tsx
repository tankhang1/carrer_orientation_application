import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInput,
  TextInputProps,
} from 'react-native';
import React, {memo} from 'react';
import {COLORS, FONT, s, vs} from '@utils/config';
import {width} from '@utils/config';
import AppButton from '@components/AppButton';
type TAppTextInput = {
  width?: number | string;
  height?: number | string;
  outStyle?: StyleProp<ViewStyle>; // include text input + label
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>; // style container of text input
  leading?: React.ReactNode;
  onLeadingPress?: () => void;
  trailing?: React.ReactNode;
  onTrailingPress?: () => void;
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
} & Partial<TextInputProps>;

/**
 * @typedef {Object} TAppTextInput
 * @property {number | string} width - The width of the text input.
 * @property {number | string} height - The height of the text input.
 * @property {import('react-native').StyleProp<import('react-native').ViewStyle>} outStyle - Style for the outer container, including the text input and label.
 * @property {string} label - Label for the text input.
 * @property {import('react-native').StyleProp<import('react-native').TextStyle>} labelStyle - Style for the label text.
 * @property {import('react-native').StyleProp<import('react-native').ViewStyle>} containerStyle - Style for the container of the text input.
 * @property {React.ReactNode} leading - Content to be placed before the text input.
 * @property {() => void} onLeadingPress - Function to be called when the leading content is pressed.
 * @property {React.ReactNode} trailing - Content to be placed after the text input.
 * @property {() => void} onTrailingPress - Function to be called when the trailing content is pressed.
 * @property {string} value - Value of the text input.
 * @property {(value: string) => void} onChangeText - Function to be called when the text input value changes.
 * @property {string} placeholder - Placeholder text for the text input.
 * @augments Partial<import('react-native').TextInputProps>
 */

const AppTextInput = ({
  width,
  height,
  outStyle,
  label = '',
  labelStyle,
  containerStyle,
  leading,
  onLeadingPress,
  trailing,
  onTrailingPress,
  value,
  onChangeText,
  placeholder = 'Nhập thông tin',
  ...rest
}: TAppTextInput) => {
  const containerInitStyle = StyleSheet.flatten([
    styles.container,
    width && {width},
    height && {height},
    containerStyle,
  ]) as ViewStyle;
  const renderLabel = () => {
    const labelInitStyle = StyleSheet.flatten([
      FONT.content.M.regular,
      labelStyle,
      {marginBottom: vs(5)},
    ]) as TextStyle;
    return <Text style={labelInitStyle}>{label}</Text>;
  };
  return (
    <View style={outStyle}>
      {label && renderLabel()}
      <View style={[containerInitStyle]}>
        {leading && (
          <AppButton onPress={onLeadingPress} type="transparent" size="S">
            {leading}
          </AppButton>
        )}
        <TextInput
          defaultValue={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          placeholderTextColor={COLORS.grey}
          placeholder={placeholder}
          {...rest}
        />
        {trailing && (
          <AppButton type="transparent" onPress={onTrailingPress} size="S">
            {trailing}
          </AppButton>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: s(5),
    borderColor: COLORS.grey,
    width: width * 0.8,
    maxWidth: s(400),
    alignItems: 'center',
    minWidth: s(30),
  },
  textInput: {
    flex: 1,
    marginHorizontal: s(8),
    ...FONT.content.M.regular,
    paddingVertical: s(10),
  },
});
export default AppTextInput;
