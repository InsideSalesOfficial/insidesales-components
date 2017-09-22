import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import TextareaInput from './TextareaInput';

describe('TextareaInput', () => {
  
  it('componentDidMount should set focusedOrHasValue on state if there are any children', () => {
    const initialValue = true;
    const wrapper = mount(<TextareaInput name="test">Has text here</TextareaInput>);
    
    expect(wrapper.state().focusedOrHasValue).toEqual(initialValue);

  });
});

describe('TextareaInput Snapshots', () => {
  test('shows component with a label', () => {
    const tree = renderer.create(<TextareaInput name="Name" label="test label" />);
    expect(tree).toMatchSnapshot();
  });
});
