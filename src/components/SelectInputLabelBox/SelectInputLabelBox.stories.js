import React from 'react';
import { storiesOf, action } from '@storybook/react';
import SelectInputLabelBox from './SelectInputLabelBox';


const promotedOptions = [
  { value: '101', label: 'Promoted Option 1', disabled: true },
  { value: '102', label: 'Promoted Option 2' },
];

class WrapperComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  render = () => (
    <SelectInputLabelBox
      {...this.props}
      value={this.state.value}
      onChange={(value) => this.setState({value})}
    />) 
}

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

const selectedOptions = [
  '1',
  '2',
]

storiesOf('Form', module)
  .addWithChapters(
  'SelectInputLabelBox',
  {
    info: `
      Usage

      ~~~
      import React from 'react';
      import {SelectInputLabelBox} from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            title: 'SelectInputLabelBox',
            sectionFn: () => (
              <div>
                <SelectInputLabelBox
                  label="Hello World!"
                  onChange={action('Option Selected')}
                  options={genericOptions} />
              </div>
            )
          },
          {
            title: 'SelectInputLabelBox with Stateful wrapper',
            sectionFn: () => (
              <div>
                <WrapperComponent
                  label="Hello World!"
                  options={genericOptions} />
              </div>
            )
          },
          {
            title: 'Disabled SelectInputLabelBox',
            sectionFn: () => (
              <div>
                <SelectInputLabelBox
                  isDisabled={true}
                  label="Hello World!"
                  options={genericOptions} />
              </div>
            )
          },
          {
            title: 'Disabled SelectInputLabelBox with value',
            sectionFn: () => (
              <div>
                <SelectInputLabelBox
                  isDisabled={true}
                  label="Hello World!"
                  value="Hi"
                  options={genericOptions} />
              </div>
            )
          },
        ]
      }
    ]
  }
);

