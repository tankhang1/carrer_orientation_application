import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import React, {lazy, Suspense, useRef} from 'react';
import AppView from '@components/AppView';
import {s, vs, width} from '@utils/config';
import AppSkeleton from '@components/AppSkeleton';
import AppHeader from '@components/AppHeader';
import {storage} from '@store';
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";

const AppHistoryCard = lazy(
    () => import('@components/AppHistoryCard/AppHistoryCard'),
);
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-7671392847069245/2923533772';

const ListResult = () => {
    const results = JSON.parse(storage.getString('LIST_RESULT') ?? '{}') as any[];
    const bannerRef = useRef<BannerAd>(null);

    const renderCard = ({item, index}: ListRenderItemInfo<any>) => {
        return (
            <Suspense
                fallback={<AppSkeleton width={width * 0.9} height={300} radius={10}/>}>
                <AppHistoryCard
                    result={item}
                    key={index}
                    isExpand={true}
                    index={index}
                />
            </Suspense>
        );
    };
    return (
        <AppView>
            <AppHeader title="Kết quả kiểm tra" style={{width: width}}/>
            <AppView
                data={results ?? []}
                renderItem={renderCard}
                contentContainerStyle={styles.containerStyle}
                ListFooterComponent={() => <View style={{height: 10}}/>}
                renderToHardwareTextureAndroid
                removeClippedSubviews
            />
            <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}/>
        </AppView>
    );
};

export default ListResult;
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: s(10),
        gap: s(10),
    },
    containerStyle: {
        gap: vs(10),
        alignSelf: 'center',
        width: '90%'
    },
});
