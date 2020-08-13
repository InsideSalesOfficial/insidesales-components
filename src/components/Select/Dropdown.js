import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput, { TextBox } from '../TextInput';
import { renderThemeKeyOrDefaultValue, renderThemeIfPresentOrDefault, colors } from "../styles";
import Option from './Option';
import _ from 'lodash';

const Options = styled.ul`
  max-width: ${props => props.optionsWidth}px
  background: ${props => renderThemeKeyOrDefaultValue({ props, key: 'primary05', defaultValue: props.theme.background })}
  display: ${props => props.isOpen ? 'block' : 'none'}
  width: 100%;
  max-height: 240px;
  margin: 0;
  padding: 0;
  transform: translateZ(0);
  overflow-y: auto;
  li:first-child {
    margin-top: 8px;
  }
  li:last-child {
    margin-bottom: 8px;
  }

  &::-webkit-scrollbar {
    background-color: ${renderThemeIfPresentOrDefault({ key: 'primary05', defaultValue: colors.white })};
    border-left: none;
    margin-right: 10px;
    width: 10px;
    height: 10px
  }
  &::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: content-box;
    background-color: ${renderThemeIfPresentOrDefault({ key: 'white40', defaultValue: colors.black40 })};
    border: 1px solid transparent;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

const Spacer = styled.div`
  height: 0;
  width: 100%;
  border-bottom: 1px solid ${props => renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: colors.white40 })};
  margin: 8px 0 8px 0;
`;

const StyledSearchInput = styled(TextInput)`
  ${TextBox} {
    'background-color: transparent;'
  }
`;

const SearchWrapper = styled.div`
  padding: 0 24px;
`;

function renderSearch({onSearch}) {
  return (
    <SearchWrapper tabIndex={-1}>
      <StyledSearchInput
        tabIndex={-1}
        label='Search'
        name='selectSearch'
        onChange={(searchText) => onSearch(searchText)}
        search
      />
    </SearchWrapper>
  );
}

function renderOptions({
  options,
  promotedOptions,
  onSelect,
  focusedOption,
  selectedOptions,
  isMultiSelect,
}) {
  const combinedOptions = [...promotedOptions, ...options].map((option, index) => {
    return (
      <Option
        key={`select-${option.value}`}
        onClick={onSelect}
        option={option}
        isFocused={focusedOption === index}
        isMultiSelect={isMultiSelect}
        isSelected={isMultiSelect && _.includes(selectedOptions, option.value)}
      />
    )
  });
  if (promotedOptions.length > 0){
    combinedOptions.splice(promotedOptions.length, 0, <Spacer/>)
  }
  return combinedOptions;
}
class Dropdown extends React.Component {
  render() {
    return (
      <Options
        optionsWidth={this.props.optionsWidth}
        isOpen={this.props.isOpen}
      >
        {this.props.searchable && renderSearch({
          onSearch: this.props.onSearch
        })}
        {renderOptions({
          options: this.props.options,
          promotedOptions: this.props.promotedOptions,
          onSelect: this.props.onSelect,
          focusedOption: this.props.focusedOption,
          selectedOptions: this.props.selectedOptions,
          isMultiSelect: this.props.isMultiSelect
        })}
      </Options>
    );
  }
}

Dropdown.defaultProps = {
  onSelect: _.noop,
  onSearch: _.noop,
  isOpen: false,
  isMultiSelect: false
}

Dropdown.propTypes = {
  focusedOption: PropTypes.number,
  isMultiSelect: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.any, })).isRequired,
  optionsWidth: PropTypes.number,
  promotedOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.any, })).isRequired,
  searchable: PropTypes.bool,
  selectedOptions: PropTypes.any,
};

export default Dropdown;