import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {renderThemeKeyOrDefaultValue} from "../styles";

import Checkbox from '../Checkbox';

const ListItem = styled.li`
  display: flex;
  align-items: center;
  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white90', defaultValue: props.theme.white90 })};
  padding: 0 24px;
  line-height: 36px;
  cursor: pointer;
  background: ${props => focusedBackground(props)};


  &:hover {
    background: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white10', defaultValue: props.theme.background })};
  }

  &:focus {
    outline: none;
  }
`;

function focusedBackground(props) {
  console.log('focusedBackground - isFocused', props);
  if(props.isFocused) {
    return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: props.theme.background });
  }
}

class Option extends React.Component {
  render() {
    console.log('isFocused: ', this.props.isFocused)
    if (this.props.isFocused) this.element.scrollIntoViewIfNeeded();
    return (
      <ListItem
        tabIndex={-1}
        onClick={(event) => this.props.onClick(this.props.option)}
        isFocused={this.props.isFocused}
        innerRef={element => this.element = element}
      >
        {this.props.isMultiSelect && <Checkbox
          disabled={false}
          checked={this.props.isSelected}
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
  isMultiSelect: PropTypes.bool
};

export default Option;