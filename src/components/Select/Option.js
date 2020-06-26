import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {fontWeights, colors, renderThemeKeyOrDefaultValue} from "../styles";

class Option extends React.Component {
  render() {
    console.log('>>', this.props);
    const {value, label} = this.props;

    return (<li>{value}, {label}</li>);
  }
}

Option.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string
};

export default Option;