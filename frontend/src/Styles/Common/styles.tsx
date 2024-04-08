import styled from 'styled-components';

export const Container = styled.div`
    margin: 40px auto;
    width: 320px;
    height: ${(props: {height: string}) => props.height ? props.height : '320px'};
    background-color: #2c2e3d;
    padding: 10px;
    border-radius: 6px;
`;
export const Inputs = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;
export const Input = styled.input`
    width: 300px;
    height: 40px;
    margin-top: 15px;
    background-color: #383a4b;
    border: none;
    opacity: 1.2;
    outline: none;
    border-bottom: 2px solid orangered;
    color: white;
    padding-left: 10px;
    animation-name: animation-line;
	animation-duration: 4s; 
	animation-delay: 2s;
	animation-iteration-count: 1000;
	animation-direction: alternate;
    box-sizing: border-box;
    border-image: linear-gradient(to right, darkblue, darkorchid) 1;

    @keyframes animation-line {
        from {
            border-image: linear-gradient(to right, darkblue, darkorchid) 1;
        }

        to {
            border-image: linear-gradient(to right, red, orange) 1;
        }
    }
`;

export const Button = styled.button`
    width: 300px;
    height: 30px;
    margin-top: 10px;
    border: none;
    cursor: pointer;
    transition: 1.4s;
    background-color: ${(props: {backgroundColor: string}) => props.backgroundColor ? props.backgroundColor : '#c2c2c2'};
    color:  ${(props: {color: string}) => props.color ? props.color : 'none'};

    &&:hover {
        opacity: 0.8;
        transform: scale(0.95);
    }
`;
export const Title = styled.h1`
    font-size: 30px;
    color: white;
    text-align: center;
    font-family: 'Inter', sans-serif;
    margin-top: 100px;
`;
export const SubTitle = styled(Title)`
    font-size: 20px;
    color: #b1b1b1;
    margin-top: 20px;
`;
export const Text = styled.p`
    font-size: 12px;
    color: white;
    text-align: center;
    font-family: 'Inter', sans-serif;
    margin-top: 16px;
    cursor: pointer;
`;
