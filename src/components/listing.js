import React from 'react';
import ListingItem from './listing_item';

export default class Listing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.list.map(this.renderItem)}
      </div>
    );
  }

  renderItem(data, i) {
    return <ListingItem data={data} key={i} />;
  }
}
