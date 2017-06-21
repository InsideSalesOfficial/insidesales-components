import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RangeSlider from './RangeSlider';

describe('RangeSlider', () => {
  
  it('componentWillMount should set value on state if there is an initialValue prop', () => {
    const initialValue = 2;
    const wrapper = shallow(<RangeSlider minValue={0} maxValue={100} initialValue={initialValue} onRangeUpdate={jest.fn()} />);
    
    expect(wrapper.state().value).toEqual(initialValue);

  });

  it('componentWillReceiveProps should set value on state when the initialValue prop changes', () => {
    const initialValue = 2;
    const changedValue = 5;
    
    const wrapper = shallow(<RangeSlider minValue={0} maxValue={100} initialValue={initialValue} onRangeUpdate={jest.fn()} />);

    expect(wrapper.state().value).toEqual(initialValue);

    wrapper.setProps({initialValue: changedValue});

    expect(wrapper.state().value).toEqual(changedValue);
  });

  it('setValue set value on the state and call the onRangeUpdate prop after setState', () => {
    const onRangeUpdateMock = jest.fn();
    const wrapper = shallow(<RangeSlider minValue={0} maxValue={100} onRangeUpdate={onRangeUpdateMock} />);
    
    const state = wrapper.state();

    expect(state.value).toEqual(0);
    
    const newValue = 5;
    wrapper.instance().setValue(newValue);

    setTimeout(() => {
      expect(state.value).toEqual(newValue);
      expect(onRangeUpdateMock).toHaveBeenCalledWith(newValue);
    }, 0)
  });
});

describe('RangeSlider Snapshots', () => {
  test('shows component without a label', () => {
    const tree = renderer.create(<RangeSlider minValue={0} maxValue={100} onRangeUpdate={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  })
  test('shows component with a label', () => {
    const tree = renderer.create(<RangeSlider minValue={0} maxValue={100} label={'label'} onRangeUpdate={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });
});
