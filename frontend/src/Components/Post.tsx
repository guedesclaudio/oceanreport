import styled from 'styled-components';
import { Post as PostType } from '../Types/types';
import { BsTrash } from 'react-icons/bs';
import postsApi from '../Services/Api/Posts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { useState } from 'react';
import { customStyles, ModalButtons, ModalTitle, Cancel, Submit } from '../Styles/Modal';

const Post: React.FC<any> = ({
  username,
  userId,
  title,
  content,
  date,
  hour,
  postId,
  setCallApi
}) => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;
  const config = { headers: { 'Authorization': `Bearer ${user.token}` } };
  const [modalIsOpen, setIsOpen] = useState(false);
  
  async function removePost() {
    try {
      setIsOpen(false);
      await postsApi.remove(postId, config);
      setCallApi(true);
      toast('Post removido com sucesso!');
    } catch (error) {
      alert(error);
    }
  }
  
  return (
    <Container>
      <Modal isOpen={modalIsOpen} style = { customStyles as Modal.Styles }>
        <ModalTitle>Tem certeza que deseja excluir?</ModalTitle>
        <ModalButtons>
          <Cancel onClick={() => setIsOpen(false)}>Não</Cancel>
          <Submit onClick={removePost}>Sim</Submit>
        </ModalButtons>
      </Modal>
      <PostData>
        <Name>{username}</Name>
        <Icons>
          <Date>{date} - {hour}</Date>
          {userId === user.userId ? <Icon onClick={() => setIsOpen(true)}><BsTrash/></Icon> : ''}
        </Icons>
      </PostData>
      <Informations>
        <Local>{title}</Local>
        <Content>{content}</Content>
      </Informations>
      <ToastContainer theme = 'dark'/>
    </Container>
  );
};
export default Post;

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 0 10px 10px 10px;
    background-color: white;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 16px;
    box-shadow: 1px 1px 10px 0px grey;
`;
const PostData = styled.h1`
    color: white;
    background-color: #008CBA;
    width: 100%;
    height: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0px 10px 0px 0px;
    padding-left: 6px;
    padding-right: 6px;
    box-sizing: border-box;
`;
const Name = styled.p`
    font-weight: bold;
`;
const Date = styled.p`
    font-style: italic;
    opacity: 0.6;
`;
const Informations = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Local = styled.div`
    width: 100%;
    color: grey;
    margin-top: 10px;
    margin-bottom: 5px;
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: left;
    align-items: center;
    font-weight: bold;
`;
const Content = styled(Local)`
    margin: 0;
    margin-bottom: 5px;
    font-weight: normal;
`;
const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Icon = styled.div`
  margin-left: 14px;
  cursor: pointer;
`;
