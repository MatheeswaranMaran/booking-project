import React,{useState,useEffect} from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home() {

  const [ah,setAh] = useState();

  const [data,setData] = useState([]);

  const [show,setShow] = useState();

  const [bookingdata, setBD] = useState([]);

  const [isLogin, setIsLogin] = useState();

  const navigate = useNavigate();

  const [loginAuth,setLoginAuth] = useState();

  const [gotSID, setGOTSID] = useState();

  const [drop,setDrop] = useState();

  

  const loginCheck=()=>{
    const login = localStorage.getItem("login");
    
    if(login){
      return true;
    }
    else {
      return false;
    }
  }


  function handleShow(date){
    setShow(date); //To filter the halldata with date and use it for CSS
    const hall = ah.filter((item)=> item.day===date);
    setData(hall); // It contains the filtered data according to date
  }

  let array = [];
  var d = new Date;
  for(let i=1;i<=6;i++){
    var a = new Date(d.setDate(d.getDate()-d.getDay()+i));
    array.push(a.toString().split(" ")[2]+" "+a.toString().split(" ")[1]);
  }

  const handleToggle=(id,booked,hallid,slotno)=>{
    
    if(booked){
      if(loginCheck()){
        alert("This hall is being booked!!! Please wait until confirmation arrives.");
        const updateData = data.filter((hall,i)=> hall._id === hallid);

        updateData[0].slots[slotno].slot = !updateData[0].slots[slotno].slot;
        updateData[0].slots[slotno].sid = gotSID;

        console.log(updateData[0]);
        axios.put(`http://localhost:4000/update/${hallid}`,updateData[0]);
      }
      else{
        alert("Please Login First !!!");
        navigate("/login");
      }
    }

    else{
      const staffid = {empid:id};
      axios.post("http://localhost:4000/search",staffid).then((res)=>{
          setBD(res.data);
        })
        alert(`This hall is booked by ${bookingdata.username} Mobile Number: ${bookingdata.mobno} `);
    }
  }

  const getHallData=()=>{
    
    try{

      axios.get("http://localhost:4000/").then((res)=>{
        setAh(res.data);
      });
      const user = localStorage.getItem("user");
      if(!user){
        setLoginAuth(false)
      }
      else{
        setLoginAuth(true);
        setGOTSID(user);
      }
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{getHallData()},[]);

  const dropDown=()=>{
    setDrop(!drop);
  }

  return (
    <div className="bg-[url('D:\Maddy\MERN\frontend\background\background.jpg')]  bg-no-repeat bg-cover bg-center h-screen w-screen flex flex-col items-center ">
    
     <div className='border-2 border-white relative  bg-blue-800 bg-opacity-80 flex flex-col items-center font-serif rounded-3xl p-6'>
     <div className="">
     <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <p class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-serif">HallGenie</p>            
            {loginAuth===false?<button className="text-white right-1 border-2 border-white">Login</button>:<button className={`${drop===false ?"text-white border-2 border-white":"text-blue-800 bg-white"}  absolute right-5  p-2`}   onClick={dropDown}>{gotSID}</button>}
      </div>
      <div classname="absolute">
      {drop && <div className="absolute right-5 ">
        <div className="bg-white flex flex-col p-[17.3px] ">
              <span className="mb-4 w-full"><button className="">Profile</button></span>
              <span><button>Logout</button></span>
              </div>
      </div>}
      </div>
      </div>
      
      <div className="flex mb-4 h-24 w-full justify-around items-center">
      {
        array.map((date)=>{
          return <div className="m-1">
            <button className={`h-12 w-12 border-2  ${show===date?"bg-white text-blue-800 font-bold h-16 w-14":" border-white text-white"}`} onClick={()=>{handleShow(date)}} >{date}</button>
          </div>
        })
      }
      </div>
      <h1 className="text-center mb-6 text-white text-3xl">Available Halls</h1>
      <div className="border-2 pr-2 border-[#C5CBE3]">
          {
            data.map((hall,i)=>{
              return <div key={i} className="flex items-center">
                <p className="pr-2 m-2 text-white text-center">{hall.hname}</p>
                <div className="flex flex-wrap">
                  {
                    hall.slots.map((s,i)=>{
                      return <div>
                        <button className={`${s.slot ? "text-green-400 border-2 border-green-400 m-2" : "text-[#C5CBE3] border-2 border-[#C5CBE3] m-2"}`}
                        onClick={()=>handleToggle(s.sid,s.slot,hall._id,i)}>
                          {s.name}</button>
                      </div>
                    })
                  }
              </div>
              </div>
            })
          }
      </div>
    </div>
    </div>
  );
}

export default Home