// const BASE_URL = 'https://career-app-ndt9.onrender.com';
const BASE_URL = 'http://192.168.0.105:3000';
const ENDPOINTS_URL = {
  EXAM: {
    GET_EXAM: '/exams',
    ADD_EXAM: '/exams/addExam',
    DELETE_EXAM: '/exams/deleteExam',
    UPDATE_EXAM: '/exams/updateExam',
  },
  AUTH: {
    GET_ANNONYMOUS_TOKEN: '/accounts/accessToken',
    LOGIN: '/accounts/login',
    LOGIN_WITH_SOCIAL: '/accounts/loginWithSocial',
    SIGN_UP: '/accounts',
  },
  NEWS: {
    GET_NEWS: '/news',
    GET_NEWEST_NEWS: '/news/newest',
    GET_ALL_NEWS_DETAIL: '/news/all',
    GET_ALL_CATEGORIES: '/news/categories',
  },
  SCHOOL_SUBJECTS: {
    GET_SUBJECTS: '/schoolSubjects/getSubjects',
    CACULATE_SCHOOL_SCORE: '/schoolSubjects/caculateScore',
  },
  CHAT_BOT: {
    GET_CHAT: '/geminiAI/generateChat',
  },
  CONCLUSION: {
    GET_CONCLUSION: '/exams/getConclusion',
  },
  DICTIONARY: {
    GET_DICTIONARY: '/dictionary',
    GET_ALL_SCHOOL: '/dictionary/getAllSchool',
    GET_SCHOOL: '/dictionary/getSchool',
  },
  UPLOAD: {
    UPLOAD_OCR: '/ocr/ocrGemini',
  },
};
export {BASE_URL, ENDPOINTS_URL};
