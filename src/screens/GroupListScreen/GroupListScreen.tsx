import { AppCard, AppHeader, AppView } from '@components';
import { IGroup } from '@interfaces/DTO/Group/group';
import { navigationRef } from '@navigation';
import { COLORS, FONT, s, vs, width } from '@utils';
import React from 'react';
import { ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const GROUPS = [
  {
    groupName: 'Group 1',
    ownerName: 'Tina',
  },
  {
    groupName: 'Group 2',
    ownerName: 'Tina',
  },
];

const GroupListScreen = () => {
  const renderGroupItem = ({ item, index }: ListRenderItemInfo<IGroup>) => {
    return (
      <View key={index}>
        <AppCard
          containerStyle={[styles.card, { alignSelf: 'center' }]}
          type='large'
          imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAkWsip8bmdBWfZ8qBfO1Nccf-Se0JUpoq6GhO09oKq5ctxB0FwyvBwwfFmQpMvEZkzI&usqp=CAU'
          subTitle={item.ownerName}
          title={item.groupName}
          onPress={() => navigationRef?.navigate('GroupDetail')}
        />
      </View>
    );
  };

  return (
    <React.Fragment>
      <AppView
        data={GROUPS}
        renderItem={renderGroupItem}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <AppHeader title='Nhóm' />
            </View>
            <View style={styles.body}>
              <AppCard
                containerStyle={styles.card}
                type='large'
                imageUrl={'https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg'}
                imageStyle={styles.avatar}
                subTitle='Teacher'
                title={
                  <View style={{ gap: vs(4) }}>
                    <Text style={styles.title}>Nguyễn Thị Phương Tiên</Text>
                    <Text style={styles.email}>Email: teacher@yopmail.com</Text>
                    <TouchableOpacity>
                      <Text style={[FONT.content.XS.medium, { color: COLORS.grey }]}>Đăng xuất</Text>
                    </TouchableOpacity>
                  </View>
                }
                rightSection={
                  <TouchableOpacity style={styles.icon}>
                    <Feather name='edit-3' size={20} color={COLORS.grey} />
                  </TouchableOpacity>
                }
              />
              <View style={styles.groupContainer}>
                <Text style={FONT.content.L}>Danh sách nhóm</Text>
              </View>
            </View>
          </>
        }></AppView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: vs(10),
  },
  body: {
    paddingHorizontal: s(27),
  },
  card: {
    width: width - s(27) * 2,
    marginVertical: vs(5),
  },
  avatar: {
    width: s(64),
    height: s(64),
    borderRadius: s(100),
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
  },
  title: {
    ...FONT.content.M.semiBold,
  },
  email: {
    ...FONT.content.XS.medium,
  },
  icon: {
    marginLeft: s(4),
  },
  groupContainer: {
    marginTop: vs(8),
  },
});
export default GroupListScreen;
