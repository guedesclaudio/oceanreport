import styled from 'styled-components';
import { BoxInformation } from '../Types/types';
import { boxData } from '../Helpers/boxData';
import { Link } from 'react-router-dom';

const Box: React.FC<BoxInformation> = ({ image, title, text, url }) => {
  return (
    <Link to = {url}>
      <Content>
        <img src={image}/>
        <BoxFooter>
          <h1>{title}</h1>
          <p>{text}</p>
        </BoxFooter>
      </Content>
    </Link>
  );
};

const PanelBoxes: React.FC = () => {
  return (
    <Container>
      {boxData?.map((value, index) => <Box key = {index} image = {value.image} title = {value.title} text = {value.text} url = {value.url}/>)}
    </Container>
  );
};
export default PanelBoxes;

const Container = styled.div`
    width: 1200px;
    height: 100%;
    margin: -160px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
        justify-content: center;
    }
`;
const Content = styled.div`
    width: 380px;
    height: 100%;
    -webkit-box-shadow: -2px -4px 110px -23px rgba(20,13,20,1);
    -moz-box-shadow: -2px -4px 110px -23px rgba(20,13,20,1);
    box-shadow: -2px -4px 110px -23px rgba(20,13,20,1);
    cursor: pointer;
    transition: 1.4s;
    border-radius: 6px 6px 0px 0px;

    && img {
        width: 100%;
        height: 340px;
        border-radius: 6px 6px 0px 0px;
        @media (max-width: 400px) {
          width: 98vw;
        }
    }
    
    &&:hover {
        transform: scale(1.1);
    }

    @media (max-width: 1200px) {
        margin-top: 20px;
    }
    @media (max-width: 400px) {
        width: 100%;
    }
`;
const BoxFooter = styled.div`
    width: 100%;
    height: 60px;
    margin-top: -5px;
    background-color: white;
    border-radius: 0px 0px 6px 6px;

    && h1 {
        font-family: 'Inter', sans-serif;
        font-size: 18px;
        color: #727171;
        padding: 10px;

        @media (max-width: 500px) {
            font-size: 14px;
        }
    }

    && p {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        color: #a0a0a0;
        padding-left: 10px;

        @media (max-width: 500px) {
            font-size: 11px;
        }
    }
`;
