import Immutable from 'immutable';
import {
  SWITCH_SEMESTER,
  LOAD_SEMESTERS,
  LOAD_CATALOG,
  LOAD_POSTS,
  LOAD_REQUESTS,
  SUBMIT_POST,
  SUBMIT_REQUEST,
  DELETE_POST,
  DELETE_REQUEST
} from './actions';

const initialState = Immutable.fromJS(window.COURSE_MARKET_DATA);

function courseMarketApp(state = initialState, action) {
  var idx;

  switch (action.type) {

    case SWITCH_SEMESTER:
      return state.set('semester', action.semester);

    case LOAD_SEMESTERS:
      return state.set('semesters', Immutable.fromJS(window.COURSE_MARKET_DATA.semesters));

    case LOAD_CATALOG:
      return state
        .set('catalog', Immutable.fromJS(window.COURSE_MARKET_DATA.catalog))
        .set('posts', Immutable.List([])) // eslint-disable-line new-cap
        .set('requests', Immutable.List([]));  // eslint-disable-line new-cap

    case LOAD_POSTS:
      return state
        .set('posts', Immutable.fromJS(window.COURSE_MARKET_DATA.posts));

    case LOAD_REQUESTS:
      return state
        .set('requests', Immutable.fromJS(window.COURSE_MARKET_DATA.requests));

    case SUBMIT_POST:
      idx = state.get('posts').findIndex(p => p.get('courseId') === action.data.courseId);
      if (idx === -1) {
        return state
          .set('posts', state.get('posts').push(Immutable.fromJS({courseId: action.data.courseId, emails: [action.data.email]})));
      } else {
        return state
          .setIn(['posts', idx, 'emails'], state.getIn(['posts', idx, 'emails']).push(action.data.email));
      }
      break;

    case SUBMIT_REQUEST:
      idx = state.get('requests').findIndex(p => p.get('courseId') === action.data.courseId);
      if (idx === -1) {
        return state
          .set('requests', state.get('requests').push(Immutable.fromJS({courseId: action.data.courseId, emails: [action.data.email]})));
      } else {
        return state
          .setIn(['requests', idx, 'emails'], state.getIn(['requests', idx, 'emails']).push(action.data.email));
      }
      break;

    case DELETE_POST:
      idx = state.get('posts').findIndex(p => p.get('courseId') === action.data.courseId);
      state = state
          .setIn(['posts', idx, 'emails'], state.getIn(['posts', idx, 'emails']).filterNot(e => e === action.data.email));
      if (state.getIn(['posts', idx, 'emails']).size === 0) {
        return state
          .set('posts', state.get('posts').delete(idx));
      }
      break;

    case DELETE_REQUEST:
      idx = state.get('requests').findIndex(p => p.get('courseId') === action.data.courseId);
      state = state
          .setIn(['requests', idx, 'emails'], state.getIn(['requests', idx, 'emails']).filterNot(e => e === action.data.email));
      if (state.getIn(['requests', idx, 'emails']).size === 0) {
        return state
          .set('requests', state.get('requests').delete(idx));
      }
      break;

    default:
      return state;
  }
  return state;

}


export default courseMarketApp;
