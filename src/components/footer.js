import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className='border-top-gray pad1 small'>
        <div className='left'>
          made with <i className='fa fa-heart red icon-small'></i> by the abrokwas
        </div>
        <div className='right'>
          <a
            className="twitter-share-button"
            href="https://twitter.com/intent/tweet?text=Hello%20world">
            Tweet
          </a>
        </div>
      </div>
    );
  }
}
