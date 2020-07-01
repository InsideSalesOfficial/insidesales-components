import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

import Dropdown from './Dropdown';
import Caret from './Caret';

const Wrapper = styled.div`
  outline: none;
`;

const Label = styled.label`
  transition: all 200ms;
  transform: translateY(-50%);
  position: absolute;
  left: 16px;
  top: ${props => props.isOptionSelected ? '30%' : '50%'};
  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: colors.white90 })};
  ${props => props.isOptionSelected && typography.caption}
`;

const SelectedOption = styled.span`
  padding: 22px 26px 0 16px;
  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: colors.white90 })};
`;

const Button = styled.div`
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
  border-radius: 2px;
  border-bottom-color: ${props => {
    if(props.isFocused) {
      return renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: colors.black40 });
    }
    return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: colors.black40 });
  }};

  cursor: ${props => props.isDisabled ? 'auto' : 'pointer'};

  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white60', defaultValue: colors.black60 })};
  background: ${props => renderThemeKeyOrDefaultValue({ props, key: 'primary03', defaultValue: props.theme.background })};

  ${typography.subhead1};
`;

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

  handleKeyDown = (event) => {
    console.log('>>', event.key);
    switch(event.key) {
      case 'Enter':
        this.toggleOpenState();
        break;
      default:
        break;
    }
  }

  handleButtonClick = (event) => {
    console.log('>>', 'handleButtonClick');
    this.toggleOpenState();
  }

  handleOptionSelected = (option) => {
    console.log('>>', 'handleOptionSelected');
    this.setState({
      selectedOption: option,
      isOpen: false,
    });
  }

  toggleOpenState = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  isOptionSelected = () => {
    return (typeof this.state.selectedOption === 'object');
  }

  render() {
    return (
      <Wrapper
        tabIndex={1}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
      >
        <Button
          tabIndex={-1}
          onClick={this.handleButtonClick}
          isFocused={this.state.isFocused}
        >
          <Label isOptionSelected={this.isOptionSelected()} >{this.props.label}</Label>
          <Caret isOpen={this.state.isOpen} />
          <SelectedOption>{this.state.selectedOption && this.state.selectedOption.label}</SelectedOption>
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