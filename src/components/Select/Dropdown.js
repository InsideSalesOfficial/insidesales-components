import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, colors, renderThemeKeyOrDefaultValue } from "../styles";
import Option from './Option';

const Options = styled.ul`
  background: ${optionsBackground}
  display: ${props => props.open ? 'block' : 'none'}
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

function renderOptions(options) {
  return options.map(({ label, value }) => <Option label={label} value={value} />)
}

class Dropdown extends React.Component {
  render() {
    return (
      <Options open={this.props.open} >
        {renderOptions(this.props.options)}
      </Options>
    );
  }
}

Dropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired
};

export default Dropdown;