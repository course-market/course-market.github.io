import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className='border-top-gray pad1 small clearfix bg-black white'>
        <div className='left'>
          made with <i className='fa fa-heart red'></i> by the abrokwas
        </div>
        <div className='right'>
          <a
            className='twitter-share-button'
            href='https://twitter.com/intent/tweet?text=Hello%20world'>
            Tweet
          </a>
        </div>
        <div className='right mr1 red'>
          <a href='https://github.com/course-market/course-market.github.io'>
            <i className='fa fa-code fa-2x white'></i>
          </a>
        </div>
      </div>
    );
  }
}
