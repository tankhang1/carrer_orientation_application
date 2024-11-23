import { AppHeader, AppView } from '@components';
import AppImage from '@components/AppImage';
import { COLORS, s, vs } from '@utils';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
type TAccount = {
  id: string;
  name: string;
  email: string;
};
type TExam = {
  type: string;
  name: string;
  category: string;
  status: boolean;
};
const EXAMS: TExam[] = [
  {
    type: 'Online',
    name: 'Mathematics Final Exam',
    category: 'Mathematics',
    status: true, // Active
  },
  {
    type: 'Offline',
    name: 'Physics Lab Test',
    category: 'Physics',
    status: false, // Inactive
  },
];
const MEMBERS: TAccount[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
  },
];
const GroupListScreen = () => {
  const renderMemberItem = ({ item, index }: ListRenderItemInfo<TAccount>) => {
    return (
      <View key={index} style={styles.memberContainer}>
        <AppImage
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/021/770/056/non_2x/avatar-of-a-student-character-free-vector.jpg',
          }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>{item.email}</Text>
        </View>
        <TouchableOpacity>
          <Feather name='x' size={s(20)} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderExamItem = ({ item, index }: ListRenderItemInfo<TExam>) => {
    return (
      <View key={index} style={styles.memberContainer}>
        <AppImage source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8750/8750743.png' }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>{item.category}</Text>
          <Text style={styles.desc}>{item.type}</Text>
          <Text style={[styles.desc, item.status ? { color: COLORS.green } : { color: COLORS.red }]}>
            {item.status ? 'Đang hoạt động' : 'Tạm dừng'}
          </Text>
        </View>
        <TouchableOpacity>
          <Feather name='x' size={s(20)} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <React.Fragment>
      <AppView>
        <AppHeader title='Nhóm' />
        <View style={styles.groupInfoContainer}>
          <AppImage
            style={styles.avatar}
            source={{ uri: 'https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg' }}
          />
          <View style={styles.groupInfo}>
            <Text style={styles.groupTitle}>Đoàn Tấn Khang</Text>
            <Text style={styles.groupTitle}>Số lượng thành viên: 8 người</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeContent}>Đang hoạt động</Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Danh sách thành viên</Text>
            <TouchableOpacity style={styles.addNewButton}>
              <AntDesign name='plus' size={s(18)} color={COLORS.green} />
              <Text style={styles.addNewLabel}>Thêm mới</Text>
            </TouchableOpacity>
          </View>
          <FlatList data={MEMBERS} renderItem={renderMemberItem} contentContainerStyle={{ gap: 10 }} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Danh sách bài kiểm tra</Text>
            <TouchableOpacity style={styles.addNewButton}>
              <AntDesign name='plus' size={s(18)} color={COLORS.green} />
              <Text style={styles.addNewLabel}>Thêm mới</Text>
            </TouchableOpacity>
          </View>
          <FlatList data={EXAMS} renderItem={renderExamItem} contentContainerStyle={{ gap: 10 }} />
        </View>
      </AppView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: s(50),
    height: s(50),
    borderRadius: s(100),
    elevation: 4,
  },
  groupInfoContainer: {
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    marginHorizontal: s(10),
    marginVertical: vs(10),
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: s(10),
    gap: s(10),
    alignItems: 'center',
  },
  groupInfo: {
    flex: 1,
    flexDirection: 'column',
    gap: vs(2),
    height: '100%',
  },
  groupTitle: {
    fontSize: s(16),
    color: COLORS.black,
  },
  badge: {
    backgroundColor: COLORS.green,
    borderRadius: 100,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: s(5),
    paddingVertical: vs(3),
  },
  badgeContent: {
    fontSize: s(12),
    color: COLORS.white,
    fontWeight: 'bold',
  },
  title: {
    fontSize: s(16),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: s(16),
    gap: vs(10),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  addNewLabel: {
    fontSize: s(14),
    color: COLORS.green,
    fontWeight: 'bold',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    backgroundColor: COLORS.white,
    padding: s(10),
    borderRadius: s(5),
  },
  desc: {
    fontSize: s(14),
    color: COLORS.black,
  },
  deleteButton: {},
});
export default GroupListScreen;
