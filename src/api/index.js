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

export const api = {
  queryNewsLatest,
  queryNewsBefore,
  queryNewsInfo,
  queryCollectionExtra
}