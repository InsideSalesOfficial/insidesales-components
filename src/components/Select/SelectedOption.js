import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';


const Label = styled.span`
padding: 22px 26px 0 16px;
`;

class SelectedOption extends React.Component {
  render() {
    return <Label>{this.props.option && this.props.option.label}</Label>
  }
}

export default SelectedOption;