import React from 'react';
import {
  storiesOf,
  action
} from '@storybook/react';

import ActionButton from './ActionButton';

// wrapper just for toggle state handling in storybook
class ActionButtonWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      togState: false
    };
  }
  toggle = () => {
    this.setState({
      togState: !this.state.togState
    });
  }
  render() {
    return <ActionButton
      icon={this.props.icon}
      onClick={this.toggle}
      toggled={this.state.togState}/>
  }
}

storiesOf('Base', module)
  .addWithChapters(
    'ActionButton',
    {
      info: `
        Usage

        ~~~
        import React from 'react';
        import {ActionButton} from 'insidesales-components';
        ~~~
      `,
      chapters: [
        {
          sections: [
            {
              title: 'Example: Plain button, no toggle',
              sectionFn: () => (
                <ActionButton
                  icon="AddIcon"
                  onClick={action('clicked')}
                />
              )
            },
            {
              title: 'Example: Plain button with toggle',
              sectionFn: () => (<ActionButtonWrapper />)
            },
            {
              title: 'Example: Alternate icon with toggle',
              sectionFn: () => (
                <ActionButtonWrapper
                  icon="GroupAddIcon"
                />
              )
            },
            {
              title: 'Example: Disabled',
              sectionFn: () => (
                <ActionButton
                  icon="AddIcon"
                  toggle
                  disabled
                />
              )
            },
          ]
        }
      ]
    }
  );