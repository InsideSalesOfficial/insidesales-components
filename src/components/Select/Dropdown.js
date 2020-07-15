import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, colors, renderThemeKeyOrDefaultValue } from "../styles";
import Option from './Option';
import _ from 'lodash';

const Options = styled.ul`
  background: ${props => renderThemeKeyOrDefaultValue({ props, key: 'primary05', defaultValue: props.theme.background })}
  display: ${props => props.isOpen ? 'block' : 'none'}
  width: 100%;
  max-height: 240px;
  margin: 0;
  padding: 0;
  transform: translateZ(0);
  overflow-y: auto;
`;

function renderOptions({
  options,
  onSelect,
  focusedOption,
  selectedOptions,
  isMultiSelect
}) {
  return (options.map((option, index) => {
    return (
      <Option
        key={index}
        onClick={onSelect}
        option={option}
        isFocused={focusedOption === index}
        isMultiSelect={isMultiSelect}
        isSelected={isMultiSelect && _.includes(selectedOptions, option.value)}
      />
    );
  }));
}
class Dropdown extends React.Component {
  render() {
    return (
      <Options isOpen={this.props.isOpen} >
        {renderOptions({
          options: [...this.props.promotedOptions, ...this.props.options],
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
  isOpen: false,
  options: [],
  promotedOptions: [],
  isMultiSelect: false
}

Dropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.any,
  })).isRequired,
  promotedOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.any,
  })),
  focusedOption: PropTypes.number,
  selectedOptions: PropTypes.any,
  isMultiSelect: PropTypes.bool
};

export default Dropdown;