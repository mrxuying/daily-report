import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'antd-mobile'
import { Link } from 'react-router-dom'

import './index.less'

export default function NewsItem(props) {

  let { story } = props;
  if (!Array.isArray(story.images)) story.images = [""]
  return (
    <div className='news-item-box'>
      <Link to={{ pathname: `/detail/:${story.id}` }}>
        <div className="news-content">
          <h4>{story.title}</h4>
          <span>{story.hint}</span>
        </div>
        <Image src={story.images[0]} lazy />
      </Link>
    </div>
  )
}

NewsItem.propTypes = {
  story: PropTypes.object.isRequired
}
