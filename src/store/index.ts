import {MMKV} from 'react-native-mmkv';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';

export const storage = new MMKV();

export const KEY_STORE = {
  LIST_RESULT: 'LIST_RESULT',
  LIST_CHAT: 'LIST_CHAT',
};
