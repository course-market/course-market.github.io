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
      <div className='clearfix listing-item mb1 pad0' onClick={this.toggleDetails.bind(this)}>
        {this.state.details ? this.detailView() : this.briefView()}
      </div>
    );
  }

  briefView() {
    let { courseId, title } = this.props.data.courseDetails;
    return (
      <div>
        <div className='col3'>{courseId}</div>
        <div className='col8'>{title}</div>
      </div>
    );
  }

  detailView() {
    let { courseId, title, meetTimes, meetDays } = this.props.data.courseDetails;
    let emails = this.props.data.emails;
    return (
      <div className='bg-blue pad0 rounded'>
        <div className='clearfix mb2'>
          <div className='col3'>{courseId}</div>
          <div className='col8'>{title}</div>
        </div>
        <div className='mb2'>
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
      <li key={i} className='clearfix'>
        <div className='clearfix'>
          <div className='inline mr1'>
            {address}
          </div>
          <a href={`mailto:${address}`} onClick={e => e.stopPropagation()}>
            <div className='fa fa-envelope inline email-icon mr1'></div>
          </a>
          <div
            className='fa fa-times inline close-icon mr1'
            onClick={function(e) {
              this.props.onRemove({ courseId: this.props.data.courseId, email: address });
              e.stopPropagation();
            }.bind(this)}></div>
        </div>
      </li>
    );
  }

}
