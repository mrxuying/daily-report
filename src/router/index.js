import React, {Suspense, useEffect, useState} from "react";
import {
  Routes, 
  Route, 
  useNavigate, 
  useLocation, 
  useParams, 
  useSearchParams, 
} from 'react-router-dom'
import { Mask, DotLoading, Toast } from "antd-mobile";
import routes from "./routes";
import store from '../store'
import action from "../store/action";


const isCheckLogin = (path) => {
  let {base: {userInfo}} = store.getState();
  let checkList = ['/personal', '/collection', '/modifier']
  // if(!userInfo){
  //   let userInfoAction = await action.base.queryUserInfoAsync();
  //   userInfo = userInfoAction.userInfo;
  // }
  //如果当前没有登录，并且访问的是需要登录的页面，则返回true
  return !userInfo && checkList.includes(path)
}

//统一路由配置
const Element = (props) => {

  let [_, setRamdom] = useState(0);//eslint-disable-line
  let {component: Component, meta} = props;

  const navigate = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams();
  
  let path = location.pathname;
  let isShow = isCheckLogin(path)

  //使用useEffect钩子函数，实现组件渲染完成后校验页面是否需要登录
  	//1、需要登录的页面：如果已经登录，则直接渲染
  	//2、需要登录的页面：如果没有登录，则跳转到登录页
  	//3、不需要登录的页面，则直接渲染

  useEffect(()=>{
    //如果访问的页面不需要登录或者已经登录，则直接返回，加载页面
    if(!isShow) return;
    (async ()=>{
      //如果访问的页面需要登录，则请求服务器获取用户信息
      let userInfoAction = await action.base.queryUserInfoAsync();
      let userInfo = userInfoAction.userInfo;
      //获取用户信息失败，则提示要登录，ging跳转到登录页面
      if(!userInfo) {
        Toast.show({
          icon: 'fail',
          content: 'Please login'
        })
        //当前没有登录则跳转到登录页面
        navigate({
          pathname: '/login',
          search: `?to=${path}`
        },{replace: true});
        return;
      }
      //如果已经登录，且获取到了用户信息，则更新用户信息
      store.dispatch(userInfoAction);
      //更新状态，驱动页面重新渲染
      setRamdom(+new Date())
    })()
  })
  //登录状态校验
  // let {base: {userInfo}} = store.getState();
  // let checkList = ['/personal', '/collection', '/modifier']
  
  // let {path} = props
  //对于需要登录的页面进行登录状态校验
  /*if(!userInfo && checkList.includes(path)){
    (async ()=>{
      let userInfoAction = await action.base.queryUserInfoAsync();
      userInfo = userInfoAction.userInfo;
      if(!userInfo) {
        Toast.show({
          icon: 'fail',
          content: 'Please login'
        })
        //当前没有登录则跳转到登录页面
        navigate({
          pathname: '/login',
          search: `?to=${path}`
        },{replace: true});
        return <Navigate to={{pathname: '/login', search: `?to=${path}`}} />
      }
      //如果已经登录，则派发更新状态
      store.dispatch(userInfoAction);
    })()
  }*/

  //修改页面title
  let {title='Daily-Report'} = meta || {};
  document.title = title;

  return (
    <>
      {
        !isShow ? <Component navigate={navigate} location={location} params={params} usp={usp}/> :
        <Mask visible={true} opacity='thin'><DotLoading color="white" /></Mask>
      }
    </>
  ) 
};

export default function RouterView() {
  return (
    <Suspense fallback={<Mask visible={true} opacity='thin'><DotLoading color="white" /></Mask>}>
      <Routes>
        {
          routes.map((item) => {
            let {name, path} = item;
            return <Route key={name} path={path} element={<Element {...item} />} />;
          })
        }
      </Routes>
    </Suspense>
  )
};