import { getAuth, signInWithPopup } from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);
const socialMediaAuth = async(provider: any) => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      return res.user;
    })
    .catch((error) => {
      return error;
    });
};

export default socialMediaAuth;
