/**
 * API wrapper
 */

const URL = 'http://ec2-54-173-94-238.compute-1.amazonaws.com:8080';
//const URL = 'http://localhost:8080'; // for development

/**
 * Submit a post
 *
 * @param data
 * @param {String} data.semester
 * @param {String} data.email
 * @param {String} data.courseId }
 */
export function submitPostAPI(data) {
  return new Promise((resolve, reject) => {
    let { semester } = data;
    fetch(`${URL}/post/submit/${semester}`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    })
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
}

/**
 * Submit a request
 *
 * @param data
 * @param {String} data.semester
 * @param {String} data.email
 * @param {String} data.courseId
 */
export function submitRequestAPI(data) {
  return new Promise((resolve, reject) => {
    let { semester } = data;
    fetch(`${URL}/request/submit/${semester}`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    })
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
}

/**
 * Delete a post
 *
 * @param data
 * @param {String} data.semester
 * @param {String} data.email
 * @param {String} data.courseId
 */
export function deletePostAPI(data) {
  return new Promise((resolve, reject) => {
    let { semester } = data;
    let courseId = encodeURIComponent(data.courseId);
    let email = encodeURIComponent(data.email);
    fetch(`${URL}/post/delete/${semester}/${courseId}/${email}`, {method: 'DELETE'})
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
}

/**
 * Delete a request
 *
 * @param data
 * @param {String} data.semester
 * @param {String} data.email
 * @param {String} data.courseId
 */
export function deleteRequestAPI(data) {
  return new Promise((resolve, reject) => {
    let { semester } = data;
    let courseId = encodeURIComponent(data.courseId);
    let email = encodeURIComponent(data.email);
    fetch(`${URL}/request/delete/${semester}/${courseId}/${email}`, {method: 'DELETE'})
      .then(res => resolve(res))
      .then(e => reject(e));
  });
}

/**
 * @param {String} semester
 */
export function fetchPosts(semester) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/posts/${semester}`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
}

/**
 * @param {String} semester
 */
export function fetchRequests(semester) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/requests/${semester}`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
}

/**
 * @param {String} semester
 */
export function fetchCatalog(semester) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/catalog/${semester}`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
}

export function fetchSemesters() {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/catalog/semesters`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
}
