import styled from 'styled-components';
import { Title } from './Panel';
import { IoChevronForwardCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const HomeMessage: React.FC = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

  return (
    <Container>
      <Title style={{ color: 'grey', paddingTop: 0 }}>{`${user ? 'Receba' : 'Cadastre-se e receba'} os reports por email diariamente`}</Title>
      <Link to = {user ? '/account' : '/signup'}>
        <Icon>
          <IoChevronForwardCircle/>
        </Icon>
      </Link>
    </Container>
  );
};
export default HomeMessage;

const Container = styled.div`
    width: 100%;
    margin: 220px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Icon = styled.div`
    font-size: 30px;
    color: grey;
    margin-top: 20px;
    cursor: pointer;
    transition: 1s;

    &&:hover {
        transform: scale(1.3);
        opacity: 0.6;
    }
`;
