import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {fontWeights, colors, renderThemeKeyOrDefaultValue} from "../styles";

const ListItem = styled.li`
  display: flex;
  align-items: center;
  color: ${listItemColor};
  padding: 0 24px;
  line-height: 36px;
  cursor: pointer;

  &:hover {
    background: ${hoverBackgroundColor};
  }
`;

function listItemColor(props) {
  return renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: props.theme.white90 });
}

function hoverBackgroundColor(props) {
  return renderThemeKeyOrDefaultValue({ props, key: 'white10', defaultValue: props.theme.background });
}

class Option extends React.Component {
  render() {
    return (
      <ListItem
        onClick={() => this.props.onClick(this.props.option)}
      >
        {this.props.option.label}
      </ListItem>);
  }
}

Option.propTypes = {
  onClick: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired
};

export default Option;