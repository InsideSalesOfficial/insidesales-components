import React from 'react';
import RangeSlider from 'ui-components/RangeSlider';

/** Double Range Slider */
export default function ExampleDoubleRange() {
  return <RangeSlider
          label="Pick a number"
          initialValue={{
            min: 25,
            max: 50
          }}
          minValue={0}
          maxValue={100}
          onRangeUpdate={() => {}} />
}