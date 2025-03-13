import Post from '../Components/Post';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import postsApi from '../Services/Api/Posts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserStorage } from '../Types/types';

const PostsList: React.FC<any> = ({ callApi, setCallApi }) => {
  const [posts, setPosts] = useState<any[]>();
  const user: UserStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;
  
  async function listPosts() {
    try {
      const response = await postsApi.get();
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      toast('Ocorreu um erro e estamos trabalhando nisso!');
    }
  }

  useEffect(() => {
    listPosts();
    setCallApi(false);
  }, [callApi]);
 
  return (
    <Container marginTop = {user ? '180px' : '0px'}>
      {posts?.length === 0 ? <Message>Seja o primeiro a compartilhar um report</Message> : ''}
      {posts ? <>{
        posts?.map((value, index) => <Post key = {index} title = {value.Title} content = {value.Content} 
          username = {value.User.name} userId = {value.userId} date = {value.date} hour = {value.hour} postId = {value.id}
          setCallApi = {setCallApi}/>)
      }</> : <Message>carregando novos posts...</Message>}
      <ToastContainer theme = 'dark'/>
    </Container>
  );
};
export default PostsList;

const Container = styled.div<any>`
  width: 500px;
  margin: 0px auto;
  margin-top: ${(props: {marginTop: string}) => props.marginTop};
  margin-bottom: 100px;

  @media (max-width: 500px) {
    width: 96%;
  }
`;
const Message = styled.h1`
  margin-top: 280px;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  color: grey;
  text-align: center
`;
