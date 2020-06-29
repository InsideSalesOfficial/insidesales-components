import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, colors, renderThemeKeyOrDefaultValue } from "../styles";
import Option from './Option';

const Options = styled.ul`
  background: ${optionsBackground}
  display: ${props => props.isOpen ? 'block' : 'none'}
  width: 100%;
  max-height: 240px;
  margin: 0;
  padding: 0;
  transform: translateZ(0);
  overflow-y: auto;
`;

function optionsBackground(props) {
  return renderThemeKeyOrDefaultValue({ props, key: 'primary05', defaultValue: props.theme.background });
}

class Dropdown extends React.Component {
  renderOptions = () => {
    return (this.props.options.map((option) => {
      return (
        <Option
          onClick={this.props.onSelect}
          option={option}
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
  options: PropTypes.array.isRequired
};

export default Dropdown;