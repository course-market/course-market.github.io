import React from 'react';

export default class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input
          type='text'
          className='col12'
          onChange={this.props.onChange.bind(this)} />
      </div>
    );
  }
}
