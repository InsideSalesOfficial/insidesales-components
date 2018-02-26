import React from 'react';
import { storiesOf } from '@storybook/react';

import Loader from './';

const darkExample = {
  height: '40px',
  backgroundColor: '#2a434a',
  padding: '16px'
}


storiesOf('Base', module)
.addWithChapters(
  'Loader',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import { Loader } from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'Default',
            sectionFn: () => (
              <Loader/>
            )
          },
          {
            title: 'Medium',
            sectionFn: () => (
              <Loader medium/>
            )
          },
          {
            title: 'Small',
            sectionFn: () => (
              <Loader small/>
            )
          },
          {
            title: 'White',
            sectionFn: () => (
              <div style={darkExample}>
                <Loader white/>
              </div>
            )
          },
        ]
      }
    ]
  }
);

