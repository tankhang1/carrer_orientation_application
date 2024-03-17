export type TNewsData = {
  image: string;
  createdAt: Date;
  content: string;
  key: string;
};
export type TNewsCategory = {
  id: string;
  title: string;
  image: any;
};
const NewsData: TNewsData[] = [
  {
    key: '12312',
    image:
      'https://cdnphoto.dantri.com.vn/UEE2aLJvmNzkeOmPibcAR-DpYts=/thumb_w/1020/2024/03/17/3f10e48c80622c3c7573-crop-edited-edited-1710608489113.jpeg',
    createdAt: new Date(),
    content:
      'Một số khác cấp tập tìm cách tra xem bản thân có đang "mắc nợ" ngân hàng không. Quang Anh (TPHCM) đã sử dụng thẻ tín dụng 2 năm nay. Sau sự việc xảy ra, anh này và nhóm bạn thân nhanh chóng đăng ký và tra cứu thông tin tín dụng của bản thân trên CIC.',
  },
  {
    key: 'dqwdq',
    image:
      'https://cdnphoto.dantri.com.vn/RwiqR6yiOD-7Gp4TR23YCv0bWNM=/thumb_w/1020/2024/03/01/dsc07789-1709283129336.jpg?watermark=true',
    createdAt: new Date(),
    content:
      'Thông tin từ đề án thể hiện, theo kinh nghiệm từ các dự án lúa giảm phát thải trước đây, cách canh tác mới có thể giúp giảm phát thải khoảng 5 tấn CO2/ha/năm so với cách trồng lúa truyền thống. Như vậy, cánh đồng một triệu ha sẽ giảm được 5 triệu tấn CO2.',
  },
  {
    key: 'dqsx',
    image:
      'https://cdnphoto.dantri.com.vn/ulE9_rQujURvBdlfLnMpX3F7dQo=/thumb_w/1020/2024/03/17/bonhiem1731-1710643454083.jpg',
    createdAt: new Date(),
    content:
      'Phát biểu nhận nhiệm vụ, quyền Bí thư Tỉnh ủy Lâm Đồng Nguyễn Thái Học bày tỏ vinh dự khi được Bộ Chính trị, Ban Bí thư Trung ương Đảng, Ban Tổ chức Trung ương tin tưởng, giao trọng trách nhiệm vụ mới.',
  },
];
const NewsDataCategories: TNewsCategory[] = [
  {
    id: '1dasdqw',
    title: 'Kỹ thuật phần mềm',
    image: require('@assets/images/software.png'),
  },
  {
    id: 'mqwkdmq',
    title: 'Khoa học dữ liệu',
    image: require('@assets/images/science.png'),
  },
  {
    id: 'dasldq',
    title: 'Giáo viên',
    image: require('@assets/images/education.png'),
  },
  {
    id: 'qwdqdo',
    title: 'Thiết kế thời trang',
    image: require('@assets/images/fashion.png'),
  },
];
const NewsCategory = [
  {
    id: 'NN',
    title: 'Nghành nghề',
  },
  {
    id: 'TS',
    title: 'Tuyển sinh',
  },
];
export {NewsCategory, NewsData, NewsDataCategories};
