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
                    selectOptionsWidth={400}
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
                      {
                        label: '+35 (AB)',
                        value: '+35'
                      },
                      {
                        label: '+45 (CD)',
                        value: '+45'
                      },
                      {
                        label: '+46 (EF)',
                        value: '+46'
                      },
                      {
                        label: '+47 (GH)',
                        value: '+47'
                      },
                      {
                        label: '+48 (IJ)',
                        value: '+48'
                      },
                      {
                        label: '+49 (KL)',
                        value: '+49'
                      },
                      {
                        label: '+50 (MN)',
                        value: '+50'
                      },
                      {
                        label: '+60 (OP)',
                        value: '+60'
                      },
                      {
                        label: '+70 (QR)',
                        value: '+70'
                      },
                      {
                        label: '+80 (ST)',
                        value: '+80'
                      },
                      {
                        label: '+90 (UV)',
                        value: '+90'
                      },
                      {
                        label: '+91 (WX)',
                        value: '+91'
                      },
                      {
                        label: '+92 (YZ)',
                        value: '+92'
                      },
                      {
                        label: '+93 (NO)',
                        value: '+93'
                      },
                      {
                        label: '+64 (WI)',
                        value: '+64'
                      },
                      {
                        label: '+86 (KN)',
                        value: '+86'
                      },
                      {
                        label: '+777 (OW)',
                        value: '+777'
                      },
                      {
                        label: '+56 (MY)',
                        value: '+56'
                      },
                      {
                        label: '+12 (AB)',
                        value: '+12'
                      },
                    ]}
                  />
                </div>
              )
            },
            {
              title: 'Example: use inputType to change to password input',
              sectionFn: () => (
                <TextInput
                  label="Password"
                  name="password"
                  inputType="password"
                />
              )
            },
          ]
        }
      ]
    }
  );
