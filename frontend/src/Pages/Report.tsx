import TopBar from '../Components/TopBar';
import styled from 'styled-components';
import Panel from '../Components/Panel';
import { MdWaves } from 'react-icons/md';
import { TbWind } from 'react-icons/tb';
import { FaTemperatureHigh } from 'react-icons/fa'; 
import { TfiRuler } from 'react-icons/tfi'; 
import { TiWeatherCloudy } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import reportApi from '../Services/Api/Report';
import Footer from '../Components/Footer';
import { ReportObject } from '../Types/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Report: React.FC = () => {
  const [report, setReport] = useState<ReportObject>();

  async function refreshReport() {
    try {
      const response = await reportApi.get();
      const reportData = response.data.report;

      const updateReportGradually = (data: ReportObject) => {
        const propertiesToAnimate = ['waveCondition', 'temperatureCondition', 'windSpeedCondition', 'date', 'hour'];
        const interval = 50; 

        propertiesToAnimate.forEach((property) => {
          const fullText: any = data[property] as any;
          let currentText = '';
          let index = 0;

          const timer = setInterval(() => {
            if (index < fullText.length) {
              currentText += fullText[index];
              setReport((prevReport: any) => ({ ...prevReport, [property]: currentText }));
              index++;
            } else {
              clearInterval(timer);
            }
          }, interval);
        });
      };

      updateReportGradually(reportData);
    } catch (error: any) {
      toast('Ocorreu um erro e estamos trabalhando nisso!');
    }
  }

  useEffect(() => {
    refreshReport();
  }, []);

  return (
    <>
      <TopBar/>
      <>
        <Panel children={'Novos reports a cada 1 hora'}/>
        <Container>
          <Title>Condições oceânicas <MdWaves/></Title>
          <Text>
            {report?.waveCondition ? report?.waveCondition : 'carregando dados de altura de onda...'} <TfiRuler/>
          </Text>
          <Text>
            {report?.temperatureCondition ? report?.temperatureCondition : 'carregando dados de temperatura...'} <FaTemperatureHigh/>
          </Text>
          <Title>Condições meteorológicas <TiWeatherCloudy/></Title> 
          <Text>
            {report?.windSpeedCondition ? report?.windSpeedCondition : 'carregando dados de velocidade do vento...'} <TbWind />
          </Text>
          <Text>Data: {report?.date ? report?.date : 'carregando data...'}</Text>
          <Text>Hora: {report?.hour ? report?.hour : 'carregando hora...' }</Text>
          <Warning>
            <Text style = {{ color: 'grey' }}>Local dos dados: Praia de Copacabana</Text>
            <Text style = {{ color: 'grey' }}>Esse report serve para as seguintes praias: São Conrado, Leblon, Ipanema, Copacabana, Leme, Piratininga, Camboinhas</Text>
            <Text style = {{ color: 'grey' }}>Cada praia pode possuir características diferentes, o que dificulta o nível de acertividade. 
            Quando mais longe do ponto de origem dos dados (Copacabana), maior o risco do report não ser acertivo</Text> 
          </Warning>
        </Container>
      </>
      <ToastContainer theme = 'dark'/>
      <Footer/>
    </>
  );
};
export default Report;

export const Container = styled.div`
  max-width: 900px;
  margin: 60px auto;
  padding: 40px;
  background: linear-gradient(135deg, #1c1c1c, #292929);
  color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 1.6;
  font-size: 1.2rem;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    padding: 30px;
    font-size: 1.1rem;
  }
`;

export const Title = styled.h2`
  font-size: 22px;
  font-family: "Inter", sans-serif;
  text-align: center;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  svg {
    font-size: 32px;
    color: #66c2ff;
    transition: transform 0.3s ease-in-out;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

export const Text = styled.p`
  font-size: 18px;
  margin: 10px 0;
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  svg {
    color: #ffa500;
  }

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

export const Warning = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
`;

export const WarningText = styled.p`
  font-size: 16px;
  color: #d6d6d6;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  strong {
    color: white;
  }
`;
