// use localStorage to store the authority info, which might be sent from server in actual project.
import { Cookies } from 'react-cookie';

const CK = new Cookies();

export function getAuthority() {
  return (CK.get('Auth') && CK.get('Auth').user && CK.get('Auth').user.roles) || ['guest'];
}

export function getUserToken() {
  return (CK.get('Auth') && CK.get('Auth').token) || null;
}

export function setAuthority(auth) {
  return CK.set('Auth', auth, { path: '/' });
}

export function getCurrentUser() {
  return CK.get('Auth');
}
