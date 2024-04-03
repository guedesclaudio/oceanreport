import { NavigateFunction } from 'react-router-dom';

export function removeLogin(navigate: NavigateFunction) {
  localStorage.removeItem('user');
  return navigate('/signin');
}
