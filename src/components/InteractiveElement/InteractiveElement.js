import styled from 'styled-components';

import { colors, fontSizes } from '../styles';

const InteractiveElement = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  color: ${colors.green};
  cursor: pointer;
  font-size: ${fontSizes.xSmall};
  text-align: left;
  &:focus {
    outline: none;
  }
`;

export default InteractiveElement;
