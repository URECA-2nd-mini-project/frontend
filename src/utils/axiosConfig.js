import axios from 'axios';

const createInstance = (url) => {
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

let Instance = createInstance('');

const initInstance = (url) => {
  Instance = createInstance(url);
};

export { Instance, initInstance };
