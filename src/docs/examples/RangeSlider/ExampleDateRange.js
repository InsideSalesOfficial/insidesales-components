import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { fontSizes } from '../../../shared/theme';
import RangeSlider from 'ui-components/RangeSlider';

/** Date Range Slider */
export default function ExampleDateRange() {
  
  const Hour = styled.span`
    .isdc-ext-wrap & {
      font-size: ${fontSizes.small};
      margin-right: 4px;
    }
  `;

  const Meridian = styled.small`
    .isdc-ext-wrap & {
      font-size: ${fontSizes.xxSmall};
    }
  `;

  const formatLabel = value => (
    <div>
      <Hour>{moment().startOf('day').add(value, 'hours').format('h')}</Hour>
      <Meridian>{moment().startOf('day').add(value, 'hours').format('A')}</Meridian>
    </div>
  );

  return <RangeSlider
          label="time is between"
          formatLabel={formatLabel}
          initialValue={{
            min: 8,
            max: 17
          }}
          minValue={0}
          maxValue={24}
          onRangeUpdate={() => {}} />
}