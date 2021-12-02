import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import Poster from '../../components/Poster/Poster';
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

describe('Poster component testing', function() {
    var dummyItem = {
        adult: false,
        backdrop_path: "/70nxSw3mFBsGmtkvcs91PbjerwD.jpg",
        genre_ids: [878,28,12],
        id: 580489,
        isFavourite: false,
        media_type: "movie",
        original_language: "en",
        original_title: "Venom: Let There Be Carnage",
        overview: "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
        popularity: 13071.277,
        poster_path: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
        release_date: "2021-09-30",
        title: "Venom: Let There Be Carnage",
        name: "Venom: Let There Be Carnage",
        original_name: "Venom: Let There Be Carnage",
        fallbackTitle: "Venom: Let There Be Carnage",
        video: false,
        vote_average: 7.2,
        vote_count: 3726,
        item: {
            adult: false,
            backdrop_path: "/70nxSw3mFBsGmtkvcs91PbjerwD.jpg",
            genre_ids: [878,28,12],
            id: 580489,
            isFavourite: false,
            media_type: "movie",
            original_language: "en",
            original_title: "Venom: Let There Be Carnage",
            overview: "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
            popularity: 13071.277,
            poster_path: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
            release_date: "2021-09-30",
            title: "Venom: Let There Be Carnage",
            name: "Venom: Let There Be Carnage",
            original_name: "Venom: Let There Be Carnage",
            fallbackTitle: "Venom: Let There Be Carnage",
            video: false,
            vote_average: 7.2,
            vote_count: 3726  
        }
    }

    var useDispatchSpy;
    const initialState = {output:10}
    const mockStore = configureStore()
    let store

    beforeEach(function() {
        let dummyDispatch = sinon.spy();

        useDispatchSpy = sinon.spy(redux, 'useDispatch');
        useDispatchSpy.returned(dummyDispatch);

        store = mockStore(initialState)
    });

    afterEach(function() {
        useDispatchSpy.restore();
    });

    it('Create Poster', function() {
      const wrapper = mount(<StaticRouter><Provider store={store}><Poster item={dummyItem} /></Provider></StaticRouter>); 
    //   console.log(wrapper.debug());
      expect(wrapper.find(".Poster")).to.have.length.least(1);
      expect(wrapper.find(".Poster__info")).to.have.length.least(1);
      expect(wrapper.find(".Poster__info--iconswrp")).to.have.length.least(1);
      expect(wrapper.find(".Poster__info--icon")).to.have.length.least(1);
      expect(wrapper.find(".Poster__info--genres")).to.have.length.least(1);
    });
  });