// CPSC 542 Software Verification and Validation
// Group Project

// Professor: David Heckathorn

// Team Members:
// Ying Luo,    yingluo_holiday@csu.fullerton.edu
// Xiaotiam Ma, xiaotianma@csu.fullerton.edu
// Yixiang Yan, yyx3333@csu.fullerton.edu

import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import InputField from '../../components/InputField/InputField';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('InputField component testing', function() {
  it('renders Input Field', function() {
    const wrapper = shallow(<InputField type="type" placeholder="placeholder" name="name" additionalClass="additionalClass" validationMessage="message" validation="validation" />); 
    expect(wrapper.find(".additionalClass")).to.have.lengthOf(1);
  });
});