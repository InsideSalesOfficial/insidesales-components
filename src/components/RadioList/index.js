import PropTypes from 'prop-types';
import RadioComponent from './Radio';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultRadioListTheme } from './RadioListThemes';


const RadioListComponent = ({ radios, value, onChange, name, theme }) => (
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
);

RadioListComponent.defaultProps = {
  theme: defaultRadioListTheme
}

RadioListComponent.PropTypes = {
  radios: PropTypes.arrayOf(PropTypes.objectOf({
    value: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string
  })),
  theme: PropTypes.shape({
    background: PropTypes.string,
    backgroundFocused: PropTypes.string,
    margin: PropTypes.string,
    lightRadio: PropTypes.bool,
  }),
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
};

export default RadioListComponent;