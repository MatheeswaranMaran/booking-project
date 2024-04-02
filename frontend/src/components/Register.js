import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [name,setName] = useState();
    const [sid,setSID]= useState();
    const [dept,setDept]= useState();
    const [mobno,setMobNo]= useState();
    const [pwd,setPwd]= useState();
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        const newData = {
            username:name,dept:dept,empid:sid,mobno:mobno,password:pwd}
            console.log(newData);
            axios.post("http://localhost:4000/register",newData);
    }
    function navLogin(){
        navigate('/');
    }
  return (
    <div className='flex border-2 focus: outline-none font-serif border-white justify-center items-center bg-[url("D:\Maddy\MERN\frontend\background\background.jpg")]  bg-no-repeat bg-center h-screen  '>
        
        <form className=' p-6 border-2 border-white flex flex-col items-center w-80 bg-opacity-80 rounded-3xl bg-blue-800'  onSubmit={handleSubmit}>
            <p className='font-serif text-bold text-white text-3xl pb-8'>Register</p>
            <input 
                type="text" 
                placeholder="Name" 
                className='m-2 border-b-2 border-white bg-transparent text-white placeholder-white focus: outline-none'
                value={name} 
                required
                onChange={(e)=>setName(e.target.value)} 
            />
            <select 
                value={dept}
                className='m-2 border-b-2 border-white bg-transparent text-white placeholder-white w-[175px]  focus: outline-none' 
                onChange={(e)=>setDept(e.target.value)}
                required >
                <option className="text-black">Department</option>
                <option className="text-black" value="Training&Placements">Training and Placement</option>
                <option className="text-black" value="CSE">CSE</option>
                <option className="text-black" value="ECE">ECE</option>
                <option className="text-black" value="IT">IT</option>
                <option className="text-black" value="AI&DS">AI&DS</option>
                <option className="text-black" value="Biotech">Biotech</option>
                <option className="text-black" value="Chemical">Chemical</option>
                <option className="text-black" value="Civil">Civil</option>
                <option className="text-black" value="Mechanical">Mechanical</option>
                <option className="text-black" value="CSE-AIML">CSE-AIML</option>
            </select>
            <input 
                type="text" 
                placeholder="Staff ID"
                className='m-2 border-b-2 border-white bg-transparent text-white placeholder-white'
                value={sid} 
                onChange={(e)=>setSID(e.target.value)} 
                required
            />
            <input 
                type="tel" 
                placeholder="Mobile Number"
                className='m-2 border-b-2 border-white bg-transparent text-white placeholder-white'
                value={mobno} 
                maxLength={10}
                minLength={10}
                onChange={(e)=>setMobNo(e.target.value)} 
                required
            />
            <input 
                type="text" 
                placeholder="Password"
                className='m-2 border-b-2 border-white bg-transparent text-white placeholder-white'
                value={pwd} 
                onChange={(e)=>setPwd(e.target.value)}
                required  
                />
            <button 
                type="submit"
                className='m-2 p-2 border-2 border-white bg-white rounded-2xl w-28 '
            >Submit</button>

            <p className='text-[#C0C0C0] mt-2'>Been here before? <button className='text-white underline underline-offset-auto ' onClick={navLogin}>Let's Login</button></p>

        </form>

    </div>
  )
}

export default Register