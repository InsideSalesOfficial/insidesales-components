import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SelectOptions from '../SelectInput/SelectOptions';
import SelectWrapper from '../SelectInput/SelectWrapper';

import EditableTextInput from './EditableTextInput';

class EditableSelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsListVisible: false
    };
  }

  checkDocumentEvent = (event) => {
    const component = ReactDOM.findDOMNode(this.clickEventElement);
    if (!component) {
      document.removeEventListener('click', this.checkDocumentEvent);
      return;
    }
    const clickedOutside = !component.contains(event.target);

    if (this.state.optionsListVisible && clickedOutside) {
      this.closeOptionsList();
    }
  }

  onChange = (newValue) => {
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
    this.closeOptionsList();
  }
  
  toggleOptionsList = () => {
    if (!this.props.wrapCloseDisabled && this.state.optionsListVisible) {
      this.closeOptionsList();
    } else if (!this.props.isDisabled && !this.state.optionsListVisible) {
      this.openOptionsList();
    }
  }

  openOptionsList = () => {
    document.addEventListener('click', this.checkDocumentEvent);
    this.setState({ optionsListVisible: true });
  }

  closeOptionsList = () => {
    document.removeEventListener('click', this.checkDocumentEvent);
    this.setState({ optionsListVisible: false });
  }

  countOptions = () => {
    const { options } = this.props;

    let optionsCount = 0;

    // Determine how many options there are
    if (options && options.length) {
      optionsCount = options.length;
    }

    return optionsCount;
  }

  inputChange = (val) => {
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  }

  render() {
    const isOptionsDisabled = this.props.options.length <= 1;
    return (
      <SelectWrapper className={this.props.className}>
        <EditableTextInput
          displayValue={this.props.value}
          displayPlaceholder={this.props.placeholder}
          isDisabled={this.props.isDisabled}
          toggleOptionsList={this.toggleOptionsList}
          inputChange={this.inputChange}
          ref={(input) => { this.textInputParent = input; }}
          isOptionsDisabled={isOptionsDisabled}
          toggleFocusState={this.props.toggleFocusState} />
        <SelectOptions
          ref={(options) => { this.clickEventElement = options; }}
          onOptionUpdate={this.onChange}
          promotedOptions={this.props.promotedOptions}
          options={this.props.options}
          optionsCount={this.countOptions()}
          visible={this.state.optionsListVisible} />
      </SelectWrapper>
    );
  }
}

EditableSelectInput.propTypes = {
  isDisabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

EditableSelectInput.defaultProps = {
  isDisabled: false,
  options: [],
  onChange: () => {}
}

export default EditableSelectInput;
