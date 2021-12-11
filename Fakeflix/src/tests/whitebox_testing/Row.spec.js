// CPSC 542 Software Verification and Validation
// Group Project

// Professor: David Heckathorn

// Team Members:
// Ying Luo,    yingluo_holiday@csu.fullerton.edu
// Xiaotiam Ma, xiaotianma@csu.fullerton.edu
// Yixiang Yan, yyx3333@csu.fullerton.edu

import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import Row from '../../components/Row/Row';
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

describe('Row component testing', function() {
    let dummyDataFromIMDB = {
        data: [
            {
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
                video: false,
                vote_average: 7.2,
                vote_count: 3726
            }
        ],
        error: "",
        loading: false
    }

    var dummyIsLarge = true
    var dummySelector = {}
    var useSelectorStub, useRefSpy, useDispatchSpy;
    const initialState = {output:10}
    const mockStore = configureStore()
    let store

    beforeEach(function() {
        let dummyDispatch = sinon.spy();
        let dummyRef = sinon.spy();

        useSelectorStub = sinon.stub(redux, 'useSelector');
        useSelectorStub.returns(dummyDataFromIMDB);

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

    it('Create Row', function() {
      const wrapper = mount(<StaticRouter><Provider store={store}><Row genre="toprated" title="Top rated on Fakeflix" isLarge={dummyIsLarge} selector={dummySelector} /></Provider></StaticRouter>); 
    //   console.log(wrapper.debug());
      expect(wrapper.find(".Row__title")).to.have.length.least(1);
      expect(wrapper.find(".Row__poster--wrp")).to.have.length.least(1);
      expect(wrapper.find(".Row__slider--mask")).to.have.length.least(1);
      expect(wrapper.find(".Row__slider--mask-icon")).to.have.length.least(1);
    });
  });