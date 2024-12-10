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

// 收藏新闻
const collect = (newsId) => {
    return http.post('/api/store', { newsId });
};

// 移除收藏
const removeCollection = (id) => {
    return http.get('/api/store_remove', {
        params: {
            id
        }
    });
};

// 获取收藏列表
const collectionList = () => http.get('/api/store_list');

// 图片上传「要求FormData格式」
const upload = (file) => {
    let fm = new FormData();
    fm.append('file', file);
    return http.post('/api/upload', fm);
};

// 修改个人信息
const userUpdate = (username, pic) => {
    return http.post('/api/user_update', {
        username,
        pic
    });
};


export const api = {
  queryNewsLatest,
  queryNewsBefore,
  queryNewsInfo,
  queryCollectionExtra,
  queryStoryExtra,
  sendCodeToPhone,
  loginByCode,
  queryUserInfo,
  collect,
  removeCollection,
  collectionList,
  upload,
  userUpdate
}