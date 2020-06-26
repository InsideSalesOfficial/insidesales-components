import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

import Dropdown from './Dropdown';

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

const Caret = styled.div`
  position: absolute;
  right: 24px;
  top: ${(props) => {
    if (props.theme.caretTopPosition) {
      return props.theme.caretTopPosition;
    }

    return '50%';
  }};
  transform: translateY(-50%);
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    margin: auto;
    border-left: 5px transparent solid;
    border-right: 5px transparent solid;
    border-${props => props.open ? 'bottom' : 'top'}: 5px ${props => {
      if (props.theme.borderColor){
        return renderThemeKeyOrDefaultValue({ props, key: 'brand01', defaultValue: props.theme.borderColor });
      }
      return props.open ? renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: colors.black90 }) : renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: colors.black40 });
    }} solid;
  }
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
  render() {
    return (
      <Wrapper>

        <Button>
          <Label>{this.props.label}</Label>
          <Caret />
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