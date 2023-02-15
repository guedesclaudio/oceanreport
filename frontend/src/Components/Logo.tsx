import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to = {'/'}>
      <Container>
        <h1>Ocean Report</h1>
      </Container>
    </Link>
  );
};
export default Logo;

const Container = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: white;
`;
