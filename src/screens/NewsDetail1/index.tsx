import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, s} from '@utils/config';
import AppView from '@components/AppView';
import {navigationRef} from '@navigation';
const source = {
  html: `   <article>
  <h2>Phó Trưởng Ban Nội chính Trung ương làm quyền Bí thư Lâm Đồng</h2>
  <p>
    <span class="author">Đặng Dương</span>
    <span class="date">• Chủ nhật, 17/03/2024-09:11</span>
  </p>
  <figure>
    <img src="https://cdnphoto.dantri.com.vn/eDIVGBogSesmHGPrCB-vXthzAvo=/2024/03/17/52c8b816-265b-467e-b612-5bda9b5cdfcf-1710652032296.jpeg" alt="Lễ công bố quyết định của Bộ Chính trị về công tác cán bộ">
    <figcaption>Lễ công bố quyết định của Bộ Chính trị về công tác cán bộ tại Đà Lạt, Lâm Đồng.</figcaption>
  </figure>
  <p>
    (Dân trí) - Ban Tổ chức Trung ương vừa công bố quyết định điều động ông Nguyễn Thái Học, Phó Trưởng Ban Nội chính Trung ương làm quyền Bí thư Tỉnh ủy Lâm Đồng.
  </p>
  <p>
    Ngày 17/3, tại thành phố Đà Lạt, Ban Thường vụ Tỉnh ủy Lâm Đồng đã tổ chức lễ công bố quyết định của Bộ Chính trị về công tác cán bộ.
  </p>
  <p>
    Ủy viên Bộ Chính trị, Thường trực Ban Bí thư, Trưởng Ban Tổ chức Trung ương Trương Thị Mai thay mặt Bộ Chính trị dự và trao quyết định.
  </p>
  <p>
    Tại buổi lễ, Ban Tổ chức Trung ương đã công bố quyết định điều động ông Nguyễn Thái Học, Phó Trưởng Ban Nội chính Trung ương làm quyền Bí thư Tỉnh ủy Lâm Đồng.
  </p>
  <p>
    Phát biểu giao nhiệm vụ cho quyền Bí thư Tỉnh ủy Lâm Đồng, Thường trực Ban Bí thư, Trưởng Ban Tổ chức Trung ương Trương Thị Mai đặc biệt nhấn mạnh về công tác phòng, chống tiêu cực của đội ngũ cán bộ, đảng viên.
  </p>
</article>`,
};
const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
};

const NewsDetail1 = () => {
  const {width} = useWindowDimensions();
  return (
    <ScrollView>
      <SafeAreaView
        style={{
          paddingHorizontal: s(15),
        }}>
        <TouchableOpacity onPress={() => navigationRef.goBack()}>
          <AntDesign name="arrowleft" size={s(25)} color={COLORS.black} />
        </TouchableOpacity>
        <RenderHTML
          source={source}
          contentWidth={width}
          renderersProps={renderersProps}
          enableExperimentalMarginCollapsing={true}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default NewsDetail1;
