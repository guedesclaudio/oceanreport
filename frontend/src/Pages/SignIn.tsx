import BodyColor from '../Styles/BodyColor';
import { Title, SubTitle, Container, Inputs, Input, Button, Text } from '../Styles/Common/styles';
import { loginInputs } from '../Helpers/userInputs';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { LoginUser } from '../Types/types';
import { UserContext } from '../Contexts/UserContext';
import userApi from '../Services/Api/Users';
import { treatEvent, handleForm } from '../Helpers/Form/form';
import { signInMessageError } from '../Errors/SignIn';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import socialMediaAuth from '../firebase/firebaseAuth'; 
import { githubProvider, googleProvider } from '../firebase/firebaseMethod';
import { toast } from 'react-toastify';

const SignIn: React.FC = () => {
  const [form, setForm] = useState<LoginUser>({ email: '', password: '' });
  const navigate = useNavigate();
  const { userData, setUserData, config, setConfig } = useContext(UserContext);

  async function loginOAuth(provider: any) {
    try {
      const responseOAuth = await socialMediaAuth(provider);
      const { accessToken, email, displayName } = responseOAuth;
      const { token, userId } = (await userApi.oAuth({ accessToken, email, displayName })).data;
      
      localStorage.setItem('user', JSON.stringify({ token, userId }));
      setUserData({ ...userData, token });
      setConfig({ ...config, 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      toast('Não foi possível realizar login');
    }
  }

  async function signInUser() {
    try {
      const response = await userApi.login(form);
      const { token, userId } = response.data;

      localStorage.setItem('user', JSON.stringify({ token, userId }));
      setUserData({ ...userData, token });
      setConfig({ ...config, 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      navigate('/');
    } catch (error: any) {
      const status = error.response.status;
      alert(signInMessageError[status]);
    }
  }
  const def = signInUser;

  return (
    <>
      <BodyColor/>
      <Title>Ocean Report</Title>
      <SubTitle>Faça Login para conseguir compartilhar reports</SubTitle>
      <Container>
        <form onSubmit={() => treatEvent(def)}>
          <Inputs>
            {loginInputs.map((value, index) => <Input key = {index} name = {value.name} type = {value.type} placeholder = {value.placeholder}
              onChange = {event =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)} required/>)}
          </Inputs>
          <Buttons>
            <Button>login</Button>
            <Button style = {{ background: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick = {() => loginOAuth(googleProvider)}>
              Entre com Google 
              <Icon><FcGoogle/></Icon>
            </Button>
            <Button style = {{ background: 'black', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick = {() => loginOAuth(githubProvider)}>
              Entre com GitHub 
              <Icon><AiFillGithub/></Icon>
            </Button>
          </Buttons>
        </form>
        <Link to = {'/signup'}>
          <Text>Não possui conta? Faça cadastro!</Text>
        </Link>
      </Container>
    </>
  );
};
export default SignIn;

const Buttons = styled.div`
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const Icon = styled.div`
  font-size: 20px;
  margin-left: 6px;
  margin-top: 4px;
`;
