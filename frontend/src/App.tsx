import './App.css';
import GlobalStyle from './Styles/globalStyle';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Report from './Pages/Report';
import Timeline from './Pages/Timeline';
import About from './Pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserAccount from './Pages/UserAccount';

function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/signup" element = {<SignUp/>}/>
          <Route path = "/signin" element = {<SignIn/>}/>
          <Route path = "/report" element = {<Report/>}/>
          <Route path = "/timeline" element = {<Timeline/>}/>
          <Route path = "/about" element = {<About/>}/>
          <Route path = "/account" element = {<UserAccount/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
