import React from 'react';
import R from 'ramda';

const DEPARTMENT = 'department';
const COURSE = 'course';
const SECTION = 'section';

export default class PostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      department: null,
      course: null,
      section: null
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
      <div>

        <div>
          <label>Email</label>
          <input type='text' />
        </div>

        <div>
          <label>Department</label>
          <select id='posting-form-department-select' onChange={this.onChange.bind(this, DEPARTMENT)}>
            {departments.map((d, i) => <option key={i}>{d}</option>)}
          </select>
        </div>

        {this.state.department !== null && <div>
          <label>Course</label>
          <select id='posting-form-class-select' onChange={this.onChange.bind(this, COURSE)}>
            {courses.map((c, i) => <option key={i} value={c.id}>{c.id} - {c.title}</option>)}
          </select>
        </div>}

        {this.state.course !== null && <div>
          <label>Section</label>
          <select id='posting-form-section-select' onChange={this.onChange.bind(this, SECTION)}>
            {sections.map((s, i) => <option key={i} value={s.number}>{s.meetDays} - {s.meetTimes}</option>)}
          </select>
        </div>}

        {this.state.section !== null && <div>
          <button onClick={this.post.bind(this)}>Post</button>
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
