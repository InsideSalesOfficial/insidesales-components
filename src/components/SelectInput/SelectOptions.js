import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import { colors, typography, boxShadows } from '../styles';

import { OverflowWrapper } from './SelectInputThemes';

import TextInput from '../TextInput';

export const SelectOptionHeight = 36;

const SelectOptionsContainer = styled.div`
  visibility: hidden;
  background: ${colors.white};
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: ${(props) => {
    if (props.theme.optionListPosition) return props.theme.optionListPosition;
    return 'calc(100%)';
  }};
  width: 100%;
  z-index: 2;
  box-shadow: ${(props) => {
    if (props.theme.optionsListShadow && props.visible) return props.theme.optionsListShadow;
    else if (props.visible) return boxShadows.lvl8;
    return 'none';
  }};
  border-radius: 2px;
  transform-origin: center 8px 0px;
  will-change: transform, opacity, visibility;
  ${(props) => {
    if (props.visible) {
      return `
        animation-name: open;
        animation-duration: 0.16s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      `;
    }
    if (!props.visible && props.dirty) {
      return `
        animation-name: close;
        animation-duration: 0.1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      `;
    }
  }}

  @keyframes open {
    0% { transform: translateY(-24px) scaleY(0.4); opacity: 0; visibility: hidden; }
    40% { opacity: 1; }
    100% { transform: translateY(0) scaleY(1); opacity: 1; visibility: visible; }
  }

  @keyframes close {
    0% { transform: translateY(0); opacity: 1; visibility: visible; }
    100% { transform: translateY(-4px); opacity: 0; visibility: hidden; }
  }

  &::-webkit-scrollbar {
    background-color: ${colors.white};
    border-left: none;
    margin-right: 10px;
    width: 10px;
    height: 10px
  }
  &::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: content-box;
    background-color: ${colors.black40};
    border: 1px solid transparent;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

const SelectOptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex-basis: auto;
  justify-content: flex-start;
  align-content: center;

  transform: translateZ(0);
`;

const SelectOption = styled.div`
  ${typography.subhead1}
  width: 100%;
  line-height: ${(props) => {
    if (props.theme.optionHeight) return `${props.theme.optionHeight}px`;
    return `${SelectOptionHeight}px`;
  }};
  box-sizing: border-box;
  border-bottom: ${(props) => {
    if (props.theme.optionBorderSeparator) return props.theme.optionBorderSeparator;
    return 'none';
  }};
  opacity: ${(props) => {
    if (props.visible) return 1;
    return 0;
  }};
  padding: 0 24px;

  color: 
  ${(props) => {
    if (props.disabled) return colors.middleGray;
    else if (props.theme.optionTextColor) return props.theme.optionTextColor;
    else if (props.theme.textColor) return props.theme.textColor;
    return colors.selectItemColor;
  }};

  cursor: ${(props) => {
    if (props.disabled) return 'default';
    return 'pointer';
  }};

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
    /* accounts for when a border bottom is applied on the theme */
    border-bottom: none;
  }

  ${(props) => {
    if (!props.disabled) {
      return `&:hover {
        background: ${colors.gray90};
        color: ${colors.selectItemColor};
      };`;
    }
  }}
`;

const PromotedOptions = styled.div`
  border-bottom: ${props => props.listLength === 0 ? '0' : `1px solid ${colors.barLightGray}`};
  margin-bottom: 8px;
  width: 100%;
`;

const SearchInput = styled(TextInput)`
  padding: 0 24px;
`;

class SelectOptions extends React.Component {

  constructor() {
    super();
    this.state = {
      inputUsed: false
    };
  }

  optionElement = (keyID, value, optionDisplayItem, disabled) => {
    const { onOptionUpdate, options, promotedOptions } = this.props;
    const clonedOptionItem = typeof (optionDisplayItem) === 'string' ? <OverflowWrapper>{optionDisplayItem}</OverflowWrapper> : optionDisplayItem;
    const optionsLength = _.get(options, 'length', 0) + _.get(promotedOptions, 'length', 0);
    const delay = {
      transition: `opacity 0.3s ease-in-out ${((keyID + 1) / (optionsLength + 1)) * 0.284}s, background 0.2s ease-in-out`
    };
    return (
      <SelectOption
        key={keyID}
        visible={this.props.visible}
        style={delay}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            onOptionUpdate(value);
          }
        }}>
          {clonedOptionItem}
        </SelectOption>
    );
  };

  renderOptions = () => {
    const { options, promotedOptions } = this.props;
    if (_.isEmpty(options) && _.isEmpty(promotedOptions)) {
      return this.optionElement(undefined, 'select', 'Select');
    }
    const numberOfPomoted = _.get(promotedOptions, 'length', 0);
    return (
      options.map((option, idx) => this.optionElement(idx + numberOfPomoted, option.value, option.label))
    );
  };

  renderPromotedOptions = () => {
    const { promotedOptions } = this.props;
    if (promotedOptions) {
      return (
        <PromotedOptions listLength={_.size(promotedOptions)}>
          { promotedOptions.map((option, idx) => this.optionElement(idx, option.value, option.label, option.disabled)) }
        </PromotedOptions>
      );
    }
  }

  renderSearch = () => {
    if (!this.props.searchable) return null;

    return (
      <SearchInput
        label="Label"
        name="selectSearch"
        onChange={this.props.onSearch}
        search
      />
    );
  }

  render() {
    // Check to see if user has opened input, to know if it's okay to run close animation. Not good to run close animation on load.
    if (this.props.visible && !this.state.inputUsed) {
      this.setState({
        inputUsed: true
      });
    }
    return (
      <SelectOptionsContainer dirty={this.state.inputUsed} {...this.props}>
        <SelectOptionsWrapper {...this.props} ref={(el) => { this.optionWrapperEl = el; }}>
          {this.renderSearch()}
          {this.renderPromotedOptions()}
          {this.renderOptions()}
        </SelectOptionsWrapper>
      </SelectOptionsContainer>
    );
  }
}

SelectOptions.propTypes = {
  onClick: PropTypes.func.isRequired,
  promotedOption: PropTypes.objectOf(PropTypes.string),
  options: PropTypes.array.isRequired,
  optionsCount: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired
};

SelectOptions.defaultProps = {
  onClick: () => {},
  options: [],
  optionsCount: 0,
  visible: false
};

export default SelectOptions;
