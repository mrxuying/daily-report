import React from 'react';
import { Link } from 'react-router-dom';
import { RightOutline } from 'antd-mobile-icons';
import { connect } from 'react-redux';

import NavBarCustom from '../../components/NavBarCustom';
import './index.less';
import action from '../../store/action';
import utils from '../../assets/utils';

function Personal(props) {

  const { userInfo, clearUserInfo, clearCollectionList, navigate } = props;

  const signOut = () => {
    //清楚公共状态中的用户信息和收藏信息
    clearUserInfo();
    clearCollectionList();
    utils.storage.remove('tk');
    //跳转到登录页
    navigate('/login?to=/personal', { replace: true })

  }

  return (
    <div className='personal-box'>
      <NavBarCustom title='Personal' />
      <div className="user-info">
        <img className='user-avator' src={userInfo?.pic} alt="" />
        <p className='name'>{userInfo?.name}</p>
      </div>
      <div className="settings">
        <Link to={{ pathname: '/collection' }}>
          <div className="link">
            <span>Personal Collections</span>
            <RightOutline />
          </div>
        </Link>
        <div className="link" onClick={signOut}>
          <span>Sign Out</span>
          <RightOutline />
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => state.base,
  {
    clearUserInfo: action.base.clearUserInfo,
    clearCollectionList: action.collection.clearCollectionList
  }

)(Personal)
