import { ConfigApi } from '../Types/types';

export function createConfigToApi(token: string): ConfigApi {
  return { headers: { 'Authorization': `Bearer ${token}` } };
}
