import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonBar from './';
import { darkBarTheme } from './ButtonBarThemes';
import { darkBlue } from "../styles/colors";


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
          },
          {
            title: 'DarkBarTheme',
            sectionFn: () => (
              <div style={{
                background: darkBlue.darkBlue,
                padding: '15px'
              }}>
                <ButtonBar
                  primaryActionText='Continue'
                  secondaryActionText='Skip'
                  onSecondaryActionClick={() => {}}
                  theme={darkBarTheme}
                />
              </div>
            )
          }
        ]
      }
    ]
  }
);

