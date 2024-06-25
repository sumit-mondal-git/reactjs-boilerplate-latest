// import axios from 'axios';
// import dayjs from 'dayjs';
// import { jwtDecode } from 'jwt-decode';
// import packageJson from '../../../package.json';
// import { deleteCaches, getLocalStorage, isMobileApp, setLocalStorage } from '../../common/common';
// import pako from 'pako';
// const baseURL = process.env.REACT_APP_API_URL;
// const authService = process.env.REACT_APP_API_URL;
// const apiVersion = packageJson.version;

// let accessToken = '';
// accessToken = getLocalStorage('accessToken', '') ? getLocalStorage('accessToken', '') : null;
// const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     Authorization: getLocalStorage('accessToken', ''),
//     version: isMobileApp() ? `rjsa ${apiVersion}` : `rjsw ${apiVersion}`
//   }
// });
// const clearLocalStorage = () => {
//   deleteCaches();
//   localStorage.clear();
//   sessionStorage.clear();
// };
// const obtainNewAccessToken = async () => {
//   try {
//     const response = await axios.post(`${authService}auth/getAccessToken`, {
//       token: getLocalStorage('refreshToken', '')
//     });
//     if (response.data.status_code == 200) {
//       setLocalStorage('accessToken', response.data.data.token);
//       return response.data.data.token;
//     }
//   } catch (error) {
//     try {
//       const response = await axios.post(`${authService}auth/getRefreshToken`, {
//         token: getLocalStorage('refreshToken', '')
//       });
//       if (response.data.status_code == 200) {
//         setLocalStorage('accessToken', response.data.data.token);
//         setLocalStorage('refreshToken', response.data.data.refresh_token);
//       }
//       return response.data.data.token;
//     } catch (error) {
//       clearLocalStorage();
//       return Promise.reject('loginAgain');
//     }
//   }
// };
// const refreshExpiredTokenClosure = () => {
//   let isCalled = false;
//   let runningPromise = undefined;
//   return () => {
//     if (isCalled) {
//       return runningPromise;
//     } else {
//       isCalled = true;
//       runningPromise = obtainNewAccessToken();
//       return runningPromise.finally(() => {
//         isCalled = false;
//         runningPromise = undefined;
//       });
//     }
//   };
// };

// // stores the function returned by refreshExpiredTokenClosure
// const refreshExpiredToken = refreshExpiredTokenClosure();

// axiosInstance.interceptors.request.use(
//   async (req) => {
//     accessToken = getLocalStorage('accessToken', '') ? getLocalStorage('accessToken', '') : null;
//     req.headers.Authorization = accessToken || '';

//     let access = ''; //jwtDecode(accessToken);
//     access = jwtDecode(accessToken);
//     let isExpired = '';
//     isExpired = dayjs.unix(access.exp).diff(dayjs()) < 1;
//     let isgetMethod = req?.method == 'get';
//     let utmSource = getLocalStorage('utm_source', '');
//     if (isgetMethod && utmSource) {
//       let base_url = req.baseURL ? req.baseURL : baseURL;
//       let req_url = new URL(base_url + req.url);

//       if (!req_url.searchParams.has('utm_source')) {
//         req_url.searchParams.append('utm_source', utmSource);
//         req.url = req_url.toString();
//       }
//     }

//     if (isExpired) {
//       const updatedToken = await refreshExpiredToken();
//       req.headers['Authorization'] = updatedToken;
//       return req;
//     }
//     return req;
//   },
//   async (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     try {
//       var bytes = window
//         .atob(response.data)
//         .split('')
//         .map(function (c) {
//           return c.charCodeAt(0);
//         });

//       var inflated = pako.inflate(bytes, { to: 'string' });
//       response.data = JSON.parse(inflated);
//       return response;
//     } catch {
//       return response;
//     }
//   },

//   async (error) => {
//     const originalRequest = error.config;

//     // logout user's session if refresh token api responds 401 UNAUTHORIZED
//     if (
//       error?.response?.status === 401 &&
//       originalRequest.url === `${authService}auth/getAccessToken`
//     ) {
//       clearLocalStorage();
//       axiosInstance.defaults.headers = {};
//       window.location.href = '/';
//       return Promise.reject(error);
//     }

//     // if request fails with 401 UNAUTHORIZED status and 'Token has expired' as response message
//     // then it calls the api to generate new access token
//     if (error?.response?.status === 401) {
//       const updatedToken = await refreshExpiredToken();
//       originalRequest.headers['Authorization'] = updatedToken;
//       return axiosInstance(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );
// export default axiosInstance;
