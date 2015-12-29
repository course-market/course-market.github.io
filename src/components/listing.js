import React from 'react';
import ListingItem from './listing_item';
import SearchBar from './search_bar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Listing extends React.Component {

  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  onChange(e) {
    let query = e.target.value;
    this.setState({ query });
  }

  render() {
    let list = filter(this.props.list, this.state.query);
    return (
      <div>
        <div className='medium blue border-bottom-gray mb2'>{this.props.title}</div>
        <div className='mb2'>
          <SearchBar onChange={this.onChange.bind(this)} />
        </div>
        <div>
          <ReactCSSTransitionGroup
            transitionName='list-fade'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {list.map(this.renderItem)}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }

  renderItem(data, i) {
    return <ListingItem data={data} key={i} />;
  }

}

var filter = (list, query) =>
    list
      .map(c => {
        c.courseDetails = window.COURSE_MARKET_HMAP[c.courseId];
        return c;
      })
      .filter(c => c.courseDetails.title.toLowerCase().indexOf(query.toLowerCase()) > -1);
