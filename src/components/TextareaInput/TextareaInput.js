import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { colors, typography } from '../styles';

const TextareaInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Textarea = styled.textarea`
  background-color: ${colors.white};
  border: ${(props) => {
    if (props.error) {
      return `2px solid ${colors.red}`;
    } else {
      return `thin solid ${colors.black40}`;
    }
  }};
  border-radius: 4px;
  box-sizing: border-box;
  padding: ${(props) => {
    if (props.error) {
      return '27px 15px 15px';
    } else {
      return '28px 16px 16px';
    }
  }};
  height: 100px;
  min-height: 100px;
  min-width: 100%;
  resize: none;
  text-align: left;
  transition: border-color 0.14s ease-in-out;
  &:hover {
    border-width: ${(props) => {
      if (props.disabled) {
        return '1px';
      }
      return '2px';
    }};
    padding: ${(props) => {
      if (props.disabled) {
        return '28px 16px 16px';
      }
      return '27px 15px 15px';
    }};
  }
  &:focus {
    border: ${(props) => {
      if (props.error) {
        return `2px solid ${colors.red}`;
      } else {
        return `2px solid ${colors.green}`;
      }
    }};
    outline: 0;
    padding: 27px 15px 15px;
    + label {
      color: ${(props) => {
        if (props.error) {
          return colors.red;
        } else {
          return colors.green;
        }
      }};
    }
  }
  &:disabled {
    background-color: ${colors.black05};
    border-color: ${colors.black40};
    + label {
      color: ${colors.black40};
    }
  }
  ${typography.subhead1}
`;

const TextLabel = styled.label`
  color: ${(props) => {
      if (props.error) {
        return colors.red;
      } else {
        return colors.black60;
      }
    }};
  left: 16px;
  position: absolute;
  transform: ${(props) => {
    if (props.open) {
      return 'translateY(10px)';
    } else {
      return 'translateY(19px)';
    }
  }};
  transition: font-size 0.14s ease-in-out, transform 0.14s ease-in-out, color 0.14s ease-in-out;
  ${(props) => {
    if (props.open) {
      return typography.caption
    } else {
      return typography.subhead1
    }
  }}
  line-height: 16px;
`;

const TextareaHelper = styled.div`
  color: ${colors.black40};
  ${typography.caption}
`;

const TextareaError = styled(TextareaHelper)`
  color: ${colors.red};
`;

class TextareaInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedOrHasValue: false
    };
  }

  componentDidMount() {
    if (this.props.children) {
      this.setState({
        focusedOrHasValue: true
      });
    }
  }

  focused = () => {
    this.setState({
      focusedOrHasValue: true
    })
  }

  blurred = (e) => {
    if (_.get(e, 'target.value', false)) {
      this.setState({
        focusedOrHasValue: true
      })
    }
    else {
      this.setState({
        focusedOrHasValue: false
      })
    }
  }

  renderHelperText() {
    const { error, helper } = this.props;
    if (error) {
      return (<TextareaError>{error}</TextareaError>);
    }
    return (<TextareaHelper>{helper}</TextareaHelper>);
  }

  render() {
    const { label, name, error, disabled, children } = this.props;
    return (
      <TextareaInputWrapper>
        <Textarea onFocus={this.focused} onBlur={this.blurred} id={name} name={name} error={error} disabled={disabled}>
          {children}
        </Textarea>
        <TextLabel open={this.state.focusedOrHasValue} htmlFor={name} error={error}>{label}</TextLabel>
        {this.renderHelperText()}
      </TextareaInputWrapper>
    );
  }
}

TextareaInput.defaultProps = {
  name: 'Name',
  label: 'Label'
};

TextareaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helper: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.string
};

export default TextareaInput;
