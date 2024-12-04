import React, { useMemo } from 'react'
import timg from '../../assets/images/timg.jpg'
import './index.less'
import { monthCN } from '../../assets/constant';

export default function HomeHead(props) {

  let { today } = props;
  let time = useMemo(() => {
    let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/);
    return {
      month: monthCN[+month] + '月',
      day
    }
  }, [today])//

  return (
    <header className='home-head-box'>
      <div className='info'>
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <h2 className="title">Month Report</h2>
      </div>
      <div className="picture">
        <img src={timg} alt="" />
      </div>
    </header>
  )
}
