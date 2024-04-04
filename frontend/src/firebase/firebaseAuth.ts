import { getAuth, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);
const socialMediaAuth = async(provider: any) => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res, 'res');
      return res.user;
    })
    .catch((error) => {
      console.log(error, 'error');
      return error;
    });
};

export default socialMediaAuth;
