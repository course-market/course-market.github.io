import React from 'react';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={this.props.id}>
          <i className="material-icons">search</i>
        </label>
        <div className="mdl-textfield__expandable-holder">
          <input
            className="mdl-textfield__input"
            type="text"
            id={this.props.id}
            onChange={this.props.onChange.bind(this)}/>
          <label className="mdl-textfield__label" htmlFor="sample-expandable">Expandable Input</label>
        </div>
      </div>
    );
  }
}
