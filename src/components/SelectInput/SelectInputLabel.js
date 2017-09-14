import styled from 'styled-components';

import { colors, typography } from '../styles';
import { ellipsis } from 'polished';

const SelectInputLabel = styled.label`
  color: ${colors.boulder};
  ${typography.caption};
  ${ellipsis()}
`;

export default SelectInputLabel;
