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
            {emails.map((p, i) => <li key={i}><a href={`mailto:${p}`}>{p}</a></li>)}
          </ul>
        </div>
      </div>
    );
  }

}
