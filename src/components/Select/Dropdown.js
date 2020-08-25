import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import TextInput, { TextBox } from '../TextInput';
import { renderThemeKeyOrDefaultValue, renderThemeIfPresentOrDefault, colors, typography, boxShadows } from "../styles";
import Option from './Option';
import _ from 'lodash';

const rotate = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;


const Options = styled.ul`
  max-width: ${props => props.optionsWidth ? `${props.optionsWidth}px` : '100%'};
  background: ${props => renderThemeKeyOrDefaultValue({ props, key: 'primary05', defaultValue: props.theme.background })};
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  z-index: 1;
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

  box-shadow: ${(props) => {
    if (props.theme.optionsListShadow) return props.theme.optionsListShadow;
    return boxShadows.lvl8;
  }};

  animation: ${rotate} 0.1s ease-out 1;
  transform-origin: top left;
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
  padding: 0 24px 12px 24px;
`;

const SearchEmptyText = styled.div`
  padding-top: 12px;
  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white60', defaultValue: colors.white60 })};
  ${typography.subhead1}
`;

function renderOptions({
  focusedOption,
  isMultiSelect,
  onSearch,
  onSelect,
  options,
  selectedOptions,
}) {
  console.log('>>', 'options.options', options.options);
  const combinedOptions = options.options.map((option, index) => {
    if (option.type === 'search') {
      return (
        <SearchWrapper
          tabIndex={-1}
          key={`select-search-${index}`}
          isFocused={option.focusIndex === focusedOption}
        >
          <StyledSearchInput
            tabIndex={-1}
            label="Search"
            name="selectSearch"
            onChange={onSearch}
            search
          />
          {options.options.length === 1 && (
            <SearchEmptyText>
              No options match that search criteria
            </SearchEmptyText>
          )}
        </SearchWrapper>
      );
    }
    if (option.type === 'option') {
      if (!option || !option.option) return null;
      const isSelected = _.some(selectedOptions, (selectedOption) => selectedOption === option.option.value);
      return (
        <Option
          key={`select-${option.option.value}-index`}
          onClick={onSelect}
          option={option.option}
          isFocused={option.focusIndex === focusedOption}
          isMultiSelect={isMultiSelect}
          isSelected={isMultiSelect && isSelected}
        />
      );
    }
    if (option.type === 'divider') return <Spacer />;
    return null;
  });
  return combinedOptions;
}
class Dropdown extends React.Component {
  render() {
    return (
      <Options
        optionsWidth={this.props.optionsWidth}
        isOpen={this.props.isOpen}
      >
        {renderOptions({
          focusedOption: this.props.focusedOption,
          isMultiSelect: this.props.isMultiSelect,
          onSearch: this.props.onSearch,
          onSelect: this.props.onSelect,
          options: this.props.options,
          selectedOptions: this.props.selectedOptions,
        })}
      </Options>
    );
  }
}

Dropdown.defaultProps = {
  focusedOption: 0,
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
  options: PropTypes.any.isRequired,
  optionsWidth: PropTypes.string,
  selectedOptions: PropTypes.any,
};

export default Dropdown;