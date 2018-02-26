import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as _ from 'lodash';

import Loader from '../Loader';
import { colors, typography } from '../styles';

export const buttonAnimationTimeSeconds = 2;

const fade = keyframes`
  0%   {
    background: ${colors.green};
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
  }
  100% {
    opacity: 0;
    box-shadow: none;
  }
`;

const ButtonBase = styled.button`
  animation: ${(props) => {
    if (props.fade) {
      return fade;
    }

    return 'none';
  }} ${buttonAnimationTimeSeconds}s;

  --background: ${(props) => {
    if (props.flat) {
      return 'none';
    }

    if (props.danger) {
      return colors.red;
    }

    if (props.disabled || props.fade) {
      return colors.green50;
    }

    if (props.neuralytics) {
      return colors.neuralBlue;
    }

    return colors.green;
  }};
  background: var(--background);

  transition: filter .25s ease-in-out, box-shadow .25s ease-in-out;
  &:hover {
    background: ${(props) => {
      if (props.flat) {
        return 'rgba(58,182,118,0.12)';
      }

      return 'var(--background)';
    }};

    filter: ${(props) => {
      if (props.loading || props.fade || props.disabled) {
        return 'none';
      }
      return 'brightness(0.9)';
    }};

    box-shadow: ${(props) => {
      if (props.loading || props.fade || props.disabled || props.flat) {
        return 0;
      }

      return '0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)';
    }};
  }

  &:active {
    background: ${(props) => {
      if (props.flat) {
        return 'rgba(58,182,118,0.24)';
      }

      return 'var(--background)';
    }};

    box-shadow: ${(props) => {
      if (props.loading || props.fade || props.disabled || props.flat) {
        return 0;
      }

      return '0 0 8px 0 rgba(0,0,0,0.12), 0 8px 8px 0 rgba(0,0,0,0.24)';
    }};
  }

  cursor: ${(props) => {
    if (props.disabled || props.fade || props.loading) {
      return 'default';
    }
    return 'pointer';
  }};

  border: ${(props) => {
    if (props.outline) {
      if (props.disabled) {
        return `1px solid ${colors.green30}`;
      }
      return `1px solid ${colors.green}`;
    }
    return 'none';
  }};

  border-radius: 2px;
  color: ${colors.white90};

  height: 36px;
  line-height: 24px;
  outline: 0;

  width: auto;
  min-width: 88px;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenteredSpan = styled.span`
  width: 100%;
  height: 100%;

  display: flex;
  flex: 0 0 auto;
  flex-shrink: none;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;

  font-family: 'isdc-roboto', 'Roboto', sans-serif;
  ${typography.body2}

  filter: none;

  padding: 0;
  margin: 0;
`;

export const Button = ({ className, label, loading, onClick, ...props }) => {
  const debouncedOnClick = _.debounce(onClick, 175);

  return <ButtonBase
    className={className}
    onClick={() => { if (!loading && !props.fade && onClick) { debouncedOnClick(); } }}
    loading={loading}
    {...props}
  >
    <span>
      {loading ? (
        <Loader white small />
      ) : (
        <CenteredSpan>
          {label}
        </CenteredSpan>
      )}
    </span>
  </ButtonBase>;
};

Button.defaultProps = {
  onClick: _.identity
};

export default Button;