import axios from 'axios';
import {BASE_URL, ENDPOINTS_URL} from './url';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
type TMethod = 'GET' | 'POST';
const useAPI = <P, D>(
  url: string,
  method: TMethod,
  options: {data?: D; params?: P},
) => {
  const {data, params} = options;
  return new Promise((resolve, reject) => {
    axios({
      baseURL: BASE_URL,
      url: url,
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
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

export const uploadImage = async (url: string, mime: string) => {
  console.log('url', url);
  try {
    // Convert the local image URI to a Blob
    // const response = await RNFetchBlob.config({
    //   fileCache: true,
    // }).fetch('GET', url);
    // console.log(response);
    const formData = new FormData();
    formData.append('file', {
      uri: url,
      type: mime,
      name: url,
    });
    const response = await axios({
      baseURL: BASE_URL,
      url: ENDPOINTS_URL.UPLOAD.UPLOAD_OCR,
      method: 'POST',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};
export default useAPI;
