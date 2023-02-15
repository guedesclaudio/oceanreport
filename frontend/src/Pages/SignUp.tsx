import { userInputs } from '../Helpers/userInputs';
import BodyColor from '../Styles/BodyColor';
import { Title, SubTitle, Container, Inputs, Input, Button, Text } from '../Styles/Common/styles';
import { treatEvent, handleForm, initialObjectCreateUser, checkPasswords } from '../Helpers/Form/form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '../Services/Api/Users';
import { CreateUser } from '../Types/types';
import { signUpMessageError } from '../Errors/SignUp';

const SignUp: React.FC = () => {
  const [form, setForm] = useState<CreateUser>(initialObjectCreateUser);
  const navigate = useNavigate();

  async function signUp() {
    const passwordsAreSame = checkPasswords(form.password, form.confirmPassword);
    if (!passwordsAreSame) return alert('Digite as senhas corretamentes');
    
    try {
      const report = window.confirm('Deseja receber reports diários para o email cadastro?');
      if (report) form.report = true;
      await userApi.post(form);
      navigate('/signin');
    } catch (error: any) {
      const status = error.response.status;
      alert(signUpMessageError[status]);
    }
  }
  const def = signUp;

  return (
    <>
      <BodyColor/>
      <Title>Ocean Report</Title>
      <SubTitle>Cadastre-se e tenha acesso a todas as informações</SubTitle>
      <Container>
        <form onSubmit={() => treatEvent(def)}>
          <Inputs>
            {userInputs.map((value, index) => <Input key = {index} name = {value.name} type = {value.type} placeholder = {value.placeholder}
              onChange = {event =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)} required/>)}
            <Button type = 'submit'>cadastrar</Button>
          </Inputs>
        </form>
        <Link to = {'/signin'}>
          <Text>Já tem conta? Faça login!</Text>
        </Link>
      </Container>
    </>
  );
};
export default SignUp;

