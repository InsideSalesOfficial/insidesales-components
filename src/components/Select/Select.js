import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

import Dropdown from './Dropdown';

const Wrapper = styled.div``;

const Label = styled.label``;

const Button = styled.button`
  display: flex;
  align-items: normal;
  outline: none;
  width: 100%;
  height: 56px;
  padding: 22px 26px 0 16px;
  text-align: left;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border: 0;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${buttonBorderColor};
  border-radius: 2px;

  cursor: ${props => props.isDisabled ? 'auto' : 'pointer'};

  ${typography.subhead1};

  color: ${buttonColor};
  background: ${buttonBackground};
`;

function buttonColor(props) {
  return renderThemeKeyOrDefaultValue({ props, key: 'white60', defaultValue: colors.black60 });
}

function buttonBackground(props) {
  return renderThemeKeyOrDefaultValue({ props, key: 'primary03', defaultValue: props.theme.background });
}

function buttonBorderColor(props) {
  return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: colors.black40 });
}


class Select extends React.Component {
  render() {
    return (
      <Wrapper>
        <Label>{this.props.label}</Label>
        <Button>Value</Button>
        <Dropdown options={this.props.options} />
      </Wrapper>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired
};

Select.defaultProps = {
  options: []
};

export default Select;