import React from 'react';
import styled from 'styled-components';

import { typography, colors } from '../styles';

import { GREEN_CHECKBOX, GRAY_CHECKBOX } from './CheckboxIcons';

const CheckboxEl = styled.input`
  position: relative;
  height: 18px;
  width: 18px;
  appearance: none;
  border: 2px solid ${colors.aluminum};
  border-radius: 2px;
  cursor: pointer;
  margin: 0;
  margin-right: 16px;
  vertical-align: middle;
  background-repeat: no-repeat;
  &:checked {
    width: 19px;
    margin-right: 15px;
    border: none;
    background-image: url(${GREEN_CHECKBOX});
    &:disabled {
      background-image: url(${GRAY_CHECKBOX});
      background-color: transparent;
    }
  }
  &:disabled {
    background-color: ${colors.aluminum};
    opacity: 0.5;
  }
  &:hover, &:focus {
    border-color: ${colors.green};
  }
  &:focus {
    outline: none;
  }
`;

const Text = styled.label`
  color: ${(props) => {
    if (props.onWhite) {
      return colors.black90;
    }
    return colors.lightGray;
  }};
  vertical-align: middle;
  ${typography.subhead1}
`;

export const Checkbox = ({ label, defaultChecked, checked, disabled, name, onChange, className, onWhiteBg }) => (
    <div className={className}>
      <CheckboxEl onChange={e => e.stopPropagation()} id={name} name={name} type="checkbox" defaultChecked={defaultChecked} checked={checked} disabled={disabled} onClick={ onChange } />
      {label && (
        <Text htmlFor={name} onWhite={onWhiteBg}>{label}</Text>
      )}
    </div>
  );

export default Checkbox;
