import {COLORS, FONT, s, vs} from '@utils/config';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(30),
    gap: vs(10),
  },
  question: {
    ...FONT.content.M.semiBold,
  },
  optionCard: {
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    padding: s(10),
    flexDirection: 'row',
    gap: s(5),
    alignItems: 'center',
  },
  option: {
    ...FONT.content.M.regular,
    width: '90%',
  },
});
