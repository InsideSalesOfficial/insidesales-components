import React from 'react';
import RangeSlider from 'ui-components/RangeSlider';

/** Custom Value Step Range Slider */
export default function ExampleCustomValueStep() {
  return <RangeSlider
          minValue={0}
          maxValue={100}
          onRangeUpdate={() => {}}
          step={10} />
}