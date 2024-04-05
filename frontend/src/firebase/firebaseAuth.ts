import { getAuth, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import app from './firebaseConfig';
import { toast } from 'react-toastify';

const auth = getAuth(app);
const socialMediaAuth = async(provider: any) => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      return res.user;
    })
    .catch((error) => {
      toast(`Ocorreu um erro ao tentar logar. Error: ${JSON.stringify(error)}`);
      return error;
    });
};

export default socialMediaAuth;
