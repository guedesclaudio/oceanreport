import styled from 'styled-components';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  
    width: '250px',
    height: '150px',
    borderRadius: '10px',
    background: '#333333',
  
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    zIndex: 3,
  },
};

const ModalTitle = styled.div`
  width: 200px;
  font-family: "Lato", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 26.8px;
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;

const ModalButtons = styled.div`
  width: 220px;
  height: 30px;
  display: flex;
  justify-content: space-between;
`;

const Cancel = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: white;
  font-family: "Lato", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.6px;
  color: #1877f2;
  box-shadow: none;
  border: none;
  cursor: pointer;
`;
const Submit = styled(Cancel)`
  background-color: #1877f2;
  color: white;
`;

export { customStyles, ModalTitle, ModalButtons, Cancel, Submit };
