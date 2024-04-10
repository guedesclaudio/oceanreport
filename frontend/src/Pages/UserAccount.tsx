import TopBar from '../Components/TopBar';
import Footer from '../Components/Footer';
import styled from 'styled-components';
import { Input, SubTitle, Container, Button } from '../Styles/Common/styles';
import BodyColor from '../Styles/BodyColor';
import Switch from '@mui/material/Switch';
import { removeLogin } from '../Helpers/removeLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userApi from '../Services/Api/Users';
import { toast } from 'react-toastify';

import { getUserFromLocalStorage } from '../Helpers/getUserLocalStorage';
import { createConfigToApi } from '../Helpers/createConfigToApi';
import { Title } from './Report';

const UserAccount: React.FC = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const navigate = useNavigate();
  const [userAccountInformations, setUserAccountInformations] = useState<any/*UserAccountInformations*/>(); //TIPAR
  const user = (getUserFromLocalStorage());
  const config = createConfigToApi(user?.token);

  async function getInformations() {
    try {
      const response = await userApi.getAccountInformations(config);
      setUserAccountInformations(response.data);
    } catch (error) {
      console.error(error);
      toast('Ocorreu um erro e estamos trabalhando nisso!');
    }
  }

  //FAZER A DINÂMICA DE MUDAR OS VALORES CONFORME O USUÁRIO DIGITAR, E CHAMAR A API PRA DAR O POST
  //CRIAR UM STYLED-COMPONENT DE MENSAGEM PRA PÁGINA NAO PERMITIDA
  //SE FOR USUÁRIO OAUTH NÃO PODE TROCAR O EMAIL E SENHA, ESSES CAMPOS FICAM DESABILITADOS
  //SE FOR USUÁRIO NORMAL PODE
  console.log(userAccountInformations);

  useEffect(() => {
    getInformations();
  }, []);

  return (
    <>
      <TopBar/>
      <>
        {user ? 
          <>
          (<BodyColor/>
            <AccountBox>
              <Container height='500px'>
                <SubTitle>Atualize suas informações</SubTitle>
                <Inputs>
                  <Input type='text' placeholder='nome' value = {userAccountInformations?.name}/>
                  <Input type='email' placeholder='email' value = {userAccountInformations?.email}/>
                  <Input type='password' placeholder='senha atual'/>
                  <Input type='password' placeholder='nova senha'/>
                  <Input type='password' placeholder='confirme sua nova senha'/>
                  <SwitchBox>
                    <Span>Deseja receber reports por email?</Span><Switch {...label} value={false}/>
                  </SwitchBox>
                  <Button>salvar</Button>
                  <Button backgroundColor='orange' color='white' onClick={() => removeLogin(navigate)}>sair</Button>
                  <Button backgroundColor='red' color='white' onClick={() => removeLogin(navigate)}>excluir conta</Button>
                </Inputs>
              </Container>
            </AccountBox>)
          </>
          : <h1 style={{ color: 'black', marginTop: '100px', textAlign: 'center', fontSize: '30px', fontFamily: 'Arial' }}>Você não possui permissão para acessar essa página.</h1>}
        
        <Footer/>
      </>
    </>
  );
};
export default UserAccount;

const AccountBox = styled.div`
  margin: 160px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Inputs = styled.div`
  margin: 0 auto;
  padding-left: 12px;
`;

const SwitchBox = styled.div`
  margin-top: 10px;
`;

const Span = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #b1b1b1;
  font-weight: bold;
`;
