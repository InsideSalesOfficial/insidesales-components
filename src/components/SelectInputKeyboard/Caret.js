import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { renderThemeKeyOrDefaultValue, colors } from '../styles';

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

const CaretDown = styled.div`
  ${caretStyles}
  &::after {
    border-top: 5px
      ${(props) => {
        if (props.isDisabled)
          return renderThemeKeyOrDefaultValue({ props, key: 'white10', defaultValue: colors.white10 });
        if (props.error) return renderThemeKeyOrDefaultValue({ props, key: 'warning', defaultValue: colors.red });
        return renderThemeKeyOrDefaultValue({ props, key: 'white40', defaultValue: props.theme.borderColor });
      }}
      solid;
  }
`;

const CaretUp = styled.div`
  ${caretStyles}
  &::after {
    border-bottom: 5px
      ${(props) => {
        if (props.error) return renderThemeKeyOrDefaultValue({ props, key: 'warning', defaultValue: colors.red });
        return renderThemeKeyOrDefaultValue({ props, key: 'white60', defaultValue: props.theme.borderColor });
      }}
      solid;
  }
`;

function Caret({ error, isDisabled, isOpen }) {
  return isOpen ? <CaretUp error={error} /> : <CaretDown error={error} isDisabled={isDisabled} />;
}

Caret.propTypes = {
  error: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
};

export default Caret;
