
import React from 'react';
import styled from 'styled-components';

import { checkDocumentEvent, openOptionsList, closeOptionsList, toggleOptionsList } from '../SelectInput';
import SelectOptions from '../SelectInput/SelectOptions';
import { colors } from '../styles/colors';
import {typography} from '../styles/typography';
import PropTypes from 'prop-types';

const padding = '16px';

export const Label = styled.div`
  color: ${colors.black40};
  transition: all 200ms;
  transform: translateY(-50%);
  position: absolute;
  left: ${padding};
  top: 50%;

  ${props => props.value && `
    top: 30%;
    ${typography.caption}
  `}
`

const Caret = styled.div`
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
    border-${props => props.open ? 'bottom' : 'top'}: 5px ${props => props.open ? colors.black90 : colors.black40} solid;
  }
`;

export const Value = styled.button`
  border: 0;
  background: transparent;
  display: block;
  width: 100%;
  text-align: left;
  ${typography.subhead1};
  color: ${colors.black90};
  height: 56px;
  padding: 22px ${padding} 0 ${padding};
  background: ${colors.lighterGray};
  box-sizing: border-box;
  border-bottom: 2px solid ${props => props.isDisabled ? 'transparent' : colors.black40};
  cursor: ${props => props.isDisabled ? 'auto' : 'pointer'};
  border-radius: 2px;

  &:focus {
    outline: 0;
    border-color: ${props => props.isDisabled ? 'transparent' : colors.green};
  }
`;



export const Wrapper = styled.div`
  position: relative;
  ${typography.subhead1};

  ${props => props.isDisabled && `
    opacity: 0.6;
  `}
`;

export default class SelectInputLabelBox extends React.Component {

  constructor() {
    super();
    this.state = {
      optionsListVisible: false
    }
  }

  checkDocumentEvent = (e) => { checkDocumentEvent.call(this, e) }

  openOptionsList = () => { openOptionsList.call(this) }

  closeOptionsList = () => { closeOptionsList.call(this) }

  toggleOptionsList = () => { toggleOptionsList.call(this) }

  render() {
    return (
      <Wrapper onClick={this.toggleOptionsList}
        {...this.props}
        ref="clickEventElement">
        <Caret open={this.state.optionsListVisible} />
        <Label value={this.props.value}>{this.props.label}</Label>
        <Value
          open={this.state.optionsListVisible}
          isDisabled={this.props.isDisabled}
          className="select-input-label-box-value"
        >{this.props.value}</Value>
        <SelectOptions
          ref={(options) => { this.clickEventElement = options; }}
          selectedOptions={this.props.value}
          onOptionUpdate={this.props.onChange}
          options={this.props.options}
          visible={this.state.optionsListVisible}
        />
      </Wrapper>
    )
  }
}

SelectInputLabelBox.defaultProps = {
  value: '',
  label: '',
  isDisabled: false
}

SelectInputLabelBox.propTypes = {
  value: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  isDisabled: PropTypes.bool
}