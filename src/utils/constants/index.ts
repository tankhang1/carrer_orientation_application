import {QueryClient} from '@tanstack/query-core';

const QUERY_KEY = {
  EXAMS: 'EXAMS',
  NEWS: 'NEWS',
  NEWS_NEWEST: 'NEWS_NEWEST',
  NEWS_CATEGORIES: 'NEWS_CATEGORIES',
  SCHOOL_SUBJECTS: 'SCHOOL_SUBJECTS',
};
export const queryClient = new QueryClient();
export {QUERY_KEY};
