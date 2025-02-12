import { AppButton } from '@components';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import Checkbox from '@screens/ExamQuestion/components/Question/Checkbox';
import { Title } from '@screens/Result/components';
import { COLORS, FONT, s, vs } from '@utils';
import React, { forwardRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type TSchoolFilterREQ = {
  provinces?: string[];
  minScore?: number;
};
type SchoolFilterProps = {
  filter?: TSchoolFilterREQ;
  onSave?: (filter?: TSchoolFilterREQ) => void;
};

const SchoolFilter = forwardRef<BottomSheet, SchoolFilterProps>(({ filter, onSave }, ref) => {
  const [provinces, setProvinces] = useState<string[]>(filter?.provinces || []);
  const [minScore, setMinScore] = useState(filter?.minScore);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['60%']}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      index={-1}
      activeOffsetY={[-1, 1]}
      failOffsetX={[-5, 5]}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />}>
      <BottomSheetView style={{ flex: 1 }}>
        <BottomSheetScrollView>
          <View style={styles.container}>
            <View style={{ gap: vs(16) }}>
              <Title title={'Khu vực'} textStyle={styles.title} wrapperStyle={{ paddingHorizontal: 0 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: s(24) }}>
                <Checkbox
                  isCheck={provinces?.includes('Hà Nội')}
                  checkedColor={COLORS.green}
                  label={<Text style={styles.subTitle}>Miền Bắc</Text>}
                  onPress={() => {
                    const newValues = provinces?.includes('Hà Nội')
                      ? provinces?.filter((i) => i !== 'Hà Nội')
                      : [...provinces, 'Hà Nội'];
                    setProvinces(newValues);
                  }}
                />
                <Checkbox
                  isCheck={provinces?.includes('Hồ Chí Minh')}
                  checkedColor={COLORS.green}
                  label={<Text style={styles.subTitle}>Miền Nam</Text>}
                  onPress={() => {
                    const newValues = provinces?.includes('Hồ Chí Minh')
                      ? provinces?.filter((i) => i !== 'Hồ Chí Minh')
                      : [...provinces, 'Hồ Chí Minh'];
                    setProvinces(newValues);
                  }}
                />
              </View>
            </View>
            <Title title={'Điểm chuẩn'} textStyle={styles.title} wrapperStyle={{ paddingHorizontal: 0, marginTop: vs(8) }} />
            <View style={{ width: SCREEN_WIDTH - 60, alignSelf: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={styles.subTitle}>0</Text>
                <Text style={[styles.subTitle, { color: COLORS.green }]}>{minScore || 0}</Text>
                <Text style={styles.subTitle}>50</Text>
              </View>

              <Slider
                style={{ width: SCREEN_WIDTH - 30, height: 30, alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={50}
                minimumTrackTintColor={COLORS.green}
                maximumTrackTintColor={COLORS.grey}
                step={1}
                thumbTintColor={COLORS.green}
                onTouchStart={(e) => e.stopPropagation()}
                onValueChange={(value) => setMinScore(value)}
                value={minScore}
              />
            </View>
          </View>
        </BottomSheetScrollView>
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: vs(40), paddingHorizontal: s(16), gap: s(5) }}>
          <AppButton
            labelStyle={[FONT.content.M.semiBold]}
            buttonStyle={styles.button}
            onPress={() => {
              onSave?.(undefined);
              setMinScore(25);
              setProvinces([]);
            }}
            buttonContainerStyle={{ flex: 1 }}
            label='Reset'
          />
          <AppButton
            labelStyle={[FONT.content.M.semiBold, { color: COLORS.white }]}
            buttonStyle={[styles.button, { backgroundColor: COLORS.green }]}
            onPress={() => {
              onSave?.({
                minScore: minScore,
                provinces: provinces,
              });
            }}
            buttonContainerStyle={{ flex: 1 }}
            label='Lưu'
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: vs(16),
    paddingVertical: vs(8),
    paddingHorizontal: s(16),
  },
  title: {
    ...FONT.content.L,
    color: COLORS.black,
  },
  subTitle: {
    ...FONT.content.M.medium,
    color: COLORS.black,
  },
  button: {
    paddingVertical: s(15),
    borderWidth: s(2),
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
  },
});
export default SchoolFilter;
