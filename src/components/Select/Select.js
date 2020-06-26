import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

import Dropdown from './Dropdown';
import Caret from './Caret';

const Wrapper = styled.div``;

const Label = styled.label`
  left: 16px;
  top: 30%;
  position: absolute;
  transition: all 200ms;
  transform: translateY(-50%);
  ${typography.caption}
`;

const Value = styled.span`
  padding: 22px 26px 0 16px;
`;

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: normal;
  outline: none;
  width: 100%;
  height: 56px;
  padding: 0;
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
  constructor() {
    super();
    this.state = {
      open: false
    }
  }

  render() {
    return (
      <Wrapper>

        <Button>
          <Label>{this.props.label}</Label>
          <Caret open={this.state.open} />
          <Value>Value</Value>
        </Button>
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