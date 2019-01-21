import request from '../utils/request';
import { PAGE_SIZE} from '../constants';


export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
export function remove(id) {
  return request(`/api/users/${id}`,{
    method: 'DELETE',
  });
}
export function patch(id, values) {
  return request(`api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function create(values) {
  // console.log(JSON.stringify(values));
  //const { name, email, website } = values;
  return request(`/api/users`,{
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}