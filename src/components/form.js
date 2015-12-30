import React from 'react';
import R from 'ramda';

const DEPARTMENT = 'department';
const COURSE = 'course';
const SECTION = 'section';
const EMAIL = 'email';

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      department: null,
      course: null,
      section: null,
      email: null,
      validEmail: false
    };
  }

  post() {
    this.props.postCourse(getCourse(
          this.props.courses, this.state.department, this.state.course, this.state.section));
  }

  onChange(select, e) {
    let data = { [select]: e.target.value };
    if (select === DEPARTMENT) {
      data.course = null;
      data.section = null;
    } else if (select === COURSE) {
      data.section = null;
    } else if (select === EMAIL) {
      data.validEmail = validateEmail(e.target.value);
    }
    this.setState(data);
  }

  render() {
    let courses, sections, departments;
    departments = getDepartments(this.props.courses);
    if (this.state.departments !== null) {
      courses = getCourses(this.props.courses, this.state.department);
    }
    if (this.state.course != null) {
      sections = getSections(this.props.courses, this.state.department, this.state.course);
    }
    return (
      <div className='mb5'>

        <div className='medium blue border-bottom-gray mb2'>{this.props.title}</div>

        <div className='mb1 clearfix'>
          <div className='col3'>Department:</div>
          <select
            className='col7'
            onChange={this.onChange.bind(this, DEPARTMENT)}>
            <option value={null}> -- select a department -- </option>
            {departments.map((d, i) => <option key={i}>{d}</option>)}
          </select>
        </div>

        {this.state.department !== null && <div className='mb1 clearfix'>
          <div className='col3'>Course:</div>
          <select
            className='col7'
            onChange={this.onChange.bind(this, COURSE)}>
            <option value={null}> -- select a course -- </option>
            {courses.map((c, i) => <option key={i} value={c.id}>{c.id} - {c.title}</option>)}
          </select>
        </div>}

        {this.state.course !== null && <div className='mb1 clearfix'>
          <div className='col3'>Section:</div>
          <select
            className='col7'
            onChange={this.onChange.bind(this, SECTION)}>
            <option value={null}> -- select a section-- </option>
            {sections.map((s, i) => <option key={i} value={s.number}>{s.meetDays} - {s.meetTimes}</option>)}
          </select>
        </div>}

        {this.state.section != null && <div className='mb1 clearfix'>
          <div className='col3'>WM Email:</div>
          <input type='text' className={'border-gray col7' + (this.state.validEmail ? ' valid' : ' invalid')} onChange={this.onChange.bind(this, EMAIL)} />
        </div>}

        {this.state.validEmail && <div className='mb1 clearfix center'>
          <button onClick={this.post.bind(this)} className='button rounded border-blue'>Post</button>
        </div>}

      </div>
    );
  }

}

var getDepartments = (courses) =>
    R.uniq(courses.map(c => c.courseId.split(' ')[0]));

var getCourses = (courses, department) =>
    courses
      .filter(c => c.courseId.indexOf(department) > -1)
      .map(c => {
        return {
          id: c.courseId.split(' ')[1],
          title: c.title
        };
      });


var getSections = (courses, department, course) =>
    courses
      .filter(c => c.courseId.indexOf(department) > -1 && c.courseId.indexOf(course) > -1)
      .map(c => {
        return {
          number: c.courseId.split(' ')[2],
          meetDays: c.meetDays,
          meetTimes: c.meetTimes
        };
      });

var getCourse = (courses, department, course, section) =>
    courses.filter(c =>
        c.courseId.indexOf(department) > -1 &&
        c.courseId.indexOf(course) > -1 &&
        c.courseId.indexOf(section) > -1)[0];

function validateEmail(email) {
  if (email === null || email === '') {
    return false;
  }
  var re = /^[a-zA-Z]+@(email.)?wm.edu$/;
  return re.test(email);
}
