import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, colors, renderThemeKeyOrDefaultValue } from "../styles";
import Option from './Option';

function renderOptions(options) {
  return options.map(({ label, value }) => <Option label={label} value={value} />)
}

class Dropdown extends React.Component {
  render() {
    return (
      <ul>
        {renderOptions(this.props.options)}
      </ul>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired
};

Dropdown.defaultProps = {
  options: []
};

export default Dropdown;