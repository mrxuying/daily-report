import React from 'react'
import { Link } from 'react-router-dom'
import { RightOutline } from 'antd-mobile-icons'

import NavBarCustom from '../../components/NavBarCustom'
import './index.less'

export default function Personal() {

  const signOut = () => {
    console.log('logout')
  }

  return (
    <div className='personal-box'>
      <NavBarCustom title='Personal' />
      <div className="avator">
        <img src="http://127.0.0.1:7100/timg.jpg" alt="" />
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
