import Immutable from 'immutable';
import {
  SWITCH_SEMESTER,
  SUBMIT_POST,
  SUBMIT_REQUEST,
  LOAD_SEMESTERS,
  LOAD_CATALOG,
  LOAD_POSTS,
  LOAD_REQUESTS,
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
      return state.set('catalog', Immutable.fromJS(window.COURSE_MARKET_DATA.catalog));

    case LOAD_POSTS:
      return state.set('posts', Immutable.fromJS(window.COURSE_MARKET_DATA.posts));

    case LOAD_REQUESTS:
      return state.set('requests', Immutable.fromJS(window.COURSE_MARKET_DATA.requests));

    case SUBMIT_POST:
      idx = state.get('posts').findIndex(p => p.courseId === action.data.courseId);
      if (idx === -1) {
        return state.set('posts', state.get('posts').push(Immutable.fromJS({courseId: action.data.courseId, emails: [action.data.email]})));
      } else {
        return state.setIn(['posts', idx, 'emails'], state.getIn('posts', idx, 'emails').push(action.data.email));
      }
      break;

    case SUBMIT_REQUEST:
      idx = state.get('requests').findIndex(p => p.get('courseId') === action.data.courseId);
      if (idx === -1) {
        return state.set('requests', state.get('requests').push(Immutable.fromJS({courseId: action.data.courseId, emails: [action.data.email]})));
      } else {
        return state.setIn(['requests', idx, 'emails'], state.getIn('requests', idx, 'emails').push(action.data.email));
      }
      break;

    default:
      return state;
  }
  return state;

}


export default courseMarketApp;
