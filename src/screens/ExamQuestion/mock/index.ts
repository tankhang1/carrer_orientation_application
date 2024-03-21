export const IQ_TEST = [
  {
    question: 'Chọn hình ảnh đúng nhất',
    answers: [
      {
        image: 'https://ibb.co/G5DZqxY',
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
];
export const EQ_TEST = [
  {
    question:
      '1. Bạn đang ở trên một chuyến bay và đột nhiên máy bay rung lắc mạnh. Bạn sẽ làm gì trong tình huống này?',
    answers: [
      'a. Không quan tâm.',
      'b. Thận trọng, cẩn thận nghe các tiếp viên hàng không chỉ dẫn trong trường hợp khẩn cấp.',
      'c. Phân vân giữa A và B.',
    ],
  },
  {
    question:
      '2. Bạn đưa một nhóm trẻ 4 tuổi đến công viên, một bé gái trong số đó bắt đầu khóc bởi vì đám trẻ không chịu chơi với nó. Bạn sẽ làm gì?',
    answers: [
      'a. Đứng ngoài và để bọn trẻ tự giải quyết.',
      'b. Nói chuyện với cô bé và tìm cách để đám trẻ kia chơi chung với bạn mình.',
      'c. Nhẹ nhàng bảo cô bé nín khóc.',
      'd. Chỉ cho cô bé những thứ khác mà cô bé có thể chơi.',
    ],
  },
];

export const HOLLAND_TEST = [
  {
    question:
      'Bạn có nhiều sở thích liên quan đến nhóm KỸ THUẬT? Hãy chọn một hoặc nhiều đáp án gần giống với bạn nhất nhé!',
    answers: [
      'Tôi thích làm các công việc thủ công như cắt may, xếp giấy, đan, móc, khắc chữ...',
      'Tôi thích trang điểm; chăm chút, làm đẹp cho bản thân và người khác.',
      'Tôi thích chăm sóc, cắt tỉa cây cảnh.',
      'Tôi thích mày mò, sửa chữa các đồ vật bị hư hỏng.',
      'Tôi thích khám phá cấu tạo bên trong của các đồ vật, máy móc, thiết bị.',
      'Tôi thích làm việc ngoài trời với không gian mở hơn là bên trong phòng học kín.',
      'Tôi là người độc lập và thích làm việc một mình.',
      'Tôi thích làm những việc có thể hoàn thành bằng tay chân (cho dù yêu cầu tỉ mỉ) hơn là những công việc phải suy nghĩ nhiều.',
      'Tôi hay tò mò về bất cứ thứ gì xung quanh mình (Thiên nhiên, khoa học kỹ thuật, không gian;...)',
      'Tôi không phải người hoạt ngôn, dễ hòa nhập với môi trường mới.',
    ],
  },
];

export const SAMPLE_EXAM: IExam[] = [
  {
    type: 'IQ',
    questions: [
      {
        questionTitle: 'Chọn hình ảnh đúng nhất',
        image:
          'https://img.freepik.com/free-vector/counting-number-0-9-math-symbols_1308-104139.jpg',
        answers: [
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
        answers: [
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
        answers: [
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
