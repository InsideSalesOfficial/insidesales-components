import React from "react";
import { storiesOf, action } from "@storybook/react";
import styled, { ThemeProvider } from "styled-components";
import _ from "lodash";

import {
  renderThemeIfPresentOrDefault,
  generateFlexedThemeBackground,
  colors,
  typography
} from "../styles";
import Icons from "../icons";

import Select from './Select';

const promotedOptions = [
  { value: "101", label: "Promoted Option 1", disabled: true },
  { value: "102", label: "Promoted Option 2" }
];

const genericOptions = [
  { value: "1", label: "Option One" },
  { value: "2", label: "Option Two" },
  { value: "3", label: "Option Three" },
  { value: "4", label: "Option Four" },
  { value: "5", label: "Option Five" },
  { value: "6", label: "Option Six" },
  { value: "7", label: "Option Seven" },
  { value: "8", label: "Option Eight" },
  { value: "9", label: "Option Nine" },
  { value: "10", label: "Option Ten" },
  {
    value: "11",
    label:
      "A really long string A really long string A really long string A really long string A really long string A really long string A really long string A really long string A really long string A really long string"
  }
];

function wrapComponentWithContainerAndTheme(theme, Component, wrapperStyling) {
  const storyContainerStyle = generateFlexedThemeBackground(
    { theme },
    { padding: "16px 16px" }
  );
  return (
    <ThemeProvider theme={theme}>
      <div style={{ ...storyContainerStyle, ...wrapperStyling }}>
        {Component}
      </div>
    </ThemeProvider>
  );
}

storiesOf("Form", module)
  .addWithChapters("Select", renderChapterWithTheme(colors.blueYellowTheme));

function renderChapterWithTheme(theme) {
  const darkExample = {
    height: "220px",
    backgroundColor: theme.primary01 || "#2a434a",
    padding: "16px"
  };

  return {
    info: `
      Usage

      ~~~
      import React from 'react';
      import {Select} from 'insidesales-components';
      ~~~
    `,
    chapters: [
      {
        sections: [
          {
            subtitle: "Default",
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <Select
                  onChange={action("Option Selected")}
                  label="Custom Label"
                  options={genericOptions}
                />,
                darkExample
              )
          }
        ]
      }
    ]
  };
}
