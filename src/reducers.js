import R from 'ramda';
import { POST_COURSE, FILTER_LISTING, LOAD } from './actions';

const initialState = window.COURSE_MARKET_DATA;

function courseMarketApp(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return Object.assign({}, window.COURSE_MARKET_DATA);
    case POST_COURSE:
      return Object.assign({}, state, {
        posts: R.append(action.data, state.posts)
      });
    case FILTER_LISTING:
      return Object.assign({}, state, {
        courses: state.courses.filter(c => c.title.indexOf(action.search) > -1)
      });
    default:
      return state;
  }
}

export default courseMarketApp;
