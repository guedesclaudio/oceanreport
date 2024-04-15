import TopBar from '../Components/TopBar';
import Footer from '../Components/Footer';
import styled from 'styled-components';
import { Input, SubTitle, Container, Button } from '../Styles/Common/styles';
import BodyColor from '../Styles/BodyColor';
import Switch from '@mui/material/Switch';
import { removeLogin } from '../Helpers/removeLogin';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import userApi from '../Services/Api/Users';
import { ToastContainer, toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../Helpers/getUserLocalStorage';
import { createConfigToApi } from '../Helpers/createConfigToApi';

import { handleForm, treatEvent } from '../Helpers/Form/form';

const UserAccount: React.FC = () => {
  const [form, setForm] = useState<any>();
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const navigate = useNavigate();
  const [userAccountInformations, setUserAccountInformations] = useState<any/*UserAccountInformations*/>({
    name: 'carregando ...',
    email: 'carregando ...'
  });
  const user = (getUserFromLocalStorage());
  const config = createConfigToApi(user?.token);

  function checkPasswordsFields() {
    if(form?.newPassword && (!form?.confirmNewPassword || !form?.oldPassword)) return false;
    if(form?.oldPassword && (!form?.confirmNewPassword || !form?.newPassword)) return false;
    if(form?.confirmNewPassword && (!form?.oldPassword || !form?.newPassword)) return false;
    if(form?.confirmNewPassword !== form?.newPassword) return false;
    return true;
  }
  
  async function sendUserInformations() {
    try {
      if(!form) {
        toast('Informações atualizadas com sucesso!');
        setTimeout(() => navigate('/'), 1500);
      }
      
      if(!checkPasswordsFields()) return toast('Dados inválidos!');
      
      await userApi.postAccountInformations(form, config);
      setForm({});
      toast('Informações atualizadas com sucesso!');
      return navigate('/');
    } catch (error: any) {
      return toast(`Não foi possível atualizar as informações da sua conta. Error: ${error.message}`);
    }
  }
  
  async function getInformations() {
    try {
      const response = await userApi.getAccountInformations(config);
      setUserAccountInformations(response.data);
    } catch (error: any) {
      toast(`Ocorreu um erro e estamos trabalhando nisso!. Error: ${error.message}`);
    }
  }

  console.log(userAccountInformations, 'aqui');
  
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
              <Container height={ !userAccountInformations?.isOAuth ? '500px' : '290px' }>
                <SubTitle>Atualize suas informações</SubTitle>
                <Inputs>
                  <form onSubmit={() => treatEvent(sendUserInformations)}>
                    <Input type='text' placeholder='nome' name='name' value = {(form?.name || form?.name === '') ? form?.name : userAccountInformations?.name}
                      onChange = {(event: ChangeEvent<HTMLInputElement>) =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)}/>
                    { !userAccountInformations?.isOAuth ? 
                      <>
                        <Input type='email' placeholder='email' name='email' value = {(form?.email || form?.email === '') ? form?.email : userAccountInformations?.email}
                          onChange = {(event: ChangeEvent<HTMLInputElement>) =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)}/>
                        <Input type='password' placeholder='senha atual' name='oldPassword' value = {form?.oldPassword ? form.oldPassword : ''}
                          onChange = {(event: ChangeEvent<HTMLInputElement>) =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)}/>
                        <Input type='password' placeholder='nova senha' name='newPassword' value = {form?.newPassword ? form.newPassword : ''}
                          onChange = {(event: ChangeEvent<HTMLInputElement>) =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)}/>
                        <Input type='password' placeholder='confirme sua nova senha' name='confirmNewPassword' value = {form?.confirmNewPassword ? form.confirmNewPassword : ''}
                          onChange = {(event: ChangeEvent<HTMLInputElement>) =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)}/>
                      </> : <AlertUserOauth >Usuários Google não possuem a opção de atualizar email e senha</AlertUserOauth>}
                    
                    <SwitchBox>
                      {/* <Span>Deseja receber reports por email?</Span><Switch name='report'  aria-checked checked={form?.report !== undefined ? form.report : userAccountInformations?.report}
                        onChange = {(event: ChangeEvent<any>) => {
                          const newValue = event.target.checked ? 'on' : 'off';
                          handleForm({ name: event.target.name, value: newValue }, form, setForm);
                        }}/> */}
                    </SwitchBox>
                    <Button type = 'submit'>salvar</Button>
                    <Button onClick={() => removeLogin(navigate)}>sair</Button>
                    <Button backgroundColor='#e42545' color='white' onClick={() => alert('Essa funcionalidade está em construção!')}>excluir conta</Button>
                  </form>
                </Inputs>
              </Container>
            </AccountBox>)
          </>
          : <h1 style={{ color: 'black', marginTop: '100px', textAlign: 'center', fontSize: '30px', fontFamily: 'Arial' }}>Você não possui permissão para acessar essa página.</h1>}
        <ToastContainer theme = 'dark'/>
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

const AlertUserOauth = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #b1b1b1;
  font-weight: bold;
  margin-top: 10px;
`;
