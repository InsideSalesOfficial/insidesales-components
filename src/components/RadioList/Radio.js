import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const size = 16;

const RadioLabel = styled.label`
  ${typography.bodyCompact};
  background: ${props => props.theme.background};
  color: ${colors.black50};
  display: block;
  padding: ${props => props.theme.padding || '0.75em'};
  margin: ${props => props.theme.margin} 0;
  
  ${props => props.active && css`
    background: ${props => props.theme.backgroundFocused};
    color: ${colors.black80};
  `}
`;

const RadioInput = styled.input`
  display: none;
`;

const RadioCircle = styled.span`
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  display: inline-block;
  border: 2px solid ${props => props.theme.lightRadio ? colors.black40 : colors.black};
  position: relative;
  vertical-align: middle;
  margin-right: 0.5em;
  background: white;
  box-sizing: content-box;

  ${props => props.theme.lightRadio && props.active && `
    border-color: ${colors.green};
  `};

  
  ${props => props.active && css`
    &:before {
      content: '';
      border-radius: 50%;
      width: ${size * 0.625}px;
      height: ${size * 0.625}px;
      background-color: ${colors.green};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `} 
`;

const RadioComponent = ({ id, name, label = "", value, setValue, selectedValue = "" }) => {
  const active = value === selectedValue;

  return (<div>
    <RadioInput
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={active}
      onChange={() => { setValue(value) }}
    />
    <RadioLabel htmlFor={id} active={active}>
      <RadioCircle active={active}></RadioCircle>{label}
    </RadioLabel>
  </div>);
};

RadioComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.any,
  selectedValue: PropTypes.any,
  value: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired
};


export default RadioComponent;