import TopBar from '../Components/TopBar';
import Footer from '../Components/Footer';
import styled from 'styled-components';
import { Input, SubTitle, Container, Button } from '../Styles/Common/styles';
import BodyColor from '../Styles/BodyColor';
import Switch from '@mui/material/Switch';
import { removeLogin } from '../Helpers/removeLogin';
import { useNavigate } from 'react-router-dom';

const UserAccount: React.FC = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const navigate = useNavigate();

  return (
    <>
      <TopBar/>
      <>
        <BodyColor/>
        <AccountBox>
          <Container height='400px'>
            <SubTitle>Atualize suas informações</SubTitle>
            <Inputs>
              <Input type='text' placeholder='nome'/>
              <Input type='email' placeholder='email'/>
              <Input type='password' placeholder='senha atual'/>
              <Input type='password' placeholder='nova senha'/>
              <SwitchBox>
                <Span>Deseja receber reports por email?</Span><Switch {...label} defaultChecked />
              </SwitchBox>
              <Button>salvar</Button>
              <Button backgroundColor='red' color='white' onClick={() => removeLogin(navigate)}>sair</Button>
            </Inputs>
          </Container>
        </AccountBox>
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
