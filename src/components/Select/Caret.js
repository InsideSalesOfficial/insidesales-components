import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontWeights, typography, colors, renderThemeKeyOrDefaultValue } from "../styles";

const caretStyles = `
position: absolute;
right: 24px;
top: 50%;
transform: translateY(-50%);
cursor: pointer;

&::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  margin: auto;
  border-left: 5px transparent solid;
  border-right: 5px transparent solid;
}
`;

const CaretUp = styled.div`
${caretStyles}
&::after {
  border-top:
    5px
    ${props => renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: props.theme.borderColor })}
    solid;
}
`;

const CaretDown = styled.div`
${caretStyles}
&::after {
  border-bottom:
    5px
    ${props => renderThemeKeyOrDefaultValue({ props, key: 'white60', defaultValue: props.theme.borderColor })}
    solid;
}
`;

class Caret extends React.Component {
  render() {
    return (
      this.props.open ? <CaretDown /> : <CaretUp />
    );
  }
}

Caret.propTypes = {
  open: PropTypes.bool.isRequired
};

export default Caret;