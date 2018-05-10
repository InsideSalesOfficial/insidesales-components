import React from 'react';
import { storiesOf, action } from '@storybook/react';
import styled from 'styled-components';
import _ from 'lodash';

import { colors } from './colors';

const ExampleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColorWrapper = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getRGBAValues = (color) => {
  let r, g ,b, a;
  if (color.indexOf('#') === 0) {
    color = color.slice(1);
    // convert 3-digit hex to 6-digits.
    if (color.length === 3) {
      color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    if (color.length !== 6) {
        throw new Error('Invalid HEX color.');
    }

    r = parseInt(color.slice(0, 2), 16);
    g = parseInt(color.slice(2, 4), 16);
    b = parseInt(color.slice(4, 6), 16);
    a = 1;
  } else {
    var parts = color.substring(color.indexOf("(")).split(",");
    r = parseInt(_.trim(parts[0].substring(1)), 10);
    g = parseInt(_.trim(parts[1]), 10);
    b = parseInt(_.trim(parts[2]), 10);
    a = parseFloat(_.trim(parts[3]), 10);
  }

  return {r, g, b, a};
}

const invertColor = (color) => {
  const c = getRGBAValues(color);  

  return c.a < 0.5 || Math.max(c.r,c.g,c.b) > 186
      ? 'black'
      : 'white';
}

const rgbToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g <= b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: ;
    }

    h /= 6;
  }

  return { h, s, l };
}

const colorComboValue = (color) => {
  const rgba = getRGBAValues(color);
  return rgba.r + rgba.g + rgba.b + rgba.a;
}

const sortByColor = (items) => {
  return _.sortBy(items, ['props.hslVal.h', 'props.colorVal']);
}

const colorList = sortByColor(_.map(colors, (color, key) => {
  const {r, g, b} = getRGBAValues(color);
  return (
  <ColorWrapper onClick={action(key)} key={key} hslVal={rgbToHSL(r, g, b)} colorVal={colorComboValue(color)} style={{backgroundColor: color, color: invertColor(color)}}>
    {key}
  </ColorWrapper>
)}
));

storiesOf('Base', module)
.addWithChapters(
  'Colors',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import { colors } from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'Default',
            sectionFn: () => (
              <ExampleWrapper>
                {colorList}
              </ExampleWrapper>
            )
          }
        ]
      }
    ]
  }
);
