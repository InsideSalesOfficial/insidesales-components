import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { get, filter } from 'lodash';

import { SearchMaterialIcon } from '../icons';
import { colors, typography, darkScrollbar } from '../styles';
import SelectOptions from '../SelectInput/SelectOptions';
import {
  checkDocumentEvent,
  openOptionsList,
  closeOptionsList,
  toggleOptionsList
} from '../SelectInput';

const TextInputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Caret = styled.div`
  position: absolute;
  right: 0;
  top: 62.5%;
  transform: translateY(-50%);
  width: 32px;
  cursor: pointer;
  height: 32px;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-left: 5px transparent solid;
    border-right: 5px transparent solid;
    border-top: 5px ${colors.black40} solid;
  }
`;

export const TextBox = styled.div`
  background-color: ${colors.white};
  border-bottom: thin solid ${colors.black40};
  border-color: ${(props) => {
    if (props.error) {
      return colors.red;
    } else if (props.isFocused) {
        return colors.green;
    } else if (props.disabled) {
      return colors.black20;
    } else if (props.lineColor) {
      return props.lineColor;
    }
    return colors.black40;
  }};
  border-width: ${(props) => {
    if (props.isFocused || props.error) {
      return '2px';
    }
    return '1px';
  }};
  box-sizing: border-box;
  cursor: ${(props) => {
        if (props.disabled) {
          return 'default';
        }
        return 'text';
      }};
  padding-top: 24px;
  padding-bottom: ${(props) => {
    if (props.error || props.isFocused) {
      return '7px';
    }

    return '8px';
  }};
  position: relative;
  transition: border-color 0.14s ease-in-out;
  width: 100%;

  &:hover {
    border-width: ${(props) => {
      if (props.disabled) {
        return '1px';
      }
      return '2px';
    }};
    padding-bottom: ${(props) => {
      if (props.disabled) {
        return '8px';
      }
      return '7px';
    }};
  }

  ${(props) => {
    if (props.disabled) {
      return `
        background-color: ${colors.black05};
        label {
          color: ${colors.black40};
        }
      `;
    }
  }}
`;

export const InputItem = styled.input`
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  height: 100%;
  max-height: 19px;
  padding: ${props => props.search ? '0 0 0 32px' : '0 1px'};
  resize: none;
  text-align: left;
  width: 100%;

  &:focus {
    outline: 0;
  }
  ${typography.subhead1}
  ${darkScrollbar}
`;

export const TextLabel = styled.label`
  color: ${(props) => {
      if (props.error) {
        return colors.red;
      } else if (props.isFocused) {
        return colors.green;
      } else if (props.labelColor) {
        return props.labelColor;
      } else {
        return colors.black60;
      }
    }};
  top: 0;
  left: 1px;
  position: absolute;
  transform: ${(props) => {
    if (props.open || props.isFocused) {
      return 'translateY(4px)';
    } else {
      return 'translateY(24px)';
    }
  }};
  transition: font-size 0.14s ease-in-out, transform 0.14s ease-in-out, color 0.14s ease-in-out;
  ${(props) => {
    if (props.open || props.isFocused) {
      return typography.caption
    } else {
      return typography.subhead1
    }
  }}
  line-height: 16px;
`;

export const TextInputHelper = styled.div`
  color: ${colors.black40};
  padding-top: 4px;
  ${typography.caption}
`;

export const TextInputError = styled(TextInputHelper)`
  color: ${colors.red};
`;

const SearchIcon = styled(SearchMaterialIcon)`
  position: absolute;
  top: 22px;
  left: 0;
`;

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      optionsListVisible: false,
      value: ""
    };
  }

  checkDocumentEvent = checkDocumentEvent.bind(this)

  openOptionsList = openOptionsList.bind(this)

  closeOptionsList = closeOptionsList.bind(this)

  toggleOptionsList = toggleOptionsList.bind(this)

  componentDidMount() {
    const {value} = this.props;

    if (value) {
      this.setState({
        value
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        value: ''
      });
    }
  }

  focused = () => {
    this.setState({
      focused: true
    })
  }

  blurred = () => {
    if(!this.state.cancelBlur) {
      this.setState({
        focused: false
      });
    }
  }

  renderHelperText = () => {
    const { error, helper, collapsed } = this.props;

    if(!error && !helper) {
      return null;
    }

    if (collapsed && !this.state.value && !this.state.focused && !error) {
      return null;
    }

    if (error) {
      return (<TextInputError>{error}</TextInputError>);
    }
    return (<TextInputHelper>{helper}</TextInputHelper>);
  }

  focusOnTextInput = () => {
    if (this.textInput !== document.activeElement) {
      this.textInputEl.focus();
    }
  }

  cancelBlur = (e) => {
    this.setState({
      cancelBlur: true
    });
  }

  removeCancelBlur = () => {
    this.setState({
      cancelBlur: false
    });
  }

  handleValueChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  onChange = (e) => {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      value: get(e, 'target.value', this.textInputEl.value),
    }, this.handleValueChange);
  }

  onDropDownSelect = (value) => {
    this.setState({
      value
    }, this.handleValueChange);
    this.closeOptionsList();
  }

  getPromotedOptions = () => {
    return this.state.value ? filter(this.props.options, o => o.value.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1) : [];
  }

  render() {
    const { label, name, error, disabled, collapsed, className, options, promotedOptions, lowPadding, labelColor, lineColor } = this.props;
    return (
      <TextInputWrapper className={className}>
        <TextBox
          onMouseUp={this.removeCancelBlur}
          onMouseDown={this.cancelBlur}
          onMouseLeave={this.removeCancelBlur}
          onClick={this.focusOnTextInput}
          isFocused={this.state.focused}
          error={error}
          open={this.state.value}
          disabled={disabled}
          lineColor={lineColor}
          collapsed={collapsed}>
          <InputItem
            type='text'
            onFocus={this.focused}
            onBlur={this.blurred}
            id={name}
            name={name}
            disabled={disabled}
            error={error}
            value={this.state.value}
            ref={(input) => { this.textInputEl = ReactDOM.findDOMNode(input); }}
            onChange={this.onChange}
            search={this.props.search} />
          {this.props.search &&
            <SearchIcon fill={colors.dustyGray} size={{ width: 22, height: 22 }} />
          }
          { !this.props.search &&
            <TextLabel isFocused={this.state.focused} labelColor={labelColor} open={this.state.value} htmlFor={name} error={error}>{label}</TextLabel>
          }
        </TextBox>
        { options && <Caret onClick={this.toggleOptionsList} className={'pb-caret'} />}
        {this.renderHelperText()}
        { options && <SelectOptions
          ref={(options) => { this.clickEventElement = options; }}
          onOptionUpdate={this.onDropDownSelect}
          promotedOptions={promotedOptions || this.getPromotedOptions() }
          options={options}
          optionsCount={options.length}
          visible={this.state.optionsListVisible}
          lowPadding={lowPadding}
        />}
      </TextInputWrapper>
    );
  }
}

TextInput.defaultProps = {
  name: 'Name',
  label: 'Label'
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helper: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  collapsed: PropTypes.bool,
  lowPadding: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
    disabled: PropTypes.bool
  })),
  promotedOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
    disabled: PropTypes.bool
  }))
};

export default TextInput;
