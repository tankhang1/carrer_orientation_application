import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {lazy, useDeferredValue, useState} from 'react';
import AppView from '@components/AppView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONT, s, vs} from '@utils/config';
import {AppTextInput, AppButton} from '@components';
import {NewsCategory} from './mock';

import NewsJobs from './components/NewsJobs';
import Admissions from './components/Admissions';
import {navigationRef} from '@navigation';
import AppHeader from '@components/AppHeader';
const News = () => {
  const [categoryId, setCategoryId] = useState(NewsCategory[0].id);
  const [searchInfo, setSearchInfo] = useState('');
  const deferSearchInfo = useDeferredValue(searchInfo);
  const onCategoryPress = (id: string) => {
    if (categoryId !== id) {
      setCategoryId(id);
      setSearchInfo('');
    }
  };
  return (
    <AppView style={styles.overall}>
      <AppHeader
        title="Tin tức"
        style={{
          marginBottom: 10,
        }}
      />
      <AppTextInput
        width={'100%'}
        value={searchInfo}
        onChangeText={setSearchInfo}
        containerStyle={{backgroundColor: COLORS.white, borderWidth: 0}}
        placeholder="Tìm kiếm tin tức"
        placeholderTextColor={COLORS.grey}
        trailing={<AntDesign name="search1" size={s(25)} color={COLORS.grey} />}
      />
      <ScrollView
        horizontal
        contentContainerStyle={{gap: s(10)}}
        showsHorizontalScrollIndicator={false}
        style={{
          marginVertical: vs(10),
        }}>
        {NewsCategory.map((category, index) => (
          <AppButton
            key={index}
            label={category.title}
            labelStyle={[
              FONT.content.M.semiBold,
              {
                marginHorizontal: 0,
              },
              categoryId === category.id
                ? {color: COLORS.white}
                : {color: COLORS.black},
            ]}
            buttonStyle={[
              styles.categoryBtn,
              categoryId === category.id && {
                backgroundColor: COLORS.green,
              },
            ]}
            onPress={() => onCategoryPress(category.id)}
          />
        ))}
      </ScrollView>
      {categoryId === NewsCategory[0].id ? (
        <Admissions />
      ) : (
        <NewsJobs deferSearchInfo={deferSearchInfo} />
      )}
    </AppView>
  );
};

export default News;
const styles = StyleSheet.create({
  overall: {
    paddingHorizontal: s(15),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(10),
  },
  categoryBtn: {
    paddingVertical: s(15),
    borderWidth: s(2),
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
  },
});
