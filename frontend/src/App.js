import Login from "./components/Login";
import Register from "./components/Register";
import Home from  './components/Home';
import {Routes, Route} from  'react-router-dom';
import ForgotPwd from "./components/ForgotPwd";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/home' element= {<Home />}/>
      <Route path='/forgotpwd' element={<ForgotPwd  />}></Route>
    </Routes>
  );
}

export default App;
