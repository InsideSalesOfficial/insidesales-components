import React from "react";
import { storiesOf, action } from "@storybook/react";
import Select from "./Select";
import Button from "../Button";
import styled from "styled-components";

import {
  renderThemeIfPresentOrDefault,
  wrapComponentWithContainerAndTheme,
  colors,
  typography
} from "../styles";

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

const promotedOption = [{ value: "p1", label: "Promoted Option" }];

const genericOptions = [
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
  },
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

class WrapperComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }

  toggle = (param) => {
    this.setState(prevState => ({
      [param]: !prevState[param]
    }));
  }

  toggleValue = (param, value) => {
    this.setState(prevState => ({
      [param]: prevState[param] === value ? null : value
    }));
  }

  handleSelectInputChange = (value) => {
    action("Option Selected")(value);
    this.setState({ value });
  }

  render = () => (
    <div>
      <ButtonWrapper>
        <Button flat label="Clear Value" onClick={() => this.setState({ value: "" })} />
        <Button flat={!this.state.error} label="error" onClick={() => this.toggle("error")} />
        <Button flat={!this.state.isDisabled} label="isDisabled" onClick={() => this.toggle("isDisabled")} />
        <Button flat={!this.state.required} label="required" onClick={() => this.toggle("required")} />
        <Button flat={!this.state.searchable} label="searchable" onClick={() => this.toggle("searchable")} />
        <Button flat={!this.state.multiSelect} label="multiSelect" onClick={() => this.toggle("multiSelect")} />
        <Button flat={!this.state.optionsWidth} label="optionsWidth" onClick={() => this.toggleValue("optionsWidth", "240")} />
        <Button flat={!this.state.promotedOptions} label="promotedOptions" onClick={() => this.toggleValue("promotedOptions", promotedOption)} />
      </ButtonWrapper>
      <Select
        {...this.props}
        {...this.state}
        onChange={this.handleSelectInputChange}
      />
    </div>
  );
}

function renderChapterWithTheme(theme) {
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
            title: "Select",
            options: {
              showSource: false
            },
            sectionFn: () =>
              wrapComponentWithContainerAndTheme(
                theme,
                <WrapperComponent
                  label="Input Label"
                  options={genericOptions}
                />
              )

          },
        ]
      }
    ]
  };
}

storiesOf("Form", module)
  .addWithChapters("Default Select", renderChapterWithTheme({}))
  .addWithChapters(
    "Select w/ BlueYellow Theme",
    renderChapterWithTheme(colors.blueYellowTheme)
  );