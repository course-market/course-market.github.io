/* eslint no-multi-spaces: [0] */
export const SWITCH_SEMESTER = 'SWITCH_SEMESTER';
export const LOAD_SEMESTERS  = 'LOAD_SEMESTERS';
export const LOAD_CATALOG    = 'LOAD_CATALOG';
export const LOAD_POSTS      = 'LOAD_POSTS';
export const LOAD_REQUESTS   = 'LOAD_REQUESTS';
export const SUBMIT_POST     = 'SUBMIT_POST';
export const SUBMIT_REQUEST  = 'SUBMIT_REQUEST';

export function switchSemester(semester) {
  return { type: SWITCH_SEMESTER, semester };
}

export function loadSemesters() {
  return { type: LOAD_SEMESTERS };
}

export function loadCatalog() {
  return { type: LOAD_CATALOG };
}

export function loadPosts() {
  return { type: LOAD_POSTS };
}

export function loadRequests() {
  return { type: LOAD_REQUESTS };
}

export function submitPost(data) {
  return { type: SUBMIT_POST, data };
}

export function submitRequest(data) {
  return { type: SUBMIT_REQUEST, data };
}

