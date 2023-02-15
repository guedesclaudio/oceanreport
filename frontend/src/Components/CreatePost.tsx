import styled from 'styled-components';
import { treatEvent, handleForm } from '../Helpers/Form/form';
import postsApi from '../Services/Api/Posts';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost: React.FC<any> = ({ setCallApi }) => {
  const [form, setForm] = useState<any>();
  const { token } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;
  const config = { headers: { 'Authorization': `Bearer ${token}` } };

  async function post() {
    try {
      await postsApi.post(form, config);
      setCallApi(true);
      setForm({});
    } catch (error) {
      toast('Não foi possível realizar o post!');
    }
  }
  const def = post;

  return (
    <Container>
      <form onSubmit={() => treatEvent(def)}>
        <TitleInput placeholder = 'local...' name = 'title' onChange = {event =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)} required
          value = {form?.title ? form.title : ''}/>
        <ContentInput placeholder = 'depoimento...' name = 'content' onChange = {event =>  handleForm({ name: event.target.name, value: event.target.value }, form, setForm)} required
          value = {form?.content ? form.content : ''}/>
        <Button type = 'submit'>Publicar</Button>
      </form>
      <ToastContainer theme = 'dark'/>
    </Container>
  );
};
export default CreatePost;

const Container = styled.div`
  width: 500px;
  height: 240px;
  border: 2px solid white;
  margin: -160px auto;
  background-color: #383636;
  border-radius: 10px;

  @media (max-width: 500px) {
    width: 96%;
  }
  
  && form {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const TitleInput = styled.input`
  width: 90%;
  height: 40px;
  border: none;
  margin-bottom: 10px;
  padding-left: 10px;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
`;
const ContentInput = styled.textarea`
  width: 90%;
  height: 70px;
  resize: none;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
  padding-top: 10px;
  padding-left: 10px;
  outline: none;
  font-size: 14px;
`;
const Button = styled.button`
    margin-top: 60px;
    width: 200px;
    height: 30px;
    background-color: #008CBA;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    transition: 1.4s;

    &&:hover{
        opacity: 0.9;
        transform: scale(0.9);
    }
`;
