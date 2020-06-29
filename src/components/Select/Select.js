import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

import SelectedOption from './SelectedOption';
import Dropdown from './Dropdown';
import Caret from './Caret';

const Wrapper = styled.div`
  outline: none;
`;

const Label = styled.label`
  left: 16px;
  top: 30%;
  position: absolute;
  transition: all 200ms;
  transform: translateY(-50%);
  ${typography.caption}
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
  if(props.isFocused) {
    return renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: colors.black40 });
  }
  return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: colors.black40 });
}


class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      isOpen: false,
      selectedOption: undefined
    }
  }

  handleBlur = (event) => {
    console.log('>>', 'handleBlur');
    this.timeoutID = setTimeout(() => {
      if(this.state.isFocused) {
        this.setState({
          isFocused: false,
          isOpen: false
        });
      }
    }, 0);
  }

  handleFocus = (event) => {
    console.log('>>', 'handleFocus');
    clearTimeout(this.timeoutID);
    if(!this.state.isFocused) {
      this.setState({
        isFocused: true
      });
    }
  }

  handleButtonClick = (event) => {
    console.log('>>', 'handleButtonClick');
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleOptionSelected = (option) => {
    console.log('>>', 'handleOptionSelected');
    this.setState({
      selectedOption: option,
      isOpen: false,
    });
  }

  render() {
    return (
      <Wrapper
        tabIndex={1}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >
        <Button
          tabIndex={-1}
          onClick={this.handleButtonClick}
          isFocused={this.state.isFocused}
        >
          <Label>{this.props.label}</Label>
          <Caret isOpen={this.state.isOpen} />
          <SelectedOption option={this.state.selectedOption} />
        </Button>
        <Dropdown
          onSelect={this.handleOptionSelected}
          isOpen={this.state.isOpen}
          options={this.props.options}
        />
      </Wrapper>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired
};

export default Select;