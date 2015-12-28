import React from 'react';

export default class PostForm extends React.Component {
  render() {
    return (
      <div>
        <label>Email</label>
        <input type='text' />
        <label>Class</label>
        <select id="posting-form-course-select" name="Class">
          <option value=""></option>
        </select>
      </div>
    );
  }
}
