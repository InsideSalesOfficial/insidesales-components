import React from 'react';
import { storiesOf, action } from '@storybook/react';

import RadioListComponent from './index.js';

let value = 3;
let name = 'test-radio';


storiesOf('Form', module)
.addWithChapters(
  'RadioList',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import { RadioList } from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'Example: Standard Radio List',
            subtitle: 'A Radio List with Numeric Values and an Initial Value of 3',
            sectionFn: () => {
              const radios = [
                {
                  value: 1,
                  id: 'radio-1',
                  label: 'radio 1'
                },
                {
                  value: 2,
                  id: 'radio-2',
                  label: 'radio 2'
                },
                {
                  value: 3,
                  id: 'radio-3',
                  label: 'radio 3'
                },
              ];
              
              return (
                <RadioListComponent
                  radios={radios}
                  value={value}
                  onChange={action('onChange')}
                  name={name} />
              )
            }
          },
          {
            title: 'Wrapped In a Stateful Component',
            sectionFn: () => {

            const radios2 = [
              {
                value: 1,
                id: 'radio-2-1',
                label: 'radio 1'
              },
              {
                value: 2,
                id: 'radio-2-2',
                label: 'radio 2'
              },
              {
                value: 3,
                id: 'radio-2-3',
                label: 'radio 3'
              },
            ];

              class Wrapper extends React.Component {
                constructor() {
                  super();

                  this.state = {
                    value: 1
                  }
                }

                render() {

                  return (
                    <div>
                      <RadioListComponent
                        radios={radios2}
                        value={this.state.value}
                        onChange={(val) => { this.setState({ value: val }); }}
                        name={name} />

                      <div>Current Value: {this.state.value}</div>
                    </div>
                  );
                }
              }

              return (<Wrapper />);
            }
          }
        ]
      }
    ]
  }
);