import * as TYPES from '../actiontypes';
import {api} from '../../api'

const baseAction = {
  //从服务器异步获取用户信息，并完成派发
  async queryUserInfoAsync(){
    let userInfo = null
    try {
      let {code, data} = await api.queryUserInfo();
      if(+code === 0){
        userInfo = data;
      }
    } catch (error) {}
    //派发
    return {
      type: TYPES.BASE_INFO,
      userInfo
    }
  },

  clearUserInfo(){
    //派发修改公共状态
    return{
      type: TYPES.BASE_INFO,
      userInfo: null
    }
  }
};

export default baseAction;