import React from 'react';

export default class SemesterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 'spring_2016' };
  }

  onChange(e) {
    this.setState({ selected: e.target.value });
    this.props.onChange(e);
  }

  render() {
    let { semesters } = this.props;
    return (
      <div>
        <div className='inline mr1'>
          Semester:
        </div>
        <div className='inline'>
          <select onChange={this.onChange.bind(this)} value={this.state.selected}>
            {semesters.map((s, i) =>
                <option key={i} value={s}>{parse(s)}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

function parse(s) {
  return s.replace(/_/, ' ');
}
