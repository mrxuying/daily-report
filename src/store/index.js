import {createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';
import { thunk } from 'redux-thunk';
import promise from 'redux-promise';
import reducer from './reducer';

//开发环境开启日志
let middleware = [thunk, promise],
  env = process.env.NODE_ENV;
// if(env === 'development'){
//   middleware.push(reduxLogger);
// }

//创建store
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

export default store;




// import { configureStore } from '@reduxjs/toolkit'
// // import reduxLogger from 'redux-logger'
// import {thunk} from 'redux-thunk'
// import taskSliceReducer from './features/taskSlice'

// const store = configureStore({
//   reducer: {
//     task: taskSliceReducer,
//   },
//   //如果没有制定中间件则默认集成reduxLogger, reduxThunk
//   middleware: () => [ thunk]
// })
// export default store