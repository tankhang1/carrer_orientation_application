import { AppHeader } from '@components';
import AppSkeleton from '@components/AppSkeleton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { height, vs, width } from '@utils/config';
import { TRootStackNav } from '@utils/types/RootStackNav';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
type Props = NativeStackScreenProps<TRootStackNav, 'ResultDetail'>;
const ResultDetail = ({ route }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={
          <View style={{ flex: 1, backgroundColor: 'red' }}>
            <AppSkeleton width={width} height={height} />
          </View>
        }>
        <WebView source={{ uri: route?.params.url }} style={{ flex: 1 }} />
      </Suspense>
      <AppHeader style={{ position: 'absolute', marginTop: vs(40) }} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default ResultDetail;
