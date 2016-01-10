import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <div className="mdl-logo">W&M Classified</div>
          <ul className="mdl-mini-footer__link-list">
            <li>
              <a href="https://github.com/wm-classified">
                made with <i className='fa fa-heart'></i> by the abrokwas
              </a>
            </li>
            <li>
              <a
                className='twitter-share-button'
                href='https://twitter.com/intent/tweet?text=Hello%20world'>
                Tweet</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}
