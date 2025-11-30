import axios from "axios";
import store from "../store";
const Axios = axios.create({
  baseURL: "https://backend.edugately.com/api/v1/",
  // baseURL: "http://10.80.80.198:8000/api/v1/",
  timeout: 30000,
  timeoutErrorMessage: "Connection is lost. Server not responded",
});

Axios.interceptors.request.use(
  (configs) => {
    const token = store.getState().payload?.payload?.access;
    // console.log('token 1',token);
    const token2 = localStorage.getItem('acces')
    // console.log('token 2',token2);
    const lang = store.getState().payload?.user?.lang?.languageValue
    if (token2 || token) {
      configs.headers.Authorization = token ? `Bearer ${token}` : `Bearer ${token2}` ? `Bearer ${token2}` : ''
    }
    configs.headers['Accept-language'] = lang ?? 'ru';
    // console.log('config',configs);
    return configs
  },
  (err) => {
    console.log(err)
  }
);
// Axios.interceptors.request.use((configs) => {
//   const token = store.getState().user.token
//   constlocalStorage.getItem('token')  '';
//   configs.headers.Authorization = token ? Berear ${token} : '';
//   configs.headers.language = 'uz';
//   return configs;
// }, (err) => {
// });

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default Axios;
