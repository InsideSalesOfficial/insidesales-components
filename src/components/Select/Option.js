import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import {renderThemeKeyOrDefaultValue} from "../styles";

import Checkbox from '../Checkbox';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  10% { opacity: 0; }
  60% { opacity: 1; }
`;


const ListItem = styled.li`
  display: flex;
  align-items: center;
  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: props.theme.white90 })};
  padding: 0 24px;
  line-height: 36px;
  cursor: pointer;
  background: ${optionBackground};
  ${props => props.bottomBorder ? 'border-bottom: 1px solid white' : ''}

  &:hover {
    background: ${optionHoverBackground};
  }

  &:focus {
    outline: none;
  }

  animation: ${fadeIn} 0.5s ease-out 1;
  transform-origin: top left;
`;

function optionBackground(props) {
  if(props.isFocused) {
    return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: props.theme.background });
  }
}

function optionHoverBackground(props) {
  if(props.isFocused) {
    return renderThemeKeyOrDefaultValue({ props, key: 'white60', defaultValue: props.theme.background });
  }
  return renderThemeKeyOrDefaultValue({ props, key: 'white10', defaultValue: props.theme.background });
}

class Option extends React.Component {
  componentDidUpdate() {
    if (this.props.isFocused) this.element.scrollIntoViewIfNeeded();
  }

  render() {
    return (
      <ListItem
        tabIndex={-1}
        onClick={(event) => this.props.onClick(this.props.option)}
        isFocused={this.props.isFocused}
        innerRef={element => this.element = element}
        bottomBorder={this.props.isPromoted}
      >
        {this.props.isMultiSelect && <Checkbox
          tabIndex={-1}
          disabled={false}
          checked={this.props.isSelected}
          name={this.props.option.label}
        />}
        {this.props.option.label}
      </ListItem>);
  }
}

Option.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  isPromoted: PropTypes.bool,
};

export default Option;