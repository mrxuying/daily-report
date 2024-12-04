import React, {Suspense} from "react";
import {
  Routes, 
  Route, 
  useNavigate, 
  useLocation, 
  useParams, 
  useSearchParams } from 'react-router-dom'
import { Mask, DotLoading } from "antd-mobile";
import routes from "./routes";

//统一路由配置
const Element = (props) => {
  let {component: Component, meta} = props;

  //修改页面title
  let {title='Daily-Report'} = meta || {};
  document.title = title;

  const navigete = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams();

  return <Component navigete={navigete} location={location} params={params} usp={usp}/>;
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