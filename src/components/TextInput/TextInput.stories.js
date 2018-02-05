import React from 'react';
import {
  storiesOf,
  action
} from '@storybook/react';

import TextInput from './TextInput';

storiesOf('Form', module)
  .addWithChapters(
    'TextInput',
    {
      info: `
        Usage

        ~~~
        import React from 'react';
        import {TextInput} from 'insidesales-components';
        ~~~
      `,
      chapters: [
        {
          sections: [
            {
              title: 'Example: text input default empty',
              sectionFn: () => (
                <TextInput
                  label="Label"
                  name="first"
                  onChange={action('value')}
                />
              )
            },
            {
              title: 'Example: text input with existing text',
              sectionFn: () => (
                <TextInput
                  label="Label"
                  name="firstz"
                  onChange={action('value')}
                  value="This text was hardcoded into stories. The structure of this component follows how a `TextInput` should look."
                />
              )
            },
            {
              title: 'Example: text input with helper text',
              sectionFn: () => (
                <TextInput
                  label="Labely"
                  helper="Helper text."
                  error=""
                  name="second"
                  onChange={action('value')}
                />
              )
            },
            {
              title: 'Example: text input with error text',
              sectionFn: () => (
                <TextInput
                  label="Label"
                  helper="Helper text."
                  error="Errors will override helper text."
                  name="third"
                  onChange={action('value')}
                  value="This text was hardcoded into stories."
                />
              )
            },
            {
              title: 'Example: text input disabled',
              sectionFn: () => (
                <TextInput
                  label="Label"
                  helper="Helper text."
                  disabled
                  name="fourth"
                  onChange={action('value')}
                />
              )
            },
            {
              title: 'Example: text input disabled with text',
              sectionFn: () => (
                <TextInput
                  label="Label"
                  helper="Helper text."
                  disabled
                  name="fifth"
                  value="this is some example text"
                  onChange={action('value')}/>
              )
            },
            {
              title: 'Example: text input closed without value',
              sectionFn: () => (
                <TextInput
                  label="Label"
                  helper="Helper text."
                  name="sixth"
                  collapsed />
              )
            },
            {
              title: 'Example: text input closed without value and has an error',
              sectionFn: () => (
                <TextInput
                  label="Label"
                  helper="Helper text."
                  error={"This field is required."}
                  name="sixth"
                  collapsed />
              )
            },
            {
              title: 'Example: text input search',
              sectionFn: () => (
                <TextInput
                  label="Search"
                  name="seven"
                  onChange={action('value')}
                  search
                />
              )
            },
            {
              title: 'Example: text input with options',
              sectionFn: () => (
                <TextInput
                  label="Search"
                  name="seven"
                  onChange={action('value')}
                  options={[
                    {
                      label: 'Foo',
                      value: 'Foo'
                    },
                    {
                      label: 'Bar',
                      value: 'Bar'
                    },
                    {
                      label: 'Baz',
                      value: 'Baz'
                    }
                  ]}
                />
              )
            },
            {
              title: 'Example: small text input with options and low padding',
              sectionFn: () => (
                <div style={{width: '90px'}}>
                  <TextInput
                    label="Country"
                    name="Country"
                    lowPadding={true}
                    onChange={action('value')}
                    options={[
                      {
                        label: '+1 (US)',
                        value: '+1'
                      },
                      {
                        label: '+44 (UK)',
                        value: '+44'
                      },
                    ]}
                  />
                </div>
              )
            },
          ]
        }
      ]
    }
  );