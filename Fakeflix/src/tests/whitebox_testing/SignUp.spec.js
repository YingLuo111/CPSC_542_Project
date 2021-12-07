import { configure, mount, render, shallow} from 'enzyme';
import { expect } from 'chai';
import SignIn from '../../components/SignUp/SignUp';
import InputField from '../../components/InputField/InputField';
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react';
import * as redux from 'react-redux'
import * as sinon from 'sinon';
import * as Form from "react-hook-form";
import { Provider } from 'react-redux'
import { StaticRouter } from "react-router-dom"
import configureStore from 'redux-mock-store'
import { JSDOM } from 'jsdom';
import { motion } from "framer-motion";


const { window } = new JSDOM('<!doctype html><html><body></body></html>', { url: "http://localhost/" });

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

configure({ adapter: new Adapter() });

describe('Signup ponent testing', function() {

    var useSelectorStub, useRefSpy, useDispatchSpy;

    const initialState = {output:10}
    const mockStore = configureStore()


    let store
    beforeEach(function() {
        let dummyDispatch = sinon.spy();
        let dummyForm = sinon.spy();

        useSelectorStub = sinon.stub(redux, 'useSelector');
        useSelectorStub.returns("test");

        useRefSpy = sinon.spy(Form, 'useForm');
        useRefSpy.returned(dummyForm);

        useDispatchSpy = sinon.spy(redux, 'useDispatch');
        useDispatchSpy.returned(dummyDispatch);

        store = mockStore(initialState)
    });

    afterEach(function() {
        useSelectorStub.restore();
        useDispatchSpy.restore();
        useRefSpy.restore();
    });   

 
    it('Signup form should be in the document', function() {
  const wrapper = mount(<StaticRouter><Provider store={store}><motion.form /></Provider></StaticRouter>);
   expect(wrapper.find("form")).to.have.lengthOf(1);
});

    it('name field should have label', function() {
    const wrapper = mount(<StaticRouter><Provider store={store}><InputField placeholder="Your name" name="name" additionalClass="Yourname"/></Provider></StaticRouter>);
    expect(wrapper.find(".Yourname")).to.have.lengthOf(1);
    });
  
    it('name input should accept text', function() {
      const wrapper = mount(<StaticRouter><Provider store={store}><InputField placeholder="Your name" name="name" validationMessage="Please enter your name." additionalClass="name"/></Provider></StaticRouter>);
      expect(wrapper.find(".name")).to.have.lengthOf(1);
    });

    it('email field should have label', function() {
  const wrapper = mount(<StaticRouter><Provider store={store}><InputField placeholder="E-mail" name="email" additionalClass="E-mail"/></Provider></StaticRouter>);
  expect(wrapper.find(".E-mail")).to.have.lengthOf(1);
  });

     it('email input should accept text', function() {
    const wrapper = mount(<StaticRouter><Provider store={store}><InputField placeholder="E-mail" name="email" validationMessage="Please enter a valid email address." additionalClass="E-mail"/></Provider></StaticRouter>);
    expect(wrapper.find(".E-mail")).to.have.lengthOf(1);
  });

    it('password filed should have label', function() {
    const wrapper = mount(<StaticRouter><Provider store={store}><InputField placeholder="Password" name="password" additionalClass="Password"/></Provider></StaticRouter>);
    expect(wrapper.find(".Password")).to.have.lengthOf(1);
  });

    it('password input should accept text', function() {
    const wrapper = mount(<StaticRouter><Provider store={store}><InputField placeholder="Password" name="password" validationMessage="The password should have a length between 6 and 30 characters." additionalClass="password"/></Provider></StaticRouter>);
    expect(wrapper.find(".password")).to.have.lengthOf(1);
  });

    it('should be able to submit form', function() {
    const wrapper = mount(<StaticRouter><Provider store={store}><motion.button /></Provider></StaticRouter>);
    expect(wrapper.find("button")).to.have.lengthOf(1);
  });
});