import { Error } from '../Types/types';

export const signUpMessageError: Error = {
  400: 'Verifique se as informações estão corretas. Sua senha necessita possuir pelo menos 6 caracteres',
  409: 'Já existe uma conta com esse email',
  500: 'Ops! Tivemos um problema e estamos trabalhando nisso'
};
