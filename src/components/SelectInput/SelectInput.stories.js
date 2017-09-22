import React from 'react';
import { storiesOf, action } from '@storybook/react';

import {
  lineSelectInputTheme,
  transparentSelectInputTheme
} from './SelectInputThemes';

import SelectInput from './';

const darkExample = {
  height: '220px',
  backgroundColor: '#2a434a',
  padding: '16px'
}

const lightExample = {
  height: '220px',
  backgroundColor: '#2a434a',
  padding: '16px'
}

const promotedOptions = [
  { value: '101', label: 'Promoted Option 1', disabled: true },
  { value: '102', label: 'Promoted Option 2' },
];

const genericOptions = [
  { value: '1', label: 'Option One' },
  { value: '2', label: 'Option Two' },
  { value: '3', label: 'Option Three' },
  { value: '4', label: 'Option Four' },
  { value: '5', label: 'Option Five' },
  { value: '6', label: 'Option Six' },
  { value: '7', label: 'Option Seven' },
  { value: '8', label: 'Option Eight' },
  { value: '9', label: 'Option Nine' },
  { value: '10', label: 'Option Ten' },
  { value: '11', label: 'A really long string A really long string A really long string A really long string A really long string A really long string A really long string A really long string A really long string A really long string' },
];

storiesOf('Form', module)
.addWithChapters(
  'SelectInput',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import {SelectInput} from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'Default Theme',
            sectionFn: () => (
              <div style={darkExample}>
                <SelectInput 
                  onChange={action('Option Selected')}
                  options={genericOptions} />
              </div>
            )
          },
          {
            subtitle: 'Custom Label',
            sectionFn: () => (
              <div style={darkExample}>
                <SelectInput 
                  onChange={action('Option Selected')}
                  defaultLabel="Custom Label" 
                  options={genericOptions} />
              </div>
            )
          },
          {
            subtitle: 'Disabled',
            sectionFn: () => (
              <div style={darkExample}>
                <SelectInput
                  options={genericOptions}
                  isDisabled
                  onChange={action('Option Selected')}
                  defaultLabel="Custom Default"
                  />
              </div>
            )
          },
          {
            title: 'Line Select Input Theme',
            subtitle: 'Generally used in modals (lineSelectInputTheme)',
            sectionFn: () => (
              <div style={lightExample}>
                <SelectInput
                  options={genericOptions}
                  onChange={action('Option Selected')}
                  defaultLabel="Custom Selected Option Name"
                  theme={lineSelectInputTheme}/>
              </div>
            )
          },
          {
            title: 'Transparent Select Input Theme',
            subtitle: 'Used as filter on People page (transparentSelectInputTheme)',
            sectionFn: () => (
              <div style={darkExample}>
                <SelectInput
                  options={genericOptions}
                  onChange={action('Option Selected')}
                  defaultLabel="Custom Default"
                  theme={transparentSelectInputTheme}/>
              </div>
            )
          },
          {
            subtitle: 'Disabled Transparent Select Input Theme',
            sectionFn: () => (
              <div style={darkExample}>
                <SelectInput
                  options={genericOptions}
                  onChange={action('Option Selected')}
                  defaultLabel="Custom Default"
                  isDisabled
                  theme={transparentSelectInputTheme}/>
              </div>
            )
          },
          {
            title: 'Additional state for options',
            subtitle: 'Promoted Items',
            sectionFn: () => (
              <div style={lightExample}>
                <SelectInput
                  options={genericOptions}
                  theme={lineSelectInputTheme}
                  onChange={action('Option Selected')}
                  defaultLabel={''}
                  promotedOptions={promotedOptions}
                  />
              </div>
            )
          }
        ]
      }
    ]
  }
);

