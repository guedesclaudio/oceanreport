import TopBar from '../Components/TopBar';
import Panel from '../Components/Panel';
import Footer from '../Components/Footer';
import CreatePost from '../Components/CreatePost';
import PostsList from '../Components/PostsList';
import { useState } from 'react'; 

const Timeline: React.FC = () => {
  const [callApi, setCallApi] = useState<boolean>(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

  return (
    <>
      <TopBar/>
      <>
        <Panel children={user ? 'Acompanhe e compartilhe reports' : 'Acompanhe reports de outros usuários, faça login para compartilhar'}/>
        {user ? <CreatePost callApi = {callApi} setCallApi = {setCallApi}/> : console.log('tem nao')}
        <PostsList callApi = {callApi} setCallApi = {setCallApi}/>
        <Footer/>
      </>
    </>
  );
};
export default Timeline;
