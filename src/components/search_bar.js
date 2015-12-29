import React from 'react';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='clearfix'>
        <i className='fa fa-search fa-2x col1 mr1 gray'></i>
        <input
          type='text'
          className={'col10'}
          onChange={this.props.onChange.bind(this)} />
      </div>
    );
  }
}
