import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

import Dropdown from './Dropdown';
import Label from './Label';
import Caret from './Caret';

const Wrapper = styled.div`
  outline: none;
  user-select: none;
`;

const SelectedOption = styled.span`
  padding: 22px 26px 0 16px;
  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: colors.white90 })};
`;

const SelectToggle = styled.div`
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
      handleOptionSelected.bind(this)(
        this.props.multiSelect,
        this.props.onChange,
        this.props.options[this.state.focusedOption]
      );
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

function handleOptionSelected(isMultiSelect, onChangeFunction, option) {
  console.log('>>', 'handleOptionSelected', isMultiSelect, onChangeFunction, option);

  this.setState({
    isOpen: false
  });

  onChangeFunction(option.value);
  // if(isMultiSelect) {
  //   if(_.includes(this.props.value, newValue)) {
  //     this.props.onChange(_.without(this.props.value, newValue));
  //   } else if (_.isArray(this.props.value)) {
  //     this.props.onChange(_.concat(this.props.value, [newValue]));
  //   } else {
  //     this.props.onChange([newValue]);
  //   }
  // } else {
  //   this.props.onChange(newValue);
  //   this.closeOptionsList();
  // }
}

function isValued(value) {
  if(value === undefined || value === null) return false;
  else if (typeof value === 'boolean') return true;
  else if (typeof value === 'number') return true;
  else if (typeof value === 'string' && value.length > 0) return true;
  else if (Array.isArray(value) && value.length > 0) return true;
  else if (typeof x === 'symbol') return true;

  return typeof value === 'object' && Object.keys(value).length > 0;
}

class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      isOpen: false,
      focusedOption: undefined
    }
  }

  render() {
    return (
      <Wrapper
        tabIndex={0}
        onBlur={handleBlur.bind(this)}
        onFocus={handleFocus.bind(this)}
        onKeyDown={handleKeyDown.bind(this)}
      >
        <SelectToggle
          tabIndex={-1}
          onClick={handleButtonClick.bind(this)}
          isFocused={this.state.isFocused}
        >
          <Label
            isOptionSelected={isValued(this.props.value)}
            label={this.props.label}
          />
          <Caret isOpen={this.state.isOpen} />
          <SelectedOption>{this.props.value}</SelectedOption>
        </SelectToggle>
        <Dropdown
          onSelect={handleOptionSelected.bind(this, this.props.multiSelect, this.props.onChange)}
          isOpen={this.state.isOpen}
          options={this.props.options}
          promotedOptions={this.props.promotedOptions}
          focusedOption={this.state.focusedOption}
        />
      </Wrapper>
    );
  }
}

Select.defaultProps = {
  value: '',
  label: '',
  isDisabled: false,
  theme: {},
  isPlaceHolder: false,
  error: false,
  required: false,
  onChange: _.noop
}

Select.propTypes = {
  value: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.any,
  })).isRequired,
  promotedOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.any,
  })),
  onChange: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  isPlaceHolder: PropTypes.bool,
  required: PropTypes.bool,
  multiSelect: PropTypes.bool,
  searchable: PropTypes.bool,
  error: PropTypes.bool
}

export default Select;