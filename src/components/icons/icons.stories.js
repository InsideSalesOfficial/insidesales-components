import React from 'react';
import { storiesOf, action } from '@storybook/react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

import { colors } from '../styles/colors';

import Icons from './';

const media = {
  large: (...args) => css`
    @media (min-width: 960px) {
      ${ css(...args) }
    }
  `
}

const ExampleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  ${ media.large`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  ` }
`;

const IconWrapper = styled.div`
  padding: 10px;
  margin: 5px;
  color: white;
  text-align: center;
  background-color: ${(props) => {
    if (props.remove) {
      return colors.red;
    }
    return colors.greenBackground;
    }
  };
`;

const icons = _.map(_.omit(Icons, 'TaskIcons'), (icon, key) => {
  const removeIcon = _.get(icon({size: undefined}), 'props.remove');
  const IconEl = React.createElement(icon, { fill: colors.white, size: { width: '50', height: '50' } });
  return (
  <IconWrapper remove={removeIcon} onClick={action(key)} key={key}>
    {IconEl}
    <div>{key}</div>
  </IconWrapper>
)}
);

storiesOf('Base', module)
.addWithChapters(
  'Icons',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import { Icons } from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'Default',
            sectionFn: () => (
              <ExampleWrapper>
                {icons}
              </ExampleWrapper>
            )
          }
        ]
      }
    ]
  }
);
