import React, { useMemo } from 'react'
import { Link } from 'react-router-dom';
import timg from '../../assets/images/timg.jpg'
import './index.less'
import { monthCN } from '../../assets/constant';
import { connect } from 'react-redux';


function HomeHead(props) {

  let { today, userInfo } = props;
  // console.log(userInfo)
  let time = useMemo(() => {
    let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/);
    return {
      month: monthCN[+month] + '月',
      day
    }
  }, [today])//

  if (userInfo.pic) timg = userInfo.pic;

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
          <img src={timg} alt="" />
        </div>
      </Link>

    </header>
  )
}

export default connect(
  state => ({ userInfo: state.base }),
  {}
)(HomeHead);
