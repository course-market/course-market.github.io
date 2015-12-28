export const POST_COURSE = 'POST_COURSE';
export const FILTER_LISTING = 'FILTER_LISTING';
export const LOAD = 'LOAD';

export function load() {
  return { type: LOAD };
}

export function postCourse(data) {
  return { type: POST_COURSE, data };
}

export function filterListing(search) {
  return { type: FILTER_LISTING, search };
}
