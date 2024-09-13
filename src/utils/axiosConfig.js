import axios from 'axios';

const baseAPI = (url) => {
  const config = {
    baseURL: url,
    headers: {
      'Cache-Control': 'no-cache', // 캐시를 사용하지 않도록 설정
      'Access-Control-Allow-Credentials': true, // 쿠키 등 인증 정보의 접근 허용
    },
  };

  // .create(config) 메소드로 axios 인스턴스를 생성
  const instance = axios.create(config);

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const authAPI = (url) => {
  const config = {
    baseURL: url,
    headers: {
      'Cache-Control': 'no-cache', // 캐시를 사용하지 않도록 설정
      'Access-Control-Allow-Credentials': true, // 쿠키 등 인증 정보의 접근 허용
    },
  };

  // .create(config) 메소드로 axios 인스턴스를 생성
  const instance = axios.create(config);

  // 요청 인터셉터, request를 전송하기 전에 사용자 인증 토큰을 헤더에 담을 수 있음
  instance.interceptors.request.use(
    (config) => {
      // 요청이 전달되기 전 작업 수행 (토큰을 헤더에 추가)
      return config;
    },
    (error) => {
      // 요청 오류가 있는 작업 수행
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터, response 데이터를 수정하거나 오류를 처리할 수 있음
  instance.interceptors.response.use(
    (response) => {
      // [2XX] 응답 데이터가 있는 작업 수행
      return response;
    },
    (error) => {
      // [4XX] 응답 오류가 있는 작업 수행
      return Promise.reject(error);
    }
  );

  return instance;
};

export const defaultInstance = baseAPI(''); // 서버 주소 추가
export const authInstance = authAPI(''); // 서버 주소 추가
export const youtubeInstance = baseAPI(import.meta.env.VITE_YOUTUBE_API_KEY);
