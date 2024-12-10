import http from "./api";

const queryNewsLatest = () => {
  return http.get('/api/news_latest');
}

const queryNewsBefore = (time) => {
  return http.get('/api/news_before', {
    params: {time}
  });
};

const queryNewsInfo = (id) => {
  return http.get('/api/news_info',{
    params: {id}
  });
}

const queryCollectionExtra = (id) => {
  return http.get('/api/story_extra',{
    params: {id}
  });
};

const queryStoryExtra = (id) => {
  return http.get('/api/story_extra',{
    params: {id}
  });
};

const sendCodeToPhone = (phone) => {
  return http.post('/api/phone_code', {phone});
};

const loginByCode = (phone, code) => {
  return http.post('/api/login', {phone, code});
};

const queryUserInfo = () => {
  return http.get('/api/user_info');
};

export const api = {
  queryNewsLatest,
  queryNewsBefore,
  queryNewsInfo,
  queryCollectionExtra,
  queryStoryExtra,
  sendCodeToPhone,
  loginByCode,
  queryUserInfo
}