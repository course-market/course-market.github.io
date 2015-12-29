import React from 'react';
import ListingItem from './listing_item';
import SearchBar from './search_bar';

export default class PostListing extends React.Component {

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
      <div className='mb4'>
        <div className='medium blue border-bottom-gray mb2'>Posts</div>
        <div className='mb2'>
          <SearchBar onChange={this.onChange.bind(this)} />
        </div>
        <div>
          {list.map(this.renderItem)}
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
