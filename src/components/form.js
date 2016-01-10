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

  submit() {
    let courseId = getCourse(this.props.catalog, this.state.department,
        this.state.course, this.state.section);
    this.props.onSubmit({ courseId, email: this.state.email });
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
    departments = getDepartments(this.props.catalog);
    if (this.state.departments !== null) {
      courses = getCourses(this.props.catalog, this.state.department);
    }
    if (this.state.course != null) {
      sections = getSections(this.props.catalog, this.state.department, this.state.course);
    }
    return (
      <div className='mdl-card mdl-shadow--2dp'>

        <div className={`mdl-card__title ${this.props.title.replace(' ', '-')}-title`}>
          <h2 className='mdl-card__title-text'>{this.props.title}</h2>
        </div>

        <div className='mld-card__supporting-text'>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input is-invalid"
              type="text"
              id="email-input"
              onChange={this.onChange.bind(this, EMAIL)} />
            <label className="mdl-textfield__label" htmlFor="email-input">Email</label>
          </div>
        </div>

        <div className='mdl-card__actions mdl-card--border'>

          <div className=''>
            <div className=''>Department:</div>
            <select
              className=''
              onChange={this.onChange.bind(this, DEPARTMENT)}>
              <option value={null}> -- select a department -- </option>
              {departments.map((d, i) => <option key={i}>{d}</option>)}
            </select>
          </div>

          {this.state.department !== null && <div className=''>
            <div className=''>Course:</div>
            <select
              className=''
              onChange={this.onChange.bind(this, COURSE)}>
              <option value={null}> -- select a course -- </option>
              {courses.map((c, i) => <option key={i} value={c.id}>{c.id} - {c.title}</option>)}
            </select>
          </div>}

          {this.state.course !== null && <div className=''>
            <div className=''>Section:</div>
            <select
              className=''
              onChange={this.onChange.bind(this, SECTION)}>
              <option value={null}> -- select a section-- </option>
              {sections.map((s, i) =>
                  <option key={i} value={s.number}>{s.meetDays} - {s.meetTimes}</option>)}
            </select>
          </div>}

          {this.state.validEmail && <div className=''>
            <button
              onClick={this.submit.bind(this)}
              className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'>Post</button>
          </div>}

        </div>

      </div>
    );
  }

}

var getDepartments = (catalog) =>
    R.uniq(catalog.map(c => c.courseId.split(' ')[0]));

var getCourses = (catalog, department) =>
    catalog
      .filter(c => c.courseId.indexOf(department) > -1)
      .map(c => {
        return {
          id: c.courseId.split(' ')[1],
          title: c.title
        };
      });


var getSections = (catalog, department, course) =>
    catalog
      .filter(c => c.courseId.indexOf(department) > -1 && c.courseId.indexOf(course) > -1)
      .map(c => {
        return {
          number: c.courseId.split(' ')[2],
          meetDays: c.meetDays,
          meetTimes: c.meetTimes
        };
      });

var getCourse = (catalog, department, course, section) =>
    catalog.filter(c =>
        c.courseId.indexOf(department) > -1 &&
        c.courseId.indexOf(course) > -1 &&
        c.courseId.indexOf(section) > -1)[0].courseId;

function validateEmail(email) {
  if (email === null || email === '') {
    return false;
  }
  var re = /^[a-zA-Z]+@(email.)?wm.edu$/;
  return re.test(email);
}
