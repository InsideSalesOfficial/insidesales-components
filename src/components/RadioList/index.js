import PropTypes from 'prop-types';
import RadioComponent from './Radio';
import React from 'react';

const RadioListComponent = ({ radios, value, onChange, name }) => (
  <div>
    {radios.map((radio, key) => (<RadioComponent
       id={radio.id}
       name={name}
       key={key}
       label={radio.label}
       value={radio.value}
       setValue={(val) => { onChange(val); } }
       selectedValue={value}
    />))}
  </div>
);

RadioListComponent.PropTypes = {
  radios: PropTypes.arrayOf(PropTypes.objectOf({
    value: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string
  })),
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
};

export default RadioListComponent;