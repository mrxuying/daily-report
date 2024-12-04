import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';

export default function NacBarCustom(props) {
  let { title } = props;
  const handleBack = () => {

  };
  return (
    <NavBar onBack={handleBack}>

    </NavBar>
  );
}

NacBarCustom.defaultProps = {
  title: 'Personal'
}

NacBarCustom.propTypes = {
  title: PropTypes.string
}
