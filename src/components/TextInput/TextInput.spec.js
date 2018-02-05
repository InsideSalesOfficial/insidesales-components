import React from 'react';
import { mount, shallow } from 'enzyme';
import TextInput, { TextInputError, TextInputHelper } from './TextInput';

describe('TextInput', () => {

  const options = [
    {
      label: 'Foo',
      value: 'Foo'
    }
  ];
  
  it('componentDidMount should set value on state if there is a value prop', () => {
    const text = 'Has text here';
    const wrapper = mount(<TextInput name="test" value={text} />);

    expect(wrapper.state().value).toBe(text);
  });

  it('focused func sets focused state to true', () => {
    const wrapper = shallow(<TextInput name="test" />);

    expect(wrapper.state().focused).toBeFalsy();

    wrapper.instance().focused();
    expect(wrapper.state().focused).toBeTruthy();
  });

  it('blurred func sets focused state to false', () => {
    const wrapper = shallow(<TextInput name="test" />);

    wrapper.setState({
      focused: true
    });
    expect(wrapper.state().focused).toBeTruthy();

    wrapper.instance().blurred();
    expect(wrapper.state().focused).toBeFalsy();
  });

  it('renderHelperText should return null if component is collapsed, has no value, and has no error', () => {
    const wrapper = shallow(<TextInput name="test" collapsed/>);
    
    const helperText = wrapper.instance().renderHelperText();

    expect(helperText).toBeFalsy();
  });

  it('renderHelperText should return TextInputError if there is an error', () => {
    const error = 'some error';
    const wrapper = shallow(<TextInput name="test" error={error}/>);
    
    const helperText = wrapper.instance().renderHelperText();

    expect(helperText).toEqual(<TextInputError>{error}</TextInputError>);
  });

  it('renderHelperText should return TextInputHelper if component is not collapsed.', () => {
    const helperTextString = 'help me!';
    const wrapper = shallow(<TextInput name="test" helper={helperTextString}/>);
    
    const helperText = wrapper.instance().renderHelperText();

    expect(helperText).toEqual(<TextInputHelper>{helperTextString}</TextInputHelper>);
  });

  it('focusOnTextInput should set focused state to true', () => {
    const wrapper = mount(<TextInput name="test" />);

    expect(wrapper.state().focused).toBeFalsy();

    wrapper.instance().focusOnTextInput();
    setTimeout(() => {
      expect(wrapper.state().focused).toBeTruthy();
    }, 0);
  });

  it('onContainerMouseDown sets cancelBlur to true on state', () => {
    const wrapper = mount(<TextInput name="test" />);
    
    expect(wrapper.state().cancelBlur).toBeFalsy();

    wrapper.instance().focusOnTextInput();
    
    wrapper.instance().cancelBlur();
    expect(wrapper.state().cancelBlur).toBeTruthy();
  });

  it('onContainerMouseUp sets cancelBlur to true on state', () => {
    const wrapper = mount(<TextInput name="test" />);
  
    wrapper.instance().focusOnTextInput();

    wrapper.instance().cancelBlur();
    expect(wrapper.state().cancelBlur).toBeTruthy();
    
    wrapper.instance().removeCancelBlur();
    expect(wrapper.state().cancelBlur).toBeFalsy();
  });

  it('onChange should set the state with the new value from the input', () => {
    jest.useFakeTimers();
    const onChangePropSyp = jest.fn();
    const preventSpy = jest.fn();
    const newValue = 'Some text';
    const event = {
      preventDefault: preventSpy,
      target: {
        value: newValue
      }
    };

    const wrapper = mount(<TextInput name="test" onChange={onChangePropSyp} />);
    
    expect(wrapper.state().value).toBeFalsy();
    
    wrapper.instance().onChange(event);
    
    setTimeout(() => {
      expect(preventSpy).toHaveBeenCalled();
      expect(wrapper.state().value).toEqual(newValue);
      expect(onChangePropSyp).toHaveBeenCalledWith(newValue);
    }, 0);

    jest.runAllTimers();
  });

  it('should toggle the options when the caret is clicked', () => {
    jest.useFakeTimers();
    const onChangePropSpy = jest.fn();
    const wrapper = mount(<TextInput name="test" onChange={onChangePropSpy} options={options} />);

    expect(wrapper.find('SelectOptions').props().visible).toBe(false);

    wrapper.find('.pb-caret').simulate('click'); 
    expect(wrapper.find('SelectOptions').props().visible).toBe(true)

    wrapper.find('.pb-caret').simulate('click');
    expect(wrapper.find('SelectOptions').props().visible).toBe(false);
  });

  it('should select an option and add it to the text field', () => {
    let value;
    const wrapper = mount(<TextInput name="test" onChange={(x) => value = x} options={options} />);

    wrapper.find('.pb-caret').simulate('click');
    wrapper.find('.pb-option').simulate('click');
    
    expect(value).toBe(options[0].value.toString());
  });

  it('should show promoted options', () => {
    const wrapper = mount(<TextInput name="test" onChange={(x) => {}} value={options[0].value} options={options} />);
    wrapper.find('.pb-caret').simulate('click');

    expect(wrapper.find('.pb-option').length).toBe(2);
  });
});

