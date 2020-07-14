import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

import Dropdown from './Dropdown';
import Caret from './Caret';

const Wrapper = styled.div`
  outline: none;
  user-select: none;
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

function getNextFocusedOption({isOpen, focusedOption, optionsLength, direction}) {
  if (!isOpen) return focusedOption;
  if (typeof focusedOption !== 'number') return 0;
  if (direction === 'next') {
    return (focusedOption + 1) % optionsLength;
  } else {
    if (focusedOption === 0) {
      return optionsLength - 1;
    }
    return (focusedOption - 1);
  }
}

function handleButtonClick(event) {
  console.log('>>', 'handleButtonClick');
  this.setState(prevState => ({
    isOpen: !prevState.isOpen
  }));
}

function handleBlur(event) {
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

function handleFocus(event) {
  console.log('>>', 'handleFocus');
  clearTimeout(this.timeoutID);
  if(!this.state.isFocused) {
    this.setState({
      isFocused: true
    });
  }
}

function handleKeyDown(event) {
  console.log('>>', event.key);
  switch(event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      this.setState(prevState => ({
        isOpen: !prevState.isOpen,
        selectedOption: this.props.options[this.state.focusedOption]
      }));
      break;
    case 'ArrowDown':
      event.preventDefault();
      this.setState({
        isOpen: true,
        focusedOption: getNextFocusedOption({
          isOpen: this.state.isOpen,
          focusedOption: this.state.focusedOption,
          optionsLength: this.props.options.length,
          direction: 'next'
        })
      });
      break;
    case 'ArrowUp':
      event.preventDefault();
      this.setState({
        isOpen: true,
        focusedOption: getNextFocusedOption({
          isOpen: this.state.isOpen,
          focusedOption: this.state.focusedOption,
          optionsLength: this.props.options.length,
          direction: 'previous'
        })
      });
      break;
    default:
      break;
  }
}

function isOptionSelected(selectedOption) {
  return (typeof selectedOption === 'object');
}

function handleOptionSelected(option) {
  console.log('>>', 'handleOptionSelected');
  this.setState({
    selectedOption: option,
    isOpen: false,
  });
}

class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      isOpen: false,
      selectedOption: undefined,
      focusedOption: undefined
    }
  }

  render() {
    return (
      <Wrapper
        tabIndex={1}
        onBlur={handleBlur.bind(this)}
        onFocus={handleFocus.bind(this)}
        onKeyDown={handleKeyDown.bind(this)}
      >
        <Button
          tabIndex={-1}
          onClick={handleButtonClick.bind(this)}
          isFocused={this.state.isFocused}
        >
          <Label isOptionSelected={isOptionSelected(this.state.selectedOption)} >{this.props.label}</Label>
          <Caret isOpen={this.state.isOpen} />
          <SelectedOption>{this.state.selectedOption && this.state.selectedOption.label}</SelectedOption>
        </Button>
        <Dropdown
          onSelect={handleOptionSelected.bind(this)}
          isOpen={this.state.isOpen}
          options={this.props.options}
          focusedOption={this.state.focusedOption}
        />
      </Wrapper>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired
};

export default Select;