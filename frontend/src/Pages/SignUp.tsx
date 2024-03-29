import { userInputs } from '../Helpers/userInputs';
import BodyColor from '../Styles/BodyColor';
import { Title, SubTitle, Container, Inputs, Input, Button, Text } from '../Styles/Common/styles';
import { treatEvent, handleForm, initialObjectCreateUser, checkPasswords } from '../Helpers/Form/form';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '../Services/Api/Users';
import { CreateUser } from '../Types/types';
import { signUpMessageError } from '../Errors/SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { customStyles, ModalButtons, ModalTitle, Cancel, Submit } from '../Styles/Modal';

const SignUp: React.FC = () => {
  const [form, setForm] = useState<CreateUser>(initialObjectCreateUser);
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function openModal() {
    if( window.event ) window.event.preventDefault();
    setIsOpen(true);
  }

  async function signUp(report: boolean) {
    const passwordsAreSame = checkPasswords(form.password, form.confirmPassword);
    if (!passwordsAreSame) return toast('Digite as senhas corretamente');
    
    if (report) {
      form.report = true;
    } else {
      setIsOpen(false);
    }

    try {
      await userApi.post(form);
      navigate('/signin');
    } catch (error: any) {
      toast('Não foi possível cadastrar');
    }
  }

  return (
    <>
      <BodyColor/>
      <Title>Ocean Report</Title>
      <SubTitle>Cadastre-se e tenha acesso a todas as informações</SubTitle>
      <Container>
        <form onSubmit={() => openModal()}>
          <Inputs>
            {userInputs.map((value, index) => <Input key = {index} name = {value.name} type = {value.type} placeholder = {value.placeholder}
              onChange = {(event: ChangeEvent<HTMLInputElement>) =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)} required/>)}
            <Button type = 'submit'>cadastrar</Button>
          </Inputs>
        </form>
        <Link to = {'/signin'}>
          <Text>Já tem conta? Faça login!</Text>
        </Link>
        <ToastContainer theme = 'dark'/>
      </Container>
      <Modal isOpen={modalIsOpen} style = { customStyles as Modal.Styles }>
        <ModalTitle>Deseja receber os reports por email?</ModalTitle>
        <ModalButtons>
          <Cancel onClick={() => signUp(false)}>Não</Cancel>
          <Submit onClick={() => signUp(true)}>Sim</Submit>
        </ModalButtons>
      </Modal>
    </>
  );
};
export default SignUp;

