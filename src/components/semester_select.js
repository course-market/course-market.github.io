import React from 'react';

export default class SemesterSelect extends React.Component {
  render() {
    let { semesters } = this.props;
    return (
      <div>
        <select onChange={this.props.onChange.bind(this)}>
          {semesters.map((s, i) =>
              <option key={i} value={s}>{parse(s)}</option>)}
        </select>
      </div>
    );
  }
}

function parse(s) {
  return s.replace(/_/, ' ');
}
