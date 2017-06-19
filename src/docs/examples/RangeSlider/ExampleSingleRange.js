import React from 'react';
import RangeSlider from 'ui-components/RangeSlider';

/** Single Value Range Slider */
export default function ExampleSingleRange() {
  return <RangeSlider
          label="Pick a number"
          minValue={0}
          maxValue={100}
          onRangeUpdate={() => {}} />
}