import {createSlice} from '@reduxjs/toolkit'
import api from '../../api'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
  },
  reducers: {
    setUserInfo(state, action){
      //state:公共状态， 基于immer库管理，不需克隆
      //action: 传递的参数都以action.payload接收
      state.userInfo = action.payload;
    },
    clearUserInfo(state){
      state.userInfo = null;
    }

  }
})

//解构action
export const {setUserInfo, clearUserInfo} = authSlice.actions;

//实现异步派发
export const queryUserInfoAsync = ()=>{
  return async dispatch => {
    let userInfo = null
    try {
      let {code, data} = await api.queryUserInfo();
      if(+code === 0){
        userInfo = data;
      }
    } catch (error) {}
    //派发
    dispatch(setUserInfo(userInfo))
  }
}