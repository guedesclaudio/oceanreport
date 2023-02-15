export function treatEvent(def: any) { 
  if( window.event ) window.event.preventDefault();
  def();
}

export function handleForm({ name, value }: any, form: any, setForm: any) {
  setForm({
    ...form,
    [name]: value
  });
}

export const initialObjectCreateUser = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  report: false
};

export function checkPasswords(pass1:string, pass2:string) {
  if (pass1 !== pass2) return false;
  return true;
}
