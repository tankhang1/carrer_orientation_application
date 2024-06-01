import {
  ListRenderItemInfo,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useMemo, useRef} from 'react';
import {AppHeader, AppView} from '@components';
import DictionaryItem from './components/DictionaryItem';
import {COLORS, FONT, QUERY_KEY, height, vs} from '@utils';
import {FlatList} from 'react-native-gesture-handler';
import {DefaultError, useQuery} from '@tanstack/react-query';
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
import {
  IDictionary,
  IDictionaryResponse,
} from '@interfaces/DTO/Dictionary/dictionary';
import Animated, {FadeIn} from 'react-native-reanimated';
import AppNoData from '@components/AppNoData';
const Dictionary = () => {
  const ref = useRef<FlatList>(null);
  const {isLoading, data, error} = useQuery<
    unknown,
    DefaultError,
    IDictionaryResponse
  >({
    queryKey: [QUERY_KEY.DICTIONARY],
    queryFn: () => useAPI(ENDPOINTS_URL.DICTIONARY.GET_DICTIONARY, 'GET', {}),
  });

  const dictionary = useMemo(() => data?.data, [data?.data]);
  const scrollToIndex = (index: number) => {
    setTimeout(() => {
      if (ref.current && dictionary && dictionary?.length > 0)
        ref?.current?.scrollToIndex({animated: true, index, viewPosition: 0});
    }, 300);
  };
  const renderItem = ({item, index}: ListRenderItemInfo<IDictionary>) => {
    return (
      <DictionaryItem
        key={index}
        scrollToItem={() => scrollToIndex(index)}
        title={`Ngành nghề khối ${item.group}`}
        majors={item?.majors}
        group={item?.group}
      />
    );
  };

  return (
    <AppView scrollEnabled={false}>
      <View style={styles.header}>
        <AppHeader title="Từ điển ngành nghề" />
      </View>
      {isLoading && <ActivityIndicator size={'large'} color={COLORS.green} />}
      <FlatList
        data={dictionary}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ref={ref}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            ref?.current?.scrollToIndex({index: info.index, animated: true});
          });
        }}
        ListEmptyComponent={() =>
          error && (
            <Animated.View
              style={styles.placeHolderContainer}
              entering={FadeIn}>
              <AppNoData />
              <Text style={styles.placeHolderText}>
                Oops! Chưa có từ điển nào được cập nhật! Thử lại sau nhé!
              </Text>
            </Animated.View>
          )
        }
      />
    </AppView>
  );
};
const styles = StyleSheet.create({
  header: {
    marginBottom: vs(10),
  },
  container: {
    height: height * 0.9,
  },
  content: {
    gap: vs(10),
    paddingBottom: vs(50),
  },
  placeHolderContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  placeHolderText: {
    ...FONT.content.L,
    color: COLORS.grey,
    textAlign: 'center',
  },
});
export default Dictionary;
