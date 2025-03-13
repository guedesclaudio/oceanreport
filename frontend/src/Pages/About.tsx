import TopBar from '../Components/TopBar';
import Panel from '../Components/Panel';
import Footer from '../Components/Footer';
import styled from 'styled-components';
import { Title } from './Report';

export const Container = styled.div`
  max-width: 900px;
  margin: 80px auto;
  padding: 40px;
  background: linear-gradient(135deg, #1c1c1c, #333);
  color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 1.6;
  font-size: 26px;
  font-weight: 400;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    margin: 50px auto;
    padding: 30px;
    font-size: 20px;
  }
`;

const About: React.FC = () => {
  return (
    <>
      <TopBar/>
      <>
        <Panel children={'Sobre nós'}/>
        <Container>
          <Title>
            Ocean Report é um software de código aberto desenvolvido para gerenciar reports sobre as condições oceânicas.
            Os dados são coletadas através da boia meteo-oceanográfica do SIMCosta que fica localizada na praia de Copacabana.
          </Title>
          <Title>
            Dessa forma, através do nosso algoritmo, conseguimos tratar esses dados e transformá-los em um report com uma linguagem amigável para leigos sobre o Oceano.
          </Title>
          <Title>
            Ao todo são 24 reports todos os dias, atualizados de 1 em 1 hora, 7 dias por semana. Atualmente existe a opção de receber reports por email 05:00 e 17:00.
          </Title>
          <Title>
            Nossa timeline foi criada para você poder acompanhar informações relatadas por outros usuários e poder compartilhar suas próprias observações da praia em que estiver.
          </Title>
        </Container>
        <Footer/>
      </>
    </>
  );
};
export default About;

