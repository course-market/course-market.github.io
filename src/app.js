import React from 'react';
import { take } from 'ramda';
import { createStore } from 'redux';
import PostForm from './components/post_form';
import Listing from './components/listing';
import { load, postCourse } from './actions';
import courseMarketApp from './reducers';

window.COURSE_MARKET_DATA = {
  courses: [],
  listing: [],
  wanted: []
};

// to ensure that this runs after the above
var store;
(function() {
  store = createStore(courseMarketApp, window.COURSE_MARKET_DATA);
})();

fetch('http://localhost:3000/data')
  .then(res => res.json())
  .then(data => {
    window.COURSE_MARKET_DATA.courses = data;
    window.COURSE_MARKET_DATA.listing = take(10, data);
    store.dispatch(load());
  })
  .catch(e => { throw e; });


export default class App extends React.Component {

  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  render() {
    return (
      <div>
        <Listing list={this.state.listing} />
        <PostForm
          postCourse={(data) => store.dispatch(postCourse(data))}
          courses={this.state.courses} />
      </div>
    );
  }

}
