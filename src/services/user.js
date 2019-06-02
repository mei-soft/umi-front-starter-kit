import request from '@/utils/request';
import { stringify } from 'qs';

export async function getMe() {
  return request('v1/me', {
    method: 'GET',
    auth: true,
  });
}

export async function getUsers(params = {}) {
  return request(`v1/users?${stringify(params)}`, {
    method: 'GET',
    auth: true,
  });
}
