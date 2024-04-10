const BASE_URL = 'http://192.168.1.6:3000';
const ENDPOINTS_URL = {
  EXAM: {
    GET_EXAM: '/exams',
    ADD_EXAM: '/exams/addExam',
    DELETE_EXAM: '/exams/deleteExam',
    UPDATE_EXAM: '/exams/updateExam',
  },
  NEWS: {
    GET_NEWS: '/news',
    GET_NEWEST_NEWS: '/news/newest',
    GET_ALL_NEWS_DETAIL: '/news/all',
  },
};
export {BASE_URL, ENDPOINTS_URL};
