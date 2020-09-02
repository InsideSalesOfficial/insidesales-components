import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import _ from 'lodash';
import { RequiredText } from '../RequiredText/RequiredText';
import { typography, colors, renderThemeKeyOrDefaultValue } from '../styles';

import Dropdown from './Dropdown';
import Label from './Label';
import Caret from './Caret';

const regexp = {
  singleCharacter: /^([^\x00-\x7F]|[^\u0000-\u007F]|[\w-_]){1}$/,
  whitespace: /\s/g,
};

const Wrapper = styled.div`
  position: relative;
  outline: none;
  user-select: none;
`;

const SelectedLabel = styled.span`
  padding: 22px 26px 0 16px;
  color: ${(props) => {
    if (props.isDisabled) return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: colors.white40 });
    if (props.error) return renderThemeKeyOrDefaultValue({ props, key: 'warning04', defaultValue: colors.red });
    return renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: colors.white90 });
  }};
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
  border-bottom-color: ${(props) => {
    if (props.isDisabled) {
      return 'transparent';
    }
    if (props.error && props.isFocused) {
      return renderThemeKeyOrDefaultValue({ props, key: 'warning01', defaultValue: colors.black40 });
    }
    if (props.error) {
      return renderThemeKeyOrDefaultValue({ props, key: 'warning04', defaultValue: colors.red });
    }
    if (props.isFocused) {
      return renderThemeKeyOrDefaultValue({ props, key: 'brand01', defaultValue: colors.black40 });
    }
    if (props.theme.borderColor) {
      return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: props.theme.borderColor });
    }
    return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: colors.black40 });
  }};

  cursor: ${(props) => (props.isDisabled ? 'auto' : 'pointer')};

  color: ${(props) => renderThemeKeyOrDefaultValue({ props, key: 'white60', defaultValue: colors.black60 })};
  background: ${(props) =>
    renderThemeKeyOrDefaultValue({ props, key: 'primary05', defaultValue: props.theme.background })};

  ${typography.subhead1};
`;

function focusNextOption({ focusedOption, optionsLength }) {
  if (typeof focusedOption !== 'number') return 0;
  return focusedOption >= optionsLength - 1 ? 0 : focusedOption + 1;
}

function focusPreviousOption({ focusedOption, optionsLength }) {
  if (typeof focusedOption !== 'number') return optionsLength - 1;
  return focusedOption <= 0 ? optionsLength - 1 : focusedOption - 1;
}

function handleButtonClick(setState) {
  return function () {
    setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };
}

function handleBlur(event) {
  this.timeoutID = setTimeout(() => {
    if (this.state.isFocused) {
      this.setState({
        isFocused: false,
        isOpen: false,
      });
    }
  }, 0);
}

function handleFocus(event) {
  clearTimeout(this.timeoutID);
  if (!this.state.isFocused) {
    this.setState({
      isFocused: true,
    });
  }
}

function getFocusedOptionValue({ options, focusedOption }) {
  const option = _.find(options.options, { focusIndex: focusedOption });
  if (!option || !option.option) return null;
  return option.option;
}

const validOpeningKeys = ['Enter', ' ', 'ArrowDown', 'ArrowUp'];

function focusableOptions({ options }) {
  return options.filter(option => {
    return _.isNumber(option.focusIndex);
  });
}

function handleKeyDown({
  currentOption,
  focusedOption,
  isMultiSelect,
  isOpen,
  onChange,
  options,
  searchable,
  setState,
  setStateDebounced,
  wrapperElement,
}) {
  return function (event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      wrapperElement.focus();
      setState({
        isOpen: false,
      });
      return;
    }

    if (!isOpen && _.some(validOpeningKeys, (key) => key === event.key)) {
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
      })(getFocusedOptionValue({ options, focusedOption }), focusedOption);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setState({
        isOpen: true,
        focusedOption: focusNextOption({
          focusedOption: focusedOption,
          optionsLength: focusableOptions({options: options.options}).length,
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
          optionsLength: focusableOptions({options: options.options}).length,
        }),
      });
      return;
    }

    const isKeyModifierActive = event.altKey || event.ctrlKey || event.metaKey;
    if (
      !isKeyModifierActive &&
      isOpen &&
      !(searchable && focusedOption === 0) &&
      event.key.match(regexp.singleCharacter)
    ) {
      const key = event.key;
      event.preventDefault();
      setState((prevState) => {
        const softSearchFilter = `${prevState.softSearchFilter}${key.toLowerCase()}`;
        const beginsWithSoftSearch = new RegExp('^' + softSearchFilter);
        const newFocusedOption = _.find(options.options, (option) => {
          if (!option.option) return false;
          if (!_.isString(option.option.label)) return false;
          if (beginsWithSoftSearch.test(option.option.label.toLowerCase().replace(regexp.whitespace, ''))) return true;
          return false;
        });
        return {
          softSearchFilter,
          focusedOption:
            newFocusedOption && _.isNumber(newFocusedOption.focusIndex)
              ? newFocusedOption.focusIndex
              : prevState.focusedOption,
        };
      });
      setStateDebounced({ softSearchFilter: '' });
      return;
    }
  };
}

function handleOptionSelected({ currentOption, isMultiSelect, onChangeFunction, setState, wrapperElement }) {
  return function (option, focusIndex) {
    if (!_.isObject(option)) return;
    wrapperElement.focus();
    setState({
      isOpen: !!isMultiSelect,
      focusedOption: focusIndex,
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
    setState({ searchFilter });
  };
}

function handleSearchClick({ setState }) {
  return function (_event) {
    setState({ focusedOption: 0 });
  };
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
    <SelectedLabel error={error} isDisabled={isDisabled}>
      {getLabel({ selectedOptions, options })}
    </SelectedLabel>
  );
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
  return options.filter((option) => {
    if (!_.isObject(option)) return true;
    if (!(_.isString(option.label) || _.isObject(option.label))) return true;
    if (_.isObject(option.label) && !_.isString(option.optionValue)) return true;

    const labelString = _.isString(option.label) ? option.label : option.optionValue;
    return _.includes(labelString.toLowerCase(), searchFilter.toLowerCase());
  });
}

function prepareOptions({ promotedOptions, options, searchable }) {
  let focusCount = 0;

  const searchInput = searchable
    ? [
        {
          type: 'search',
          focusIndex: focusCount++,
        },
      ]
    : [];

  const divider = { type: 'divider' };
  const preparedPromotedOptions = _.isEmpty(promotedOptions)
    ? []
    : [
        ...promotedOptions.map((option) => {
          return {
            type: 'option',
            focusIndex: focusCount++,
            option,
          };
        }),
        divider,
      ];

  const preparedOptions = options.map((option) => {
    return {
      type: 'option',
      focusIndex: focusCount++,
      option,
    };
  });

  const newOptions = [...searchInput, ...preparedPromotedOptions, ...preparedOptions];
  return {
    options: newOptions,
  };
}

export default class SelectInputKeyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isOpen: false,
      focusedOption: 0,
      searchFilter: '',
      softSearchFilter: '',
    };
    this.setState = this.setState.bind(this);
    this.setStateDebounced = _.debounce(this.setState, 1000).bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // If options props are updated, reset focused state
    if (nextProps.options !== this.props.options || nextProps.promotedOptions !== this.props.promotedOptions) {
      this.setState({
        isOpen: false,
        focusedOption: 0,
      });
    }
    // If search prop is updated, reset search filter
    if (nextProps.searchable !== this.props.searchable) {
      this.setState({
        searchFilter: '',
      });
    }
  }

  render() {
    const options = filterOptionsWithSearch({
      options: this.props.options,
      searchFilter: this.state.searchFilter,
    });
    const promotedOptions = filterOptionsWithSearch({
      options: this.props.promotedOptions,
      searchFilter: this.state.searchFilter,
    });

    const preparedOptions = prepareOptions({ promotedOptions, options, searchable: this.props.searchable });

    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper
          className={this.props.className}
          innerRef={(wrapperElement) => (this.wrapperElement = wrapperElement)}
          onBlur={handleBlur.bind(this)}
          onFocus={handleFocus.bind(this)}
          onKeyDown={
            !this.props.isDisabled &&
            handleKeyDown({
              currentOption: this.props.value,
              focusedOption: this.state.focusedOption,
              isMultiSelect: this.props.multiSelect,
              isOpen: this.state.isOpen,
              onChange: this.props.onChange,
              options: preparedOptions,
              searchable: this.props.searchable,
              setState: this.setState,
              setStateDebounced: this.setStateDebounced,
              wrapperElement: this.wrapperElement,
            })
          }
          tabIndex={this.props.isDisabled ? -1 : 0}
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
            <Caret error={this.props.error} isDisabled={this.props.isDisabled} isOpen={this.state.isOpen} />
            {!this.props.value && !this.state.isOpen && this.props.required && (
              <RequiredText error={this.props.error}>Required</RequiredText>
            )}
            <SelectedOption
              error={this.props.error}
              isDisabled={this.props.isDisabled}
              isMultiSelect={this.props.multiSelect}
              options={[...(this.props.promotedOptions || []), ...this.props.options]}
              selectedOptions={this.props.value}
            />
          </SelectToggle>
          <Dropdown
            focusedOption={this.state.focusedOption}
            selectLabel={this.props.label}
            isMultiSelect={this.props.multiSelect}
            isOpen={this.state.isOpen}
            onSearch={handleSearch({ setState: this.setState })}
            onSearchClick={handleSearchClick({ setState: this.setState })}
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
      </ThemeProvider>
    );
  }
}

SelectInputKeyboard.defaultProps = {
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
};

SelectInputKeyboard.propTypes = {
  error: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isPlaceHolder: PropTypes.bool,
  label: PropTypes.string,
  multiSelect: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.any })).isRequired,
  optionsWidth: PropTypes.number,
  promotedOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.any })),
  required: PropTypes.bool,
  searchable: PropTypes.bool,
  value: PropTypes.any,
};
