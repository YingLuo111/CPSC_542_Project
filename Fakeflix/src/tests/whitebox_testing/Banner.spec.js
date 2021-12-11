// CPSC 542 Software Verification and Validation
// Group Project

// Professor: David Heckathorn

// Team Members:
// Ying Luo,    yingluo_holiday@csu.fullerton.edu
// Xiaotiam Ma, xiaotianma@csu.fullerton.edu
// Yixiang Yan, yyx3333@csu.fullerton.edu

import React from 'react';
import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import Banner from '../../components/Banner/Banner';
import Adapter from 'enzyme-adapter-react-16'
import * as redux from 'react-redux'
import * as sinon from 'sinon';
import * as actions from "../../redux/modal/modal.actions";
import * as movieSelectors from "../../redux/movies/movies.selectors";
import * as seriesSelectors from "../../redux/series/series.selectors";
import * as utils from "../../utils";
import { Provider } from 'react-redux'
import { StaticRouter } from "react-router-dom"
import configureStore from 'redux-mock-store'
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

copyProps(window, global);

configure({ adapter: new Adapter() });

describe('Banner component testing', function() {

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
       
    var useSelectorStub, randomStub, useDispatchSpy, showModalDetailStub, selectTrendingMoviesStub, selectNetflixMoviesStub, selectNetflixSeriesStub;
    const initialState = {output:10}
    const mockStore = configureStore()
    let store
    beforeEach(function() {
        let dummyDispatch = sinon.spy();

        useSelectorStub = sinon.stub(redux, 'useSelector');
        useSelectorStub.returns(dummyDataFromIMDB);

        randomStub = sinon.stub(utils, "randomize");
        randomStub.returns(0);

        selectTrendingMoviesStub = sinon.stub(movieSelectors, 'selectTrendingMovies');
        selectTrendingMoviesStub.returns(dummyDataFromIMDB);

        selectNetflixMoviesStub = sinon.stub(movieSelectors, 'selectNetflixMovies');
        selectNetflixMoviesStub.returns(dummyDataFromIMDB);

        selectNetflixSeriesStub = sinon.stub(seriesSelectors, 'selectNetflixSeries');
        selectNetflixSeriesStub.returns(dummyDataFromIMDB);

        useDispatchSpy = sinon.spy(redux, 'useDispatch');
        useDispatchSpy.returned(dummyDispatch);

        showModalDetailStub = sinon.stub(actions, 'showModalDetail');
        store = mockStore(initialState)
    });

    afterEach(function() {
        useSelectorStub.restore();
        useDispatchSpy.restore();
        showModalDetailStub.restore();
        selectTrendingMoviesStub.restore();
        selectNetflixMoviesStub.restore();
        selectNetflixSeriesStub.restore();
        randomStub.restore();
    });

    it('Create movie banner', function() {
      const wrapper = mount(<StaticRouter><Provider store={store}><Banner type="movies" /></Provider></StaticRouter>); 
    //   console.log(wrapper.debug());
      expect(wrapper.find(".Banner")).to.have.length.least(1);
      expect(wrapper.find(".Banner__content")).to.have.length.least(1);
      expect(wrapper.find(".Banner__content--title")).to.have.length.least(1);
      expect(wrapper.find(".Banner__buttons")).to.have.length.least(1);
      expect(wrapper.find(".Banner__button")).to.have.length.least(1);
      expect(wrapper.find(".Banner__content--description")).to.have.length.least(1);
      expect(wrapper.find(".Banner__panel")).to.have.length.least(1);
      expect(wrapper.find(".Banner__bottom-shadow")).to.have.length.least(1);
    });

    it('Create tv banner', function() {
        const wrapper = mount(<StaticRouter><Provider store={store}><Banner type="series" /></Provider></StaticRouter>); 
        // console.log(wrapper.debug());
        expect(wrapper.find(".Banner")).to.have.length.least(1);
        expect(wrapper.find(".Banner__content")).to.have.length.least(1);
        expect(wrapper.find(".Banner__content--title")).to.have.length.least(1);
        expect(wrapper.find(".Banner__buttons")).to.have.length.least(1);
        expect(wrapper.find(".Banner__button")).to.have.length.least(1);
        expect(wrapper.find(".Banner__content--description")).to.have.length.least(1);
        expect(wrapper.find(".Banner__panel")).to.have.length.least(1);
        expect(wrapper.find(".Banner__bottom-shadow")).to.have.length.least(1);
      });
  });
  