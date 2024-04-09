import React,{ useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [sid,setSID] = useState();
  const [password,setPwd] = useState();
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    const loginData = { empid: sid , password : password };
    
    axios.post("http://localhost:4000/login",loginData)
    .then((res)=>{
      if(!res.data){
        alert("Login Failed");
      }
      else{
        alert("Successfully logged in!!!");
        navigate('/home');
        localStorage.setItem("login",true);
        localStorage.setItem("user",sid);
      }
    });
  }
  function navForgotPassword(){
    navigate('/forgotpwd');
  }
  function navRegister(){
    navigate('/register');
  }
  return (
    <div className='h-screen flex justify-center items-center bg-[url("D:\Maddy\MERN\frontend\background\background.jpg")] bg-no-repeat bg-center'>
        
        <form className='p-6 border-2 border-white flex flex-col items-center w-80 bg-opacity-80 font-serif rounded-3xl bg-blue-800' onSubmit={handleSubmit}>
        <p className='font-serif text-bold text-white text-3xl pb-8'>Login</p>
            <input 
            type="text" 
            className='m-2 border-b-2 border-white bg-transparent text-white placeholder-white focus: outline-none'
            placeholder="Staff ID" 
            value={sid} 
            onChange={(e)=>setSID(e.target.value)}
             />
            <input 
            type="password" 
            className='m-2 mb-6 border-b-2 border-white bg-transparent text-white placeholder-white focus: outline-none'
            placeholder="Password" 
            value={password} 
            onChange={(e)=>setPwd(e.target.value)}
             />
            <button className=' text-[#C0C0C0] mb-2 underline ' onClick={navForgotPassword}>Forgot Password?</button>
            <button type="submit" className='m-2 p-2 border-2 border-white bg-white rounded-2xl w-28 font-serif' >LOGIN</button>
            <p className='text-[#C0C0C0] mt-2'>First time here? <button className='text-white underline' onClick={navRegister}>Let's register</button></p>
        </form>
        
    </div>
  )
}

export default Login