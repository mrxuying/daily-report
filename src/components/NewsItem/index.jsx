import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'antd-mobile'
import { Link } from 'react-router-dom'

import './index.less'

export default function NewsItem(props) {
  let { story } = props;
  let { id, title, hint, images, image } = story;
  if (!images) images = [image];
  if (!Array.isArray(story.images)) images = [image]
  return (
    <div className='news-item-box'>
      <Link to={{ pathname: `/detail/:${id}` }}>
        <div className="news-content">
          <h4>{title}</h4>
          {hint ? <p>{hint}</p> : null}
        </div>
        <Image src={images[0]} lazy />
      </Link>
    </div>
  )
}

NewsItem.propTypes = {
  story: PropTypes.object.isRequired
}
