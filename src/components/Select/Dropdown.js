import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, colors, renderThemeKeyOrDefaultValue } from "../styles";
import Option from './Option';

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

class Dropdown extends React.Component {
  renderOptions = () => {
    return (this.props.options.map((option, index) => {
      console.log('this.props.focusedOption', this.props.focusedOption);
      return (
        <Option
          key={index}
          onClick={this.props.onSelect}
          option={option}
          isFocused={this.props.focusedOption === index}
        />
      );
    }));
  }

  render() {
    return (
      <Options isOpen={this.props.isOpen} >
        {this.renderOptions()}
      </Options>
    );
  }
}

Dropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  focusedOption: PropTypes.number
};

export default Dropdown;