import { mount } from 'enzyme';
import RadioList from './';
import React from 'react';

describe('RadioList', () => {
  let wrapper;
  let value;
  let name = 'test-radio';
  let radios;
  beforeEach(() => {
    radios = [
      {
        value: 1,
        id: 'radio-1',
        label: 'radio 1'
      },
      {
        value: 2,
        id: 'radio-2',
        label: 'radio 2'
      },
      {
        value: 3,
        id: 'radio-3',
        label: 'radio 3'
      },
    ];
    value = undefined;

    wrapper = mount(<RadioList
      radios={radios}
      value={value}
      onChange={(newVal) => {
        value = newVal
      }}
      name={name}
    />);
  });

  it('should output the new value when changed', () => {
    wrapper.find('input').forEach((node, index) => {
      node.simulate('change');
      expect(value).toBe(radios[index].value);
    });
  });
});
 