import React from "react";
import { storiesOf, action } from "@storybook/react";
import SelectInputLabelBox from "./SelectInputLabelBox";
import Button from "../Button";
import styled from "styled-components";

import {
  renderThemeIfPresentOrDefault,
  wrapComponentWithContainerAndTheme,
  colors,
  typography
} from "../styles";
import { SelectInputLabelBoxThemes } from "../index";

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 6px;
  padding-bottom: 6px;
  button {
    margin-right: 4px;
  }
`;

const OptionLabel = styled.div`
  ${typography.caption};
  color: ${renderThemeIfPresentOrDefault({
    key: "white60",
    defaultValue: colors.black60
  })};
`;

const OptionValue = styled.div`
  ${typography.subhead1};
  color: ${renderThemeIfPresentOrDefault({
    key: "white90",
    defaultValue: colors.black90
  })};
`;


class MultiselectWrapperComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: []
    };
  }
  render = () => (
    <SelectInputLabelBox
      {...this.props}
      value={this.state.value}
      onChange={value => {
        this.setState({ value });
      }}
      multiSelect
    />
  );
}

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
  },
  { value: 12, label: `I'm a number` }
];

const optionsToPromote = [{ value: "p1", label: "Clear Selection" }];

const htmlOptions = [
  {
    value: "1",
    optionLabel: "option one label",
    optionValue: "option one",
    label: (
      <OptionWrapper>
        <OptionLabel>option one label</OptionLabel>
        <OptionValue>option one</OptionValue>
      </OptionWrapper>
    )
  },
  {
    value: "2",
    optionLabel: "option two label",
    optionValue: "option two",
    label: (
      <OptionWrapper>
        <OptionLabel>option two label</OptionLabel>
        <OptionValue>option two</OptionValue>
      </OptionWrapper>
    )
  }
];

const selectedOptions = ["1", "2"];

class WrapperComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      error: false,
      isDisabled: false,
      isPlaceholder: false,
      required: false,
    };
  }

  toggle = (param) => {
    this.setState(prevState => ({
      [param]: !prevState[param]
    }))
  }

  render = () => (
    <div>
      <SelectInputLabelBox
        {...this.props}
        {...this.state}
        onChange={value => this.setState({ value })}
      />
      <ButtonWrapper>
        <Button flat label="Clear Value" onClick={() => this.setState({ value: "" })} />
        <Button flat label="Toggle error" onClick={() => this.toggle("error")} />
        <Button flat label="Toggle isDisabled" onClick={() => this.toggle("isDisabled")} />
        <Button flat label="Toggle required" onClick={() => this.toggle("required")} />
      </ButtonWrapper>
    </div>
  );
}

function renderChapterWithTheme(theme) {
  return {
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
            title: "SelectInputLabelBox",
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <WrapperComponent
                  label="Hello World!"
                  options={genericOptions}
                />
              )
          },
          {
            title: "SelectInputLabelBox with custom options width",
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <div>
                  <SelectInputLabelBox
                    label="Hello World!"
                    optionsWidth="240"
                    onChange={action("Option Selected")}
                    options={genericOptions}
                  />
                </div>
              )
          },
          {
            title: "SelectInputLabelBox with Stateful wrapper and required",
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <WrapperComponent
                  label="Hello World!"
                  required
                  options={genericOptions}
                />
              )
          },
          {
            title: "SelectInputLabelBox with Stateful wrapper and multiselect",
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <div>
                  <MultiselectWrapperComponent
                    label="multiselect"
                    options={genericOptions}
                  />
                </div>
              )
          },
          {
            title: "SelectInputLabelBox with custom options width",
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <div>
                  <SelectInputLabelBox
                    label="Hello World!"
                    optionsWidth="240"
                    onChange={action("Option Selected")}
                    options={genericOptions}
                  />
                </div>
              )
          },
          {
            title:
              "SelectInputLabelBoxTransparent with value and promotedOption",
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <div>
                  <SelectInputLabelBox
                    label="Hello world"
                    options={htmlOptions}
                    promotedOptions={optionsToPromote}
                    theme={
                      SelectInputLabelBoxThemes.lineSelectInputBoxTransparentTheme
                    }
                  />
                </div>
              )
          },
          {
            title: "SelectInputLabelBoxTransparent with searchable dropdown",
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <div>
                  <SelectInputLabelBox
                    label="Hello World!"
                    onChange={action("Option Selected")}
                    options={genericOptions}
                    searchable
                  />
                </div>
              )
          },
          {
            title: "SelectInputLabelBox with multiselect",
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <div>
                  <SelectInputLabelBox
                    label="Hello World!"
                    onChange={action("Option Selected")}
                    value={selectedOptions}
                    options={genericOptions}
                    multiSelect
                  />
                </div>
              )
          }
        ]
      }
    ]
  };
}

storiesOf("Form", module)
  .addWithChapters("Default SelectInputLabelBox", renderChapterWithTheme({}))
  .addWithChapters(
    "SelectInputLabelBox w/ BlueYellow Theme",
    renderChapterWithTheme(colors.blueYellowTheme)
  );
