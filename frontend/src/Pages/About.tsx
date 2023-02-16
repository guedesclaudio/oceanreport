import TopBar from '../Components/TopBar';
import Panel from '../Components/Panel';
import Footer from '../Components/Footer';
import styled from 'styled-components';
import { Container, Title } from './Report';

const About: React.FC = () => {
  return (
    <>
      <TopBar/>
      <>
        <Panel children={'Sobre nós'}/>
        <Container>
          <Title>
            Ocean Report é um software aberto desenvolvido para gerenciar reports sobre as condições oceânicas.
            Os dados são coletadas através da boia meteo-oceanográfica do SIMCosta que fica localizada na praia de Copacabana.
          </Title>
          <Title>
            Dessa forma, através do nosso algoritmo, conseguimos tratar esses dados e transformá-los em um report com uma linguagem amigável para leigos sobre o Oceano.
          </Title>
          <Title>
            Ao todo são 24 reports todos os dias, atualizados de 1 em 1 hora, 7 dias por semana. Para os amantes dos esportes aquáticos, temos a opção de poder receber os reports por email 05:00 e 17:00.
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

