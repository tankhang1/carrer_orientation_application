import axios from 'axios';
import {BASE_URL, ENDPOINTS_URL} from './url';
import {TImage} from '@utils';
import {KEY_STORE, storage} from '@store';
type TMethod = 'GET' | 'POST';
const api = <P, D>(url: string, method: TMethod, options: {data?: D; params?: P}) => {
  const {data, params} = options;
  const token = storage.getString(KEY_STORE.ANNONYMOUS_TOKEN);
  return new Promise((resolve, reject) => {
    axios({
      baseURL: BASE_URL,
      url: url,
      headers: {Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
      method,
      params,
      data,
    })
      .then(response => {
        const {data} = response;
        console.log(`>>>>>>${url} - ${method} response >>>>>> `, data);
        resolve(data);
      })
      .catch(e => {
        console.log(`>>>>>>${url} - ${method} error >>>>>> `, e);
        reject(e);
      });
  });
};

export const uploadImage = async (file: TImage) => {
  //console.log('file', file);
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios({
      baseURL: BASE_URL,
      url: ENDPOINTS_URL.UPLOAD.UPLOAD_OCR,
      method: 'POST',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    //console.log('res', response);
    const {data} = response;
    return data;
  } catch (e) {
    console.log(e);
  }
};
export default api;
