import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

const Wrapper = styled.label`
  transition: all 200ms;
  transform: translateY(-50%);
  position: absolute;
  left: 16px;
  top: ${props => props.isOptionSelected ? '30%' : '50%'};
  ${labelColor}
  ${props => props.isOptionSelected && typography.caption}
`;

function labelColor(props) {
  return props.error
    ? `color: ${renderThemeKeyOrDefaultValue({ props, key: "warning04", defaultValue: colors.red, })};`
    : `color: ${renderThemeKeyOrDefaultValue({ props, key: "white90", defaultValue: colors.white90, })};`;
}

class Label extends React.Component {
  render() {
    return (
      <Wrapper
        error={this.props.error}
        isOptionSelected={this.props.isOptionSelected}
      >
        {this.props.label}
      </Wrapper>
    );
  }
}

Label.propTypes = {
  error: PropTypes.bool,
  isOptionSelected: PropTypes.bool.isRequired,
  label: PropTypes.any,
};

export default Label;