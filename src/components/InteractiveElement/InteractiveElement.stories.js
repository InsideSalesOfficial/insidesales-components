import React from 'react';
import { storiesOf, action } from '@storybook/react';

import InteractiveElement from './';

storiesOf('Base', module)
.addWithChapters(
  'InteractiveElement',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import { InteractiveElement } from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'Default',
            sectionFn: () => (
              <InteractiveElement onClick={action('clicked')}>
                I can be clicked
              </InteractiveElement>
            )
          }
        ]
      }
    ]
  }
);

