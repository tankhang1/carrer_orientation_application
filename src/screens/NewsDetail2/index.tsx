import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {lazy, Suspense} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONT, s, vs} from '@utils/config';
import {navigationRef} from '@navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppView from '@components/AppView';
import AppSkeleton from '@components/AppSkeleton';
import AppHeader from '@components/AppHeader';
const RenderHTML = lazy(() => import('react-native-render-html'));
const source = {
  html: `<header>
  <h1>Khoa học dữ liệu</h1>
  <h2>Big Data</h2>
  </header>
  <main>
  <figure>
  <img src="https://cdnphoto.dantri.com.vn/eDIVGBogSesmHGPrCB-vXthzAvo=/2024/03/17/52c8b816-265b-467e-b612-5bda9b5cdfcf-1710652032296.jpeg" alt="Lễ công bố quyết định của Bộ Chính trị về công tác cán bộ">
  <figcaption>Lễ công bố quyết định của Bộ Chính trị về công tác cán bộ tại Đà Lạt, Lâm Đồng.</figcaption>
</figure>
  <section>
    <h3>Mô tả</h3>
    <p>Nghề Big Data liên quan đến việc xử lý và phân tích lượng dữ liệu khổng lồ giúp doanh nghiệp và tổ chức hiểu rõ hơn về thông tin để đưa ra quyết định chiến lược. Công việc này đòi hỏi sự hiểu biết sâu sắc về các công nghệ, phương pháp phân tích dữ liệu, và khả năng tương tác với các nguồn dữ liệu khác nhau.</p>
  </section>
  <section>
    <h3>Lợi ích</h3>
    <ul>
      <li>Nhu cầu nhân lực cao. Nhu cầu về các chuyên gia Big Data đang tăng cao trên toàn cầu, đặc biệt là ở các lĩnh vực như tài chính, ngân hàng, bán lẻ, v.v.</li>
      <li>Mức lương hấp dẫn. Mức lương cho các vị trí Big Data thường cao hơn so với các ngành nghề khác.</li>
      <li>Cơ hội phát triển nghề nghiệp rộng mở. Ngành Big Data liên tục phát triển, mở ra nhiều cơ hội học hỏi và thăng tiến.</li>
      <li>Môi trường làm việc năng động và sáng tạo. Làm việc trong môi trường đa dạng, với những con người đam mê và sáng tạo.</li>
    </ul>
  </section>
  <section>
    <h3>Khó khăn</h3>
    <ul>
      <li>Khối lượng công việc lớn. Phân tích dữ liệu là một quá trình phức tạp và tốn nhiều thời gian.</li>
      <li>Yêu cầu kiến thức chuyên môn cao. Cần có kiến thức về nhiều lĩnh vực khác nhau như lập trình, thống kê, học máy, v.v.</li>
      <li>Áp lực công việc cao. Do nhu cầu về dữ liệu ngày càng tăng, các chuyên gia Big Data thường phải chịu áp lực cao để hoàn thành công việc.</li>
      <li>Cạnh tranh cao. Ngành Big Data thu hút nhiều người tài năng, do vậy cạnh tranh cho các vị trí cao cũng cao.</li>
    </ul>
  </section>
  <section>
    <h3>Tính cách cần có</h3>
    <ul>
      <li>Kiên nhẫn và tỉ mỉ. Phân tích dữ liệu là một quá trình đòi hỏi sự kiên nhẫn và tỉ mỉ cao.</li>
      <li>Có khả năng tư duy logic và giải quyết vấn đề. Cần có khả năng phân tích dữ liệu và đưa ra các giải pháp phù hợp.</li>
      <li>Ham học hỏi và thích nghi nhanh chóng. Ngành Big Data liên tục phát triển, do vậy cần có khả năng cập nhật kiến thức mới thường xuyên.</li>
      <li>Làm việc nhóm tốt. Big Data là một lĩnh vực đòi hỏi sự phối hợp và công tác giữa nhiều người.</li>
    </ul>
  </section>
  <section>
    <h3>Kỹ năng cần thiết</h3>
    <ul>
      <li>Kỹ năng lập trình Python, Java, R, v.v.</li>
      <li>Kiến thức về thống kê và học máy.</li>
      <li>Kỹ năng phân tích dữ liệu và giải quyết vấn đề.</li>
      <li>Kỹ năng giao tiếp.</li>
    </ul>
  </section>
  <section>
    <h3>Trường đào tạo</h3>
    <ul>
      <li>Đại học FPT</li>
      <li>Đại học Bách khoa Hà Nội</li>
      <li>Đại học Ngoại thương</li>
      <li>Đại học RMIT Việt Nam</li>
      <li>Đại học Quốc gia Thành phố Hồ Chí Minh</li>
    </ul>
  </section>
  </main>
  <footer>
  <p>© 2023 - Khóa học Big Data</p>
  </footer>`,
};
const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
};

const NewsDetail2 = () => {
  const params: any = navigationRef.getCurrentRoute()?.params;
  const {width} = useWindowDimensions();
  return (
    <AppView>
      <SafeAreaView>
        <AppHeader title={params?.title} />
        <View style={{paddingHorizontal: s(27)}}>
          <Suspense
            fallback={
              <View style={{gap: vs(5), marginTop: 10}}>
                <AppSkeleton width={'100%'} height={20} radius={10} />
                <AppSkeleton width={'92%'} height={20} radius={10} />
                <AppSkeleton width={'67%'} height={20} radius={10} />
                <AppSkeleton width={'80%'} height={20} radius={10} />
                <AppSkeleton width={'10%'} height={20} radius={10} />
              </View>
            }>
            <RenderHTML
              source={source}
              contentWidth={width}
              renderersProps={renderersProps}
              enableExperimentalMarginCollapsing={true}
              tagsStyles={{
                header: {
                  color: 'black',
                },
                main: {
                  color: 'black',
                },
                footer: {
                  color: 'black',
                },
              }}
            />
          </Suspense>
        </View>
      </SafeAreaView>
    </AppView>
  );
};

export default NewsDetail2;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
  },
});
