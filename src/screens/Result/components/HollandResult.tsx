import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONT, s, vs, width} from '@utils/config';
import AppImage from '@components/AppImage';
import {HOLLAND_RESULT} from '../mock';
import RenderHTML, {HTMLSource} from 'react-native-render-html';
const HollandResult = () => {
  return (
    <>
      {HOLLAND_RESULT.map((group, index) => {
        return (
          <View style={styles.card} key={index}>
            <View style={styles.imageContainer}>
              <AppImage source={group.image} style={styles.image} />
              <Text style={styles.name}>{group.name}</Text>
            </View>
            <View>
              <RenderHTML
                source={group.source as HTMLSource}
                contentWidth={200}
                enableExperimentalMarginCollapsing={true}
                tagsStyles={{
                  article: {
                    color: 'black',
                  },
                }}
              />
            </View>
          </View>
        );
      })}
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    padding: s(10),
    //flexDirection: 'row',
    gap: s(5),
    alignItems: 'center',
    width: width - s(54),
  },
  image: {
    width: s(80),
    height: s(80),
  },
  imageContainer: {
    gap: vs(5),
    alignItems: 'center',
  },
  name: {
    ...FONT.content.M.bold,
    textAlign: 'center',
  },
});
export default HollandResult;
