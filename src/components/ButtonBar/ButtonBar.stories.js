import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonBar from './';


storiesOf('Components', module)
.addWithChapters(
  'ButtonBar',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import { ButtonBar } from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'Default',
            sectionFn: () => (
              <ButtonBar primaryActionText='Continue'
              secondaryActionText='Skip'
              onSecondaryActionClick={() => {}}/>
            )
          }
        ]
      }
    ]
  }
);

