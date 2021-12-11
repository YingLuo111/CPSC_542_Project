// CPSC 542 Software Verification and Validation
// Group Project

// Professor: David Heckathorn

// Team Members:
// Ying Luo,    yingluo_holiday@csu.fullerton.edu
// Xiaotiam Ma, xiaotianma@csu.fullerton.edu
// Yixiang Yan, yyx3333@csu.fullerton.edu

import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import Navbar from '../../components/Navbar/Navbar';
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react';
import * as redux from 'react-redux'
import * as sinon from 'sinon';
import { Provider } from 'react-redux'
import { StaticRouter } from "react-router-dom"
import configureStore from 'redux-mock-store'
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>', { url: "http://localhost/" });

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

configure({ adapter: new Adapter() });

describe('Navbar component testing', function() {
       
    var useSelectorStub, useRefSpy, useDispatchSpy;
    const initialState = {output:10}
    const mockStore = configureStore()
    let store
    beforeEach(function() {
        let dummyDispatch = sinon.spy();
        let dummyRef = sinon.spy();

        useSelectorStub = sinon.stub(redux, 'useSelector');
        useSelectorStub.returns("test");

        useRefSpy = sinon.spy(React, 'useRef');
        useRefSpy.returned(dummyRef);

        useDispatchSpy = sinon.spy(redux, 'useDispatch');
        useDispatchSpy.returned(dummyDispatch);

        store = mockStore(initialState)
    });

    afterEach(function() {
        useSelectorStub.restore();
        useDispatchSpy.restore();
        useRefSpy.restore();
    });

    it('Create Navbar', function() {
      const wrapper = mount(<StaticRouter><Provider store={store}><Navbar /></Provider></StaticRouter>); 
      // console.log(wrapper.debug());
      expect(wrapper.find(".Navbar__logo")).to.have.length.least(1);
      expect(wrapper.find(".Navbar__navlinks")).to.have.length.least(1);
      expect(wrapper.find(".Navbar__secondarynav")).to.have.length.least(1);
      expect(wrapper.find(".Navbar__navitem")).to.have.length.least(1);
      expect(wrapper.find(".Navbar__navprofile--content")).to.have.length.least(1);
      expect(wrapper.find(".Navbar__navlinks--link")).to.have.length.least(1);
    });
  });