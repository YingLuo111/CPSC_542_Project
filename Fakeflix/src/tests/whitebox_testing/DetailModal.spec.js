// CPSC 542 Software Verification and Validation
// Group Project

// Professor: David Heckathorn

// Team Members:
// Ying Luo,    yingluo_holiday@csu.fullerton.edu
// Xiaotiam Ma, xiaotianma@csu.fullerton.edu
// Yixiang Yan, yyx3333@csu.fullerton.edu

import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import DetailModal from '../../components/DetailModal/DetailModal';
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react';
import * as redux from 'react-redux'
import * as sinon from 'sinon';
import { Provider } from 'react-redux'
import { StaticRouter } from "react-router-dom"
import configureStore from 'redux-mock-store'
import { JSDOM } from 'jsdom';
import { selectModalContent, selectModalState } from "../../redux/modal/modal.selectors";

const { window } = new JSDOM('<!doctype html><html><body></body></html>', { url: "http://localhost/" });

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

configure({ adapter: new Adapter() });

describe('DetailModal component testing', function() {

    let dummyModalContent = {
                adult: false,
                backdrop_path: "/70nxSw3mFBsGmtkvcs91PbjerwD.jpg",
                genre_ids: [878,28,12],
                id: 580489,
                isFavorite: false,
                media_type: "movie",
                original_language: "en",
                original_title: "Venom: Let There Be Carnage",
                overview: "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
                popularity: 13071.277,
                poster_path: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
                release_date: "2021-09-30",
                title: "Venom: Let There Be Carnage",
                fallbackTitle: "Venom: Let There Be Carnage",
                video: false,
                vote_average: 7.2,
                vote_count: 3726
            }
       
    var useSelectorStub, useRefSpy, useDispatchSpy;
    const initialState = {output:10}
    const mockStore = configureStore()
    let store
    beforeEach(function() {
        let dummyDispatch = sinon.spy();
        let dummyRef = sinon.spy();

        useSelectorStub = sinon.stub(redux, 'useSelector');
        useSelectorStub.withArgs(selectModalState).returns(false);
        useSelectorStub.withArgs(selectModalContent).returns(dummyModalContent);

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

    it('Create DetailModal', function() {
      const wrapper = mount(<StaticRouter><Provider store={store}><DetailModal /></Provider></StaticRouter>); 
    //   console.log(wrapper.debug());
      expect(wrapper.find(".Modal__image--wrp")).to.have.length.least(1);
      expect(wrapper.find(".Modal__image--shadow")).to.have.length.least(1);
      expect(wrapper.find(".Modal__image--img")).to.have.length.least(1);
      expect(wrapper.find(".Modal__image--buttonswrp")).to.have.length.least(1);
      expect(wrapper.find(".Modal__image--button")).to.have.length.least(1);
      expect(wrapper.find(".Modal__info--wrp")).to.have.length.least(1);
    });
  });