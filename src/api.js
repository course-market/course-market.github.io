/**
 * API wrapper
 */

const URL = 'http://ec2-54-173-94-238.compute-1.amazonaws.com:8080';
//const URL = 'http://localhost:8080'; // for development

export function submitPostAPI(data) {
  return new Promise((resolve, reject) => {
    let { semester } = data;
    fetch(`${URL}/submit/post/${semester}`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    })
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
}

export function submitRequestAPI(data) {
  return new Promise((resolve, reject) => {
    let { semester } = data;
    fetch(`${URL}/submit/request/${semester}`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    })
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
}

export function fetchPosts(semester) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/posts/${semester}`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
}

export function fetchRequests(semester) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/requests/${semester}`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
}

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
