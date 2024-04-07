import axios from 'axios';
import {BASE_URL} from './url';
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
export default useAPI;
