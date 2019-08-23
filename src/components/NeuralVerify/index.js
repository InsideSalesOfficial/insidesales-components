import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Icons from '../icons';


import {
  tron,
  black,
  orange
} from '../styles/colors';

import { NeuralVerifyFlyout } from './NeuralVerifyFlyout.js';
import { verifiedStates } from './constants';
import { getVerifiedState } from './utils';


const { VerifyFilledIcon, CautionFilledIcon, VerifyIcon,
  CompanyIcon, MobilePhoneIcon, RemoveCircleIcon, PrintIcon,
  VerifiedMobilePhoneIcon, NoAnswerIcon, NoAnswerMobileIcon, CheckmarkFilledIcon } = Icons;

const NeuralVerifiedContainer = styled.div`

  align-items: center;
  position: absolute;
`;

const iconStyle = (color, iconSize) => (
  {
    fill: color,
    height: iconSize,
    width: iconSize
  }
);

class NeuralVerify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNeuralVerifiedMessage: false,
    };
  }

  getVerifiedIcon(neuralVerifiedState, height, width) {
    const blueIconStyle = iconStyle(tron.tron, height, width);
    const greyIconStyle = iconStyle(black.black40, height, width);
    const orangeIconStyle = iconStyle(orange.orange, height, width);
    switch (neuralVerifiedState) {
      case verifiedStates.VERIFIED_HIGH:
        return <VerifyFilledIcon style={blueIconStyle} />;
      case verifiedStates.VERIFIED:
        return <VerifyIcon style={blueIconStyle} />;
      case verifiedStates.CORPORATE:
        return <CompanyIcon style={blueIconStyle} />;
      case verifiedStates.PREVIOUSLY_VERIFIED:
        return <VerifyIcon style={greyIconStyle} />;
      case verifiedStates.MATCHING:
        return <CheckmarkFilledIcon style={greyIconStyle} />;
      case verifiedStates.NOT_ANSWERED:
        return <NoAnswerIcon style={orangeIconStyle} />;
      case verifiedStates.STALE:
        return <RemoveCircleIcon style={orangeIconStyle} />;
      case verifiedStates.FAX:
        return <PrintIcon style={orangeIconStyle} />;
      case verifiedStates.VERIFIED_BAD:
        return <CautionFilledIcon style={orangeIconStyle} />;
      case verifiedStates.MOBILE:
        return <MobilePhoneIcon style={blueIconStyle} />;
      case verifiedStates.MOBILE_VERIFIED:
        return <VerifiedMobilePhoneIcon style={blueIconStyle} />;
      case verifiedStates.MOBILE_NOT_ANSWERED:
        return <NoAnswerMobileIcon style={orangeIconStyle} />;
      default:
        return '';
    }
  }

  // Throttled hover action for event tracking
  throttledHoverAction = _.throttle(
    this.props.hoverAction,
    3000,
    { leading: true }
  );

  render() {
    const stateData = _.get(this.props, 'neuralData.state', 0);
    const carrier = _.get(this.props, 'neuralData.carrier', null)
    const verifiedDetail = _.get(this.props, 'neuralData.detail', {});
    const verifiedReason = _.get(verifiedDetail, 'verifiedReason', '');
    const verifiedState = getVerifiedState(stateData, verifiedReason, carrier);
    return (verifiedState !== 0 &&
          <NeuralVerifiedContainer
            onMouseEnter={() => {
              if (this.props.allowOverflow) this.throttledHoverAction();
              this.setState({ showNeuralVerifiedMessage: true });
            }}
            onMouseLeave={() => this.setState({ showNeuralVerifiedMessage: false })}
          >
            {this.getVerifiedIcon(verifiedState,this.props.iconSize)}
            {this.state.showNeuralVerifiedMessage && this.props.allowOverflow &&
              <NeuralVerifyFlyout
                type={this.props.type}
                verifiedState={verifiedState}
                verifiedDetail={verifiedDetail}
              />
            }
          </NeuralVerifiedContainer>
    );
  }
}

NeuralVerify.defaultProps = {
  hoverAction: () => {},
  iconSize: '24px',
};

export default NeuralVerify;
