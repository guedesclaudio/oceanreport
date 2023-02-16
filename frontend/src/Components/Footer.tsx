import styled from 'styled-components';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer: React.FC = () => {
  return (
    <Container>
      <Content>
        <Text>Desenvolvido por Claudio Guedes</Text>
        <Icons>
          <Icon>
            <a href='https://github.com/guedesclaudio' target = "_blank"><AiFillGithub/></a>
          </Icon>
          <Icon>
            <a href='https://www.linkedin.com/in/claudio-guedes-0144b91a5/' target = "_blank"><AiFillLinkedin /></a>
          </Icon>
        </Icons>
      </Content>
    </Container>
  );
};
export default Footer;

const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;
const Text = styled.h1`
    color: white;
    display: flex;
    font-family: 'Inter', sans-serif;

    @media (max-width: 500px) {
        font-size: 12px;
    }
`;
const Icons = styled.div`
    color: white;
    font-size: 22px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Icon = styled.div`
  cursor: pointer;

  &&:hover {
      color: grey;
  }
`;
const Content = styled.div`
    width: 320px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 500px) {
        width: 90%;
    }
`;
