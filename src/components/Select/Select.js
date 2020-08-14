import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { RequiredText } from '../RequiredText/RequiredText';
import { typography, colors, renderThemeKeyOrDefaultValue } from "../styles";
import { singleCharacter } from '../../utils/regexp';

import Dropdown from './Dropdown';
import Label from './Label';
import Caret from './Caret';

const Wrapper = styled.div`
  outline: none;
  user-select: none;
`;

const OptionLabel = styled.span`
  padding: 22px 26px 0 16px;
  color: ${(props) => {
    if (props.isDisabled) return renderThemeKeyOrDefaultValue({ props, key: "white40", defaultValue: colors.white40, });
    if (props.error) return renderThemeKeyOrDefaultValue({ props, key: "warning04", defaultValue: colors.red, });
    return renderThemeKeyOrDefaultValue({ props, key: "white90", defaultValue: colors.white90, });
  }}
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
    if (props.isDisabled) {
      return 'transparent';
    }
    if (props.error) {
      return renderThemeKeyOrDefaultValue({ props, key: 'warning 04', defaultValue: colors.red });
    }
    if (props.isFocused) {
      return renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: colors.black40 });
    }
    if (props.theme.borderColor) {
      return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: props.theme.borderColor });
    }
    return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: colors.black40 });
  }};

  cursor: ${props => props.isDisabled ? 'auto' : 'pointer'};

  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white60', defaultValue: colors.black60 })};
  background: ${props => renderThemeKeyOrDefaultValue({ props, key: 'primary03', defaultValue: props.theme.background })};

  ${typography.subhead1};
`;

function getNextFocusedOption({ isOpen, focusedOption, optionsLength, direction }) {
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

function handleButtonClick(setState) {
  return function () {
    setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }
}

function handleBlur(event) {
  this.timeoutID = setTimeout(() => {
    if (this.state.isFocused) {
      this.setState({
        isFocused: false,
        isOpen: false
      });
    }
  }, 0);
}

function handleFocus(event) {
  clearTimeout(this.timeoutID);
  if (!this.state.isFocused) {
    this.setState({
      isFocused: true
    });
  }
}

function handleKeyDown({
  setState,
  wrapperElement,
  options,
  isMultiSelect,
  onChange,
  focusedOption,
  isOpen,
  currentOption
}) {
  return function (event) {
    if (!isOpen) {
      setState({ isOpen: true });
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionSelected({
        setState: setState,
        wrapperElement: wrapperElement,
        isMultiSelect: isMultiSelect,
        onChangeFunction: onChange,
        currentOption: currentOption
      })(options[focusedOption]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setState({
        isOpen: true,
        focusedOption: getNextFocusedOption({
          isOpen: isOpen,
          focusedOption: focusedOption,
          optionsLength: options.length,
          direction: 'next'
        })
      });
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setState({
        isOpen: true,
        focusedOption: getNextFocusedOption({
          isOpen: isOpen,
          focusedOption: focusedOption,
          optionsLength: options.length,
          direction: 'previous'
        })
      });
      return;
    }

    if (event.key.match(singleCharacter)) { // if alphanumeric key is pressed
      const key = event.key;
      event.preventDefault();
      setState(prevState => {
        return { softSearchFilter: `${prevState.softSearchFilter}${key}` }
      });
      return
    }

  }
}

function handleOptionSelected({ setState, wrapperElement, isMultiSelect, onChangeFunction, currentOption }) {
  return function (option) {
    wrapperElement.focus();
    setState({
      isOpen: !!isMultiSelect
    });

    if (isMultiSelect) {
      if (!Array.isArray(currentOption)) {
        onChangeFunction([option.value]);
      } else if (currentOption.includes(option.value)) {
        onChangeFunction(_.without(currentOption, option.value))
      } else {
        onChangeFunction([...currentOption, option.value]);
      }
    } else {
      onChangeFunction(option.value);
    }
  }
}

function handleSearch({ setState }) {
  return function (searchFilter) {
    setState({
      searchFilter
    });
  }
}

function isValued(value) {
  if (value === undefined || value === null) return false;
  else if (typeof value === 'boolean') return true;
  else if (typeof value === 'number') return true;
  else if (typeof value === 'string' && value.length > 0) return true;
  else if (Array.isArray(value) && value.length > 0) return true;
  else if (typeof x === 'symbol') return true;

  return typeof value === 'object' && Object.keys(value).length > 0;
}

function SelectedOption(props) {
  const label = () => {
    if (Array.isArray(props.selectedOptions) && props.selectedOptions.length > 0) {
      return `${props.selectedOptions.length} Selected`;
    }
    return props.options.reduce((label, option) => {
      if (props.selectedOptions === option.value) return option.label;
      return label;
    }, props.selectedOptions);
  }

  return (
    <OptionLabel
      error={props.error}
      isDisabled={props.isDisabled}
    >
      {label()}
    </OptionLabel>
  )
}

function filterOptionsWithSearch({ options, searchFilter = '' }) {
  if (!_.isArray(options) || _.isEmpty(options)) return [];
  return options.filter(option => {
    if (!_.isObject(option)) return true;
    if (!(_.isString(option.label) || _.isObject(option.label))) return true;
    if (_.isObject(option.label) && !_.isString(option.optionValue)) return true;

    const labelString = _.isString(option.label) ? option.label : option.optionValue;
    return _.includes(labelString.toLowerCase(), searchFilter.toLowerCase());
  });
}

class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      isOpen: false,
      focusedOption: undefined,
      searchFilter: '',
      softSearchFilter: '',
    }
    this.setState = this.setState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // If options props are updated, reset focused state
    if (nextProps.options !== this.props.options || nextProps.promotedOptions !== this.props.promotedOptions) {
      this.setState({
        isOpen: false,
        focusedOption: undefined
      })
    }
    // If search prop is updated, reset search filter
    if (nextProps.searchable !== this.props.searchable) {
      this.setState({
        searchFilter: ''
      })
    }
  }

  render() {
    const options = filterOptionsWithSearch({
      options: this.props.options,
      searchFilter: this.state.searchFilter
    });
    const promotedOptions = filterOptionsWithSearch({
      options: this.props.promotedOptions,
      searchFilter: this.state.searchFilter
    });

    return (
      <Wrapper
        innerRef={(wrapperElement) => (this.wrapperElement = wrapperElement)}
        onBlur={handleBlur.bind(this)}
        onFocus={handleFocus.bind(this)}
        onKeyDown={handleKeyDown({
          currentOption: this.props.value,
          focusedOption: this.state.focusedOption,
          isMultiSelect: this.props.multiSelect,
          isOpen: this.state.isOpen,
          onChange: this.props.onChange,
          options: [...(promotedOptions || []), ...options],
          setState: this.setState,
          wrapperElement: this.wrapperElement,
        })}
        tabIndex={0}
      >
        <SelectToggle
          error={this.props.error}
          isDisabled={this.props.isDisabled}
          isFocused={this.state.isFocused}
          onClick={!this.props.isDisabled && handleButtonClick(this.setState)}
          tabIndex={-1}
        >
          <Label
            error={this.props.error}
            isDisabled={this.props.isDisabled}
            isOptionSelected={isValued(this.props.value)}
            label={this.props.label}
          />
          {this.state.softSearchFilter}
          <Caret
            error={this.props.error}
            isDisabled={this.props.isDisabled}
            isOpen={this.state.isOpen}
          />
          {!this.props.value && !this.state.isOpen && this.props.required && (
            <RequiredText error={this.props.error}>Required</RequiredText>
          )}
          <SelectedOption
            error={this.props.error}
            isDisabled={this.props.isDisabled}
            isMultiSelect={this.props.multiSelect}
            options={[
              ...(this.props.promotedOptions || []),
              ...this.props.options,
            ]}
            selectedOptions={this.props.value}
          />
        </SelectToggle>
        <Dropdown
          focusedOption={this.state.focusedOption}
          isMultiSelect={this.props.multiSelect}
          isOpen={this.state.isOpen}
          onSearch={handleSearch({ setState: this.setState })}
          onSelect={handleOptionSelected({
            currentOption: this.props.value,
            isMultiSelect: this.props.multiSelect,
            onChangeFunction: this.props.onChange,
            setState: this.setState,
            wrapperElement: this.wrapperElement,
          })}
          options={options}
          optionsWidth={this.props.optionsWidth}
          promotedOptions={promotedOptions || []}
          searchable={this.props.searchable}
          selectedOptions={this.props.value}
        />
      </Wrapper>
    );
  }
}

Select.defaultProps = {
  error: false,
  isDisabled: false,
  isPlaceHolder: false,
  label: '',
  multiSelect: false,
  onChange: _.noop,
  required: false,
  theme: {},
  value: '',
}

Select.propTypes = {
  error: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isPlaceHolder: PropTypes.bool,
  label: PropTypes.string,
  multiSelect: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.any, })).isRequired,
  optionsWidth: PropTypes.number,
  promotedOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.any, })),
  required: PropTypes.bool,
  searchable: PropTypes.bool,
  value: PropTypes.any,
}

export default Select;