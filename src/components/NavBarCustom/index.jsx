import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

import './index.less'

export default function NacBarCustom(props) {
  let { title = '' } = props;
  const navigate = useNavigate(),
    location = useLocation(),
    [usp] = useSearchParams();

  const handleBack = () => {
    let to = usp.get('to');
    //如果是从详情页跳转到登录页，没有登录，直接返回到详情页
    if (location.pathname === '/login' && /^\/detail\/\d+$/.test(to)) {
      navigate(to, { replace: true });
      return;
    }
    //其他页面则直接返回上一页面
    navigate(-1)
  };

  return (
    <NavBar onBack={handleBack} >
      {title}
    </NavBar>

  );
}

NacBarCustom.propTypes = {
  title: PropTypes.string
}
