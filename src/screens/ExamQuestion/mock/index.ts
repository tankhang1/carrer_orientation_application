import {IExam} from '@interfaces/DTO';

export const SAMPLE_EXAM: IExam[] = [
  {
    type: 'IQ',
    questions: [
      {
        questionTitle: 'Chọn hình ảnh đúng nhất câu 1',
        image:
          'https://img.freepik.com/free-vector/counting-number-0-9-math-symbols_1308-104139.jpg',
        options: [
          {
            image: 'https://postimg.cc/nswwcCCV',
            content: 'A',
            isResult: true,
          },
          {
            image: 'https://ibb.co/G5DZqxY',
            content: 'B',
            isResult: false,
          },
          {
            image: 'https://ibb.co/G5DZqxY',
            content: 'C',
            isResult: false,
          },
          {
            image: 'https://ibb.co/G5DZqxY',
            content: 'D',
            isResult: false,
          },
        ],
      },
      {
        questionTitle: 'Chọn hình ảnh đúng nhất câu 2',
        image:
          'https://img.freepik.com/free-vector/counting-number-0-9-math-symbols_1308-104139.jpg',
        options: [
          {
            image: 'https://postimg.cc/nswwcCCV',
            content: 'A',
            isResult: true,
          },
          {
            image: 'https://ibb.co/G5DZqxY',
            content: 'B',
            isResult: false,
          },
          {
            image: 'https://ibb.co/G5DZqxY',
            content: 'C',
            isResult: false,
          },
          {
            image: 'https://ibb.co/G5DZqxY',
            content: 'D',
            isResult: false,
          },
        ],
      },
    ],
  },
  {
    type: 'EQ',
    questions: [
      {
        questionTitle:
          '1. Bạn đang ở trên một chuyến bay và đột nhiên máy bay rung lắc mạnh. Bạn sẽ làm gì trong tình huống này?',
        options: [
          {content: 'a. Không quan tâm.'},
          {
            content:
              'b. Thận trọng, cẩn thận nghe các tiếp viên hàng không chỉ dẫn trong trường hợp khẩn cấp.',
          },
          {content: 'c. Phân vân giữa A và B.'},
        ],
      },
    ],
  },
  {
    type: 'R',
    questions: [
      {
        questionTitle:
          'Bạn có nhiều sở thích liên quan đến nhóm KỸ THUẬT? Hãy chọn một hoặc nhiều đáp án gần giống với bạn nhất nhé!',
        options: [
          {
            content:
              'Tôi thích làm các công việc thủ công như cắt may, xếp giấy, đan, móc, khắc chữ...',
          },
          {
            content:
              'Tôi thích trang điểm; chăm chút, làm đẹp cho bản thân và người khác.',
          },
          {
            content:
              'Tôi thích làm các công việc thủ công như cắt may, xếp giấy, đan, móc, khắc chữ...',
          },
          {
            content:
              'Tôi thích trang điểm; chăm chút, làm đẹp cho bản thân và người khác.',
          },
        ],
      },
    ],
  },
  {
    type: 'A',
    questions: [
      {
        questionTitle:
          'Bạn có nhiều sở thích liên quan đến nhóm NGHỆ THUẬT? Hãy chọn một hoặc nhiều đáp án gần giống với bạn nhất nhé!',
        options: [
          {
            content:
              'Tôi thích làm các công việc thủ công như cắt may, xếp giấy, đan, móc, khắc chữ...',
          },
          {
            content:
              'Tôi thích trang điểm; chăm chút, làm đẹp cho bản thân và người khác.',
          },
          {
            content:
              'Tôi thích làm các công việc thủ công như cắt may, xếp giấy, đan, móc, khắc chữ...',
          },
          {
            content:
              'Tôi thích trang điểm; chăm chút, làm đẹp cho bản thân và người khác.',
          },
        ],
      },
    ],
  },
];
