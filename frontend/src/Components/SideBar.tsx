import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { links } from '../Helpers/Menu/links';

export const SideBar: React.FC<any> = ({ 
  displaySideBar, 
  setDisplaySideBar, 
  animationSideBar, 
  setAnimationSideBar, 
  setIcon }) => {
  const navigate = useNavigate();

  function openPage(route: string) {
    setIcon(<RxHamburgerMenu/>);
    setAnimationSideBar('hidden 0.5s');
    setTimeout(() => setDisplaySideBar('none'), 500);
    navigate(route);
  }

  return (
    <Container displaySideBar = {displaySideBar} animationSideBar = {animationSideBar}>
      <Options>
        {links?.map((value, index) => <Option key = {index} onClick = {() => openPage(value.url)}>{value.name}</Option>)}
        <a href = "https://www.windy.com/-22.973/-43.149/waves?swell1,-22.980,-43.147,15" target = "_blank" rel="noreferrer">
          <Option>Previsão</Option>
        </a>
        <Option onClick = {() => openPage('/contact')}>Contato</Option>
      </Options>
    </Container>
  );
};
export default SideBar;

interface ContainerType {
    displaySideBar?: string,
    animationSideBar?: string,
    children: React.ReactNode
}

const Container = styled.div<ContainerType>`
    background-color: black;
    opacity: 0.7;
    position: fixed;
    top: 0;
    right: 0;
    width: 40vw;
    height: 100vh;
    z-index: 1;
    display: ${(props: {displaySideBar: string}) => props.displaySideBar || 'none'};
    animation: ${(props: {animationSideBar: string}) => props.animationSideBar || 'none'};
    @keyframes show {
        from {
            margin-right: -1000px;
        }
        to {
            margin-right: 0px;
        }
    }
    @keyframes hidden {
        from {
            margin-right: 0px;
        }
        to {
            margin-right: -1000px;
        }
    }
`;
const Options = styled.div`
    margin-top: 60px;
`;
const Option = styled.p`
    font-family: 'Roboto', sans-serif;
    width: 40vw;
    color: white;
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
`;
