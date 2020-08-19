import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { RequiredText } from '../RequiredText/RequiredText';
import { typography, colors, renderThemeKeyOrDefaultValue } from "../styles";
import * as regexp from '../../utils/regexp';

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

function focusNextOption({ focusedOption, optionsLength }) {
  if (typeof focusedOption !== 'number') return 0;
  return focusedOption >= optionsLength - 1
    ? 1 : focusedOption + 1;
}

function focusPreviousOption({ focusedOption, optionsLength }) {
  if (typeof focusedOption !== 'number') return 0;
  return focusedOption <= 1
  ? optionsLength - 1: focusedOption - 1;
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

function getFocusedOptionValue(options) {
  const option = _.find(options.options, { focusIndex: options.focusedOption } )
  return option.option;
}

function handleKeyDown({
  currentOption,
  focusedOption,
  isMultiSelect,
  isOpen,
  onChange,
  options,
  setState,
  setStateDebounced,
  wrapperElement,
}) {
  return function (event) {
    if (!isOpen) {
      setState({ isOpen: true });
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionSelected({
        currentOption: currentOption,
        isMultiSelect: isMultiSelect,
        onChangeFunction: onChange,
        setState: setState,
        wrapperElement: wrapperElement,
      })(getFocusedOptionValue(options));
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setState({
        isOpen: true,
        focusedOption: focusNextOption({
          focusedOption: focusedOption,
          optionsLength: options.options.length,
        }),
      });
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setState({
        isOpen: true,
        focusedOption: focusPreviousOption({
          focusedOption: focusedOption,
          optionsLength: options.options.length,
        }),
      });
      return;
    }

    if (event.key.match(regexp.singleCharacter)) {
      const key = event.key;
      event.preventDefault();
      setState(prevState => {
        const softSearchFilter = `${prevState.softSearchFilter}${key.toLowerCase()}`;
        const focusedOption = _.filter(prevState.options.options, (option) => option.type === 'option')
          .find((option) => option.option.label.toLowerCase().replace(regexp.whitespace, '').startsWith(softSearchFilter));
        return {
          softSearchFilter,
          options: {
            focusedOption: (focusedOption && focusedOption.focusIndex) || prevState.options.focusedOption, // TODO: Stay on last focused option if no match
            options: prevState.options.options
          }
        }
      });
      setStateDebounced({ softSearchFilter: '' });
      return
    }
  }
}

function handleOptionSelected({
  currentOption,
  isMultiSelect,
  onChangeFunction,
  setState,
  wrapperElement,
}) {
  return function (option) {
    wrapperElement.focus();
    setState({
      isOpen: !!isMultiSelect,
    });

    if (isMultiSelect) {
      if (!Array.isArray(currentOption)) {
        onChangeFunction([option.value]);
      } else if (currentOption.includes(option.value)) {
        onChangeFunction(_.without(currentOption, option.value));
      } else {
        onChangeFunction([...currentOption, option.value]);
      }
    } else {
      onChangeFunction(option.value);
    }
  };
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
  else if (typeof value === 'symbol') return true;

  return typeof value === 'object' && Object.keys(value).length > 0;
}

function SelectedOption({ selectedOptions, options, error, isDisabled }) {
  return (
    <OptionLabel
      error={error}
      isDisabled={isDisabled}
    >
      {getLabel({ selectedOptions, options })}
    </OptionLabel>
  )
}

function getLabel({ selectedOptions, options }) {
  if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
    return `${selectedOptions.length} Selected`;
  }
  return options.reduce((label, option) => {
    if (selectedOptions === option.value) return option.label;
    return label;
  }, selectedOptions);
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
// TODO: Build this structure from the props
function testOptions() {
  return {
    focusedOption: 0,
    options: [
      { type: 'option', focusIndex: 1, option: {label: 'Promoted Option 1', value: 'p1'} },
      { type: 'option', focusIndex: 2, option: {label: 'Promoted Option 2', value: 'p2'} },
      { type: 'divider' },
      { type: 'option', focusIndex: 3, option: {label: 'Option One', value: '1'} },
      { type: 'option', focusIndex: 4, option: {label: 'Option Two', value: '2'} },
      { type: 'option', focusIndex: 5, option: {label: 'Option Three', value: '3'} },
      { type: 'option', focusIndex: 6, option: {label: 'Option Four', value: '4'} },
    ]
  }
}

function prepareOptions({ promotedOptions, options }) {
  let focusCount = 1;
  const a = promotedOptions.map( option => {
    return {
      type: 'option',
      focusIndex: focusCount++,
      option
    }
  });
  const b = options.map( option => {
    return {
      type: 'option',
      focusIndex: focusCount++,
      option
    }
  });
  const newOptions = [ ...a, ...b ];
  console.log('>>', 'newOptions', newOptions);
  return {
    focusedOption: 0,
    options: newOptions
  }
}

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isOpen: false,
      focusedOption: 0,
      searchFilter: '',
      softSearchFilter: '',
    }
    this.setState = this.setState.bind(this);
    this.setStateDebounced = _.debounce(this.setState, 1000).bind(this);
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

    const preparedOptions = prepareOptions({ promotedOptions, options });

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
          options: preparedOptions,
          setState: this.setState,
          setStateDebounced: this.setStateDebounced,
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
          options={preparedOptions}
          optionsWidth={this.props.optionsWidth}
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
  options: [],
  promotedOptions: [],
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