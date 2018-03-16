import React from 'react';
import { mount } from 'enzyme';

import SelectInputLabelBox from './SelectInputLabelBox';

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

describe('SelectInputLabelBox', () => {
  let changeSpy;
  let wrapper;

  beforeEach(() => {
    changeSpy = jest.fn();
    wrapper = mount(<SelectInputLabelBox
      options={genericOptions}
      onChange={changeSpy}
    />)
  })
  
  it('should output the new value when selected', () => {
    wrapper.find('.pb-option').first().simulate('click');
    expect(changeSpy).toHaveBeenCalledWith('1')
    wrapper.find('.pb-option').last().simulate('click');
    expect(changeSpy).toHaveBeenCalledWith('11')
  });

  it('should open and close the options list', () => {
    wrapper.find('.select-input-label-box-value').simulate('click');
    expect(wrapper.state('optionsListVisible')).toBe(true)
    wrapper.find('.select-input-label-box-value').simulate('click');
    expect(wrapper.state('optionsListVisible')).toBe(false)
  });

  it('does not open when disabled', () => {
    wrapper = mount(<SelectInputLabelBox
      options={genericOptions}
      onChange={changeSpy}
      isDisabled
    />)
    wrapper.find('.select-input-label-box-value').simulate('click');
    expect(wrapper.state('optionsListVisible')).toBe(false)
  })
});