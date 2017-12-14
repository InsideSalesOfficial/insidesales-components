import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as _ from 'lodash';

import InteractiveElement from '../InteractiveElement';
import { MoreVertIcon } from '../icons';
import { boxShadows, colors, typography } from '../styles';

const SelectOption = styled.div`
  cursor: pointer;

  box-sizing: border-box;
  display: flex;
  padding: 0 10px;
  width: 100%;
  height: 38px;
  transition: background .25s ease-in-out;

  ${typography.subhead1}
  color: ${colors.selectItemColor};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
  }

  &:hover {
    background: ${colors.hoverGray};
    color: ${colors.selectItemColor};
  };
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 31px;
  right: -6px;

  min-width: 200px;
  background-color: transparent;
  overflow: visible;
  z-index: 1;

  &:before {
    position: absolute;
    content: '';
    right: 10px;
    top: -5px;
    bottom: auto;
    width: 14px;
    height: 14px;
    transform: rotate(-45deg);
    box-shadow: ${boxShadows.lvl20};
    z-index: -1;
  }

  &:after {
    position: absolute;
    content: '';
    right: 10px;
    top: -16px;
    bottom: auto;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid ${colors.white};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  background-color: ${colors.white};
  border-radius: 2px;
  box-shadow: ${boxShadows.lvl20};
`;

const OverflowWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

class OverflowMenu extends React.Component {
  static propTypes = {
    isDisabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    isDisabled: false,
    options: [],
    onChange: value => value
  };

  constructor() {
    super();

    this.state = {
      menuVisible: false
    };
  }

  checkDocumentEvent = (event) => {
    if (this.state.menuVisible && !_.includes(event.path, this.refs.clickEventElement)) {
      this.closeMenu();
    }
  }

  onChange = (newValue) => {
    this.props.onChange(newValue);
    this.closeMenu();
  }

  toggleMenu = () => {
    if (this.state.menuVisible) {
      this.closeMenu();
    } else if (!this.props.isDisabled) {
      this.openMenu();
    }
  }

  openMenu = () => {
    document.addEventListener('click', this.checkDocumentEvent);
    this.setState({ menuVisible: true });
  }

  closeMenu = () => {
    document.removeEventListener('click', this.checkDocumentEvent);
    this.setState({ menuVisible: false });
  }

  renderMenu = () => {
    const { options } = this.props;
    return (
      options.map((option, idx) => (
        <SelectOption key={idx} onClick={option.action}>{option.label}</SelectOption>
        ))
    );
  }

  render() {
    return (
      <OverflowWrapper {...this.props} ref="clickEventElement">
        <InteractiveElement onClick={() => { this.toggleMenu(); }}>
          <MoreVertIcon
            fill={colors.white80}
            size={{ width: 24, height: 24 }}
          />
        </InteractiveElement>
        {this.state.menuVisible &&
          <OptionsContainer>
            <OptionsWrapper>
              {this.renderMenu()}
            </OptionsWrapper>
          </OptionsContainer>
        }
      </OverflowWrapper>
    );
  }
}

export default OverflowMenu;
