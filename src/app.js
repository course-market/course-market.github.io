import React from 'react';
import { createStore } from 'redux';
import Immutable from 'immutable';

import {
  fetchSemesters,
  fetchCatalog,
  fetchPosts,
  fetchRequests,
  submitPostAPI,
  submitRequestAPI,
  deletePostAPI,
  deleteRequestAPI
} from './api';
import {
  switchSemester,
  loadSemesters,
  loadCatalog,
  loadPosts,
  loadRequests,
  submitPost,
  submitRequest,
  deletePost,
  deleteRequest
} from './actions';
import courseMarketApp from './reducers';

// components
import Title from './components/title';
import SemesterSelect from './components/semester_select';
import Listing from './components/listing';
import Form from './components/form';
import Footer from './components/footer';
import AboutModal from './components/about_modal.js';

window.COURSE_MARKET_DATA = {
  semesters: [],
  catalog: [],
  posts: [],
  requests: []
};

// to ensure that this runs after the above
var store;
(function() {
  store = createStore(courseMarketApp, Immutable.fromJS(window.COURSE_MARKET_DATA));
})();

function loadSemester(semester) {
  store.dispatch(switchSemester(semester));
  return new Promise((resolve, reject) => {
    fetchCatalog(semester)
      .then(catalog => {
        window.COURSE_MARKET_DATA.catalog = catalog;
        window.COURSE_MARKET_HMAP = catalog.reduce((out, curr) => {
          out[curr.courseId] = curr;
          return out;
        }, {});
        store.dispatch(loadCatalog());
        return fetchPosts(semester);
      })
      .then(posts => {
        window.COURSE_MARKET_DATA.posts = posts;
        store.dispatch(loadPosts());
        return fetchRequests(semester);
      })
      .then(requests => {
        window.COURSE_MARKET_DATA.requests = requests;
        store.dispatch(loadRequests());
        resolve();
      })
      .catch(e => reject(e));
  });
}

fetchSemesters()
  .then(semesters => {
    window.COURSE_MARKET_DATA.semesters = semesters;
    store.dispatch(loadSemesters());

    let spring = semesters[semesters.length - 1];
    window.COURSE_MARKET_DATA.semester = spring;
    loadSemester(spring);
  })
  .catch(e => { throw e; });

export default class App extends React.Component {

  constructor() {
    super();
    this.state = store.getState().toJS();
    this.state.modalIsOpen = false;
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState(store.getState().toJS());
    });
  }

  switchSemester(e) {
    window.COURSE_MARKET_DATA.semester = e.target.value;
    loadSemester(e.target.value);
  }

  openAboutModal() {
    this.setState({ modalIsOpen: true });
  }

  closeAboutModal() {
    this.setState({ modalIsOpen: false });
  }

  submitPost(data) {
    store.dispatch(submitPost(data));
    submitPostAPI({
      semester: store.getState().get('semester'),
      email: data.email,
      courseId: data.courseId
    });
  }

  submitRequest(data) {
    store.dispatch(submitRequest(data));
    submitRequestAPI({
      semester: store.getState().get('semester'),
      email: data.email,
      courseId: data.courseId
    });
  }

  removePost(data) {
    store.dispatch(deletePost(data));
    deletePostAPI({
      semester: store.getState().get('semester'),
      email: data.email,
      courseId: data.courseId
    });
  }

  removeRequest(data) {
    store.dispatch(deleteRequest(data));
    deleteRequestAPI({
      semester: store.getState().get('semester'),
      email: data.email,
      courseId: data.courseId
    });
  }

  render() {
    return (
      <div className=''>

        {/* Header */}
        <div className='container clearfix'>
          <div className=''>
            <Title />
          </div>
          <div className='mb1 right'>
            <div className='inline mr1'>
              <SemesterSelect
                semesters={this.state.semesters}
                onChange={this.switchSemester} />
            </div>
            <div className='inline mr1'>|</div>
            <div className='inline active' onClick={this.openAboutModal.bind(this)}>
              About
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className='bg-gray border-top-blue'>
          <div className='container pady2'>

            <div className='clearfix'>
              <div className='col48 left'>
                <Listing
                  onRemove={this.removePost}
                  title='Posts'
                  list={this.state.posts} />
              </div>

              <div className='col48 right'>
                <Listing
                  onRemove={this.removeRequest}
                  title='Requests'
                  list={this.state.requests} />
              </div>
            </div>

          </div>
        </div>

        {/* Forms */}
        <div className='border-top-blue'>
          <div className='container pady2'>

            <div className='medium light border-bottom-gray'>
              Submit
            </div>

            <div className='clearfix'>
              <div className='col6 mlq'>
                <Form
                  title='Post Class'
                  onSubmit={this.submitPost}
                  catalog={this.state.catalog} />
              </div>
            </div>

            <div className='clearfix'>
              <div className='col6 mlq'>
                <Form
                  title='Request Class'
                  onSubmit={this.submitRequest}
                  catalog={this.state.catalog} />
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* About Modal */}
        <AboutModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeAboutModal.bind(this)}/>

      </div>
    );
  }

}
