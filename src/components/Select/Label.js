import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

const Label1 = styled.label`
  transition: all 200ms;
  transform: translateY(-50%);
  position: absolute;
  left: 16px;
  top: ${props => props.isOptionSelected ? '30%' : '50%'};
  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: colors.white90 })};
  ${props => props.isOptionSelected && typography.caption}
`;

class Label extends React.Component {
  render() {
    return (
      <Label1
        isOptionSelected={this.props.isOptionSelected}
      >
        {this.props.label}
      </Label1>
    );
  }
}

Label.propTypes = {
  isOptionSelected: PropTypes.bool.isRequired,
  label: PropTypes.any
};

export default Label;