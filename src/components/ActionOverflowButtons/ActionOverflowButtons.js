import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import ActionButton from '../ActionButton';
import Icons from '../icons';
import InteractiveElement from '../InteractiveElement';
import { colors, boxShadows, typography } from '../styles';

const ANIMATION_IN_TOTAL = 400;
const ANIMATION_IN_ITEM = 200;
const ANIMATION_OUT = 140;

const ActionOverflowButtonsWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ItemText = styled.span`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${colors.offWhite};
  padding: 4px 8px;
  margin: ${(props) => {
    if(props.labelsPosition === 'left') {
      return '0 12px 0 0';
    }
    return '0 0 0 12px';
  }};
  color: ${colors.black90};
  box-shadow: ${boxShadows.lvl24};
  border-radius: 2px;
  opacity: ${(props) => {
    if (props.overflowItemsVisible) {
      return 1;
    }
    return 0;
  }};
  transition: ${(props) => {
    if (props.overflowItemsVisible) {
      return 'opacity 100ms linear';
    }
    return 'none';
  }};
  ${typography.body1}
`;

const OverflowList = styled.ul`
  visibility: ${(props) => {
    if (props.overflowItemsVisible) {
      return 'visible'
    }
    return 'hidden'
  }};
  position: absolute;
  right: ${(props) => {
    if(props.labelsPosition === 'left') {
      return '0';
    }
  }};
  margin: 0;
  margin-top: 16px;
  padding: 0;
  list-style-type: none;
  opacity: ${(props) => {
    if (props.transitionOff) {
      return 0;
    }
    return 1;
  }};
  transition: opacity ${ANIMATION_OUT}ms linear;
  ${(props) => {
    return _.map(props.overflowItems, (item, key) => {
      const currentItemKey = key + 1;
      return `
        li:nth-child(${currentItemKey}) {
          transition-delay: ${props.itemDelay * currentItemKey}ms;
          transform: scale(0.4) translateY(-${key * 16}px);
          span {
            transition-delay: ${(props.itemDelay * currentItemKey) + ANIMATION_IN_ITEM}ms;
          }
        }
      `;
    })
  }}
`;

const OverflowListItem = styled.li`
  display: flex;
  justify-content: ${(props) => {
    if(props.labelsPosition === 'left') {
      return 'flex-end';
    }
  }};
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 14px;
  opacity: ${(props) => {
    if (props.overflowItemsVisible) {
      return 1;
    }
    return 0;
  }};
  transform: ${(props) => {
    if (props.overflowItemsVisible) {
      return 'scale(1) translateY(0px) !important';
    }
  }};
  transform-origin: ${(props) => {
    if(props.labelsPosition === 'left') {
      return 'calc(100% - 20px) top';
    }
    return '20px top';
  }};
  transition: ${(props) => {
    if (props.overflowItemsVisible) {
      return `opacity ${ANIMATION_IN_ITEM}ms ease-out, transform ${ANIMATION_IN_ITEM}ms ease-out`;
    }
    return 'none';
  }};
  will-change: transform;
`;

const OverflowItemButton = styled(InteractiveElement)`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => {
    if (props.labelsPosition === 'left') {
      return 'row-reverse';
    }
  }};
  flex-shrink: 0;
  &:hover {
    svg {
      fill: ${colors.black90};
    }
    ${ItemText} {
      color: ${colors.black90};
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${colors.offWhite};
  box-shadow: ${boxShadows.lvl24};
  svg {
    fill: ${colors.black60};
  }
`;

class ActionOverflowButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overflowItemsVisible: false,
      transitionOff: false,
      actionButtonToggle: false
    };
  }

  // ensure last animation has enough time to animate within alotted time
  animationDelay = (ANIMATION_IN_TOTAL - ANIMATION_IN_ITEM) / this.props.overflowItems.length;

  toggleOverflowItems = () => {
    if (this.state.overflowItemsVisible) {
      this.setState({
        transitionOff: true,
        actionButtonToggle: false
      }, () => {
        setTimeout(() => {
          this.setState({
            overflowItemsVisible: false,
            transitionOff: false
          })
        }, ANIMATION_OUT);
      });
    } else {
      this.setState({
        overflowItemsVisible: true,
        actionButtonToggle: true
      });
    }
  }

  renderOverflowItems = () => {
    const { overflowItemsVisible } = this.state;
    const { labelsPosition } = this.props;
    const items = _.map(this.props.overflowItems, (item, key) => {
      const IconEl = Icons[item.icon];
      return (
        <OverflowListItem key={`overflow-item-${key}`} overflowItemsVisible={overflowItemsVisible} labelsPosition={labelsPosition}>
          <OverflowItemButton onClick={item.onClick} labelsPosition={labelsPosition}>
            <IconWrapper>
              <IconEl />
            </IconWrapper>
            <ItemText labelsPosition={labelsPosition} overflowItemsVisible={overflowItemsVisible}>{item.text}</ItemText>
          </OverflowItemButton>
        </OverflowListItem>
      );
    });
    return items;
  }

  render() {
    const { overflowItemsVisible, transitionOff, actionButtonToggle } = this.state;
    const { labelsPosition, actionButtonIcon, overflowItems } = this.props;
    return (
      <ActionOverflowButtonsWrapper>
        <ActionButton icon={actionButtonIcon} onClick={this.toggleOverflowItems} toggled={actionButtonToggle} />
        <OverflowList
          overflowItemsVisible={overflowItemsVisible}
          transitionOff={transitionOff}
          itemDelay={this.animationDelay}
          overflowItems={overflowItems}
          labelsPosition={labelsPosition}>
            {this.renderOverflowItems()}
        </OverflowList>
      </ActionOverflowButtonsWrapper>
    );
  }
}

ActionOverflowButtons.defaultProps = {
  overflowItems: [],
  labelsPosition: 'right'
};

ActionOverflowButtons.propTypes = {
  actionButtonIcon: PropTypes.string,
  overflowItems: PropTypes.array.isRequired,
  labelsPosition: PropTypes.string
};

export default ActionOverflowButtons;
