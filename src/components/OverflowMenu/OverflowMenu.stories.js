import React from 'react';
import styled from 'styled-components';
import { storiesOf, action } from '@storybook/react';

import OverflowMenu from './';
import { colors } from '../styles';

const DarkBackground = styled.div`
  padding: 10px;
  height: 150px;
  background-color: ${colors.greenBackground};
`;

storiesOf('Menus', module)
.addWithChapters(
  'OverflowMenu',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import { OverflowMenu } from 'insidesales-components';

      const options = [
        { action: action('click option'), label: 'Option 1' },
        { action: action('click option'), label: 'Option 2' }
      ];

      <OverflowMenu options={options} />

      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'Default',
            sectionFn: () => {
              const options = [
                { action: action('click option'), label: 'Option 1' },
                { action: action('click option'), label: 'Option 2' }
              ];

              return  <DarkBackground><OverflowMenu options={options} /></DarkBackground>
            }
          },
          {
            title: 'Example: openUp',
            sectionFn: () => {
              const options = [
                { action: action('click option'), label: 'Option 1' },
                { action: action('click option'), label: 'Option 2' }
              ];

              return  <DarkBackground><OverflowMenu options={options} openUp /></DarkBackground>
            }
          }
        ]
      }
    ]
  }
);

