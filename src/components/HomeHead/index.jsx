import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import timg from '../../assets/images/timg.jpg'
import './index.less'
import { monthCN } from '../../assets/constant';
import action from '../../store/action';



function HomeHead(props) {

  let { today, userInfo, queryUserInfoAsync } = props;

  let time = useMemo(() => {
    let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/);
    return {
      month: monthCN[+month] + '月',
      day
    }
  }, [today])//

  useEffect(() => {
    console.log(userInfo)
    if (!userInfo) {
      queryUserInfoAsync()
    }
  }, [])//eslint-disable-line

  return (
    <header className='home-head-box'>
      <div className='info'>
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <h2 className="title">Month Report</h2>
      </div>
      <Link to={{ pathname: '/personal' }}>
        <div className="picture">
          <img src={userInfo ? userInfo.pic : timg} alt="" />
        </div>
      </Link>

    </header>
  )
}

export default connect(
  state => state.base,
  action.base
)(HomeHead);
