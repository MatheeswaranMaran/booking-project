import Login from "./components/Login";
import Register from "./components/Register";
import Home from  './components/Home';
import {Routes, Route} from  'react-router-dom';
import ForgotPwd from "./components/ForgotPwd";
import MultipleSlotBooking from "./components/MultipleSlotBooking";
import Profile from "./components/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/home' element= {<Home />}/>
      <Route path='/forgotpwd' element={<ForgotPwd  />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/multipleslotbooking' element={<MultipleSlotBooking/>}></Route>
    </Routes>
  );
}

export default App;
