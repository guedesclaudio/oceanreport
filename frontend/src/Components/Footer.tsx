import styled from 'styled-components';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer: React.FC = () => {
  return (
    <Container>
      <Content>
        <Text>© 2025 Claudio Guedes | Todos os direitos reservados</Text>
        <SocialLinks>
          <a href="https://github.com/guedesclaudio" target="_blank" rel="noreferrer">
            <AiFillGithub />
          </a>
          <a href="https://www.linkedin.com/in/claudio-guedes-0144b91a5/" target="_blank" rel="noreferrer">
            <AiFillLinkedin />
          </a>
        </SocialLinks>
      </Content>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  width: 100%;
  padding: 20px 0;
  background: linear-gradient(135deg, #1c1c1c, #333);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0;
`;

const Content = styled.div`
  width: 90%;
  max-width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
  opacity: 0.8;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: white;
    font-size: 24px;
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
      color: #bbb;
      transform: scale(1.1);
    }
  }
`;
