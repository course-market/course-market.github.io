import React from 'react';

export default class ListingItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { title, instructor } = this.props.data;
    return (
      <div>
        <div>{title}</div>
        <div>{instructor}</div>
      </div>
    );
  }

}
