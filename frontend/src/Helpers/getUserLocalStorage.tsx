import { UserStorage } from '../Types/types';

export function getUserFromLocalStorage(): UserStorage {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;
}
