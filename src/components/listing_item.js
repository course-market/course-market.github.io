import React from 'react';

export default class ListingItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { details: false };
  }

  toggleDetails() {
    this.setState({ details: !this.state.details });
  }

  render() {
    return (
      <div className='' onClick={this.toggleDetails.bind(this)}>
        {this.state.details ? this.detailView() : this.briefView()}
      </div>
    );
  }

  briefView() {
    let { courseId, title } = this.props.data.courseDetails;
    return (
      <div>
        <div className=''>{courseId}</div>
        <div className=''>{title}</div>
      </div>
    );
  }

  detailView() {
    let { courseId, title, meetTimes, meetDays } = this.props.data.courseDetails;
    let emails = this.props.data.emails;
    return (
      <div className=''>
        <div className=''>
          <div className=''>{courseId}</div>
          <div className=''>{title}</div>
        </div>
        <div className=''>
          Time: {meetDays} {meetTimes}
        </div>
        <div>
          Requesters:
          <ul>
            {emails.map(this.email.bind(this))}
          </ul>
        </div>
      </div>
    );
  }

  email(address, i) {
    return (
      <li key={i} className=''>
        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--6-col'>
            {address}
          </div>
          <div className='mdl-cell mdl-cell--1-col'>
            <a href={`mailto:${address}`} onClick={e => e.stopPropagation()}>
                  <div className='fa fa-envelope'></div>
            </a>
          </div>
          <div className='mdl-cell mdl-cell--1-col'>
            <div
              className='fa fa-times'
              onClick={function(e) {
                this.props.onRemove({ courseId: this.props.data.courseId, email: address });
                e.stopPropagation();
              }.bind(this)}></div>
            </div>
        </div>
      </li>
    );
  }

}
