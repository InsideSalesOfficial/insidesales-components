import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './';


storiesOf('Base', module)
.addWithChapters(
  'Button',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import { Button } from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'Default',
            sectionFn: () => (
              <Button>Save</Button>
            )
          }
        ]
      }
    ]
  }
);

