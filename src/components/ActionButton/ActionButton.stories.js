import React from 'react';
import {
  storiesOf,
  action
} from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import ActionButton from './ActionButton';

import { colors } from '../styles/colors';
import { generateFlexedThemeBackground } from "../styles/index.js";

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

function wrapComponentWithContainerAndTheme(theme, Component) {
  const storyContainerStyle = generateFlexedThemeBackground(
    { theme },
    { width: "100%", padding: "16px 0" }
  );
  return (
    <ThemeProvider theme={theme}>
      <div style={storyContainerStyle}>{Component}</div>
    </ThemeProvider>
  );
}

function renderChapterWithTheme(theme){
  return {
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
            sectionFn: () => wrapComponentWithContainerAndTheme(theme,
              <ActionButton
                icon="AddIcon"
                onClick={action('clicked')}
              />
            )
          },
          {
            title: 'Example: Plain button with toggle',
            sectionFn: () => wrapComponentWithContainerAndTheme(theme,
            <ActionButtonWrapper />)
          },
          {
            title: 'Example: Alternate icon with toggle',
            sectionFn: () => wrapComponentWithContainerAndTheme(theme,
              <ActionButtonWrapper
                icon="GroupAddIcon"
              />
            )
          },
          {
            title: 'Example: Disabled',
            sectionFn: () => wrapComponentWithContainerAndTheme(theme,
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
}

storiesOf('Base', module)
  .addWithChapters(
    'ActionButton',
    renderChapterWithTheme({})
  )
  .addWithChapters(
    'ActionButton w/ BlueYellowTheme',
    renderChapterWithTheme(colors.blueYellowTheme)
  );