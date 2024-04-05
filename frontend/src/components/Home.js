import React,{useState,useEffect} from "react";

import axios from 'axios';

function Home() {

  const [ah,setAh] = useState();

  const [data,setData] = useState([]);

  const [show,setShow] = useState();

  const [bookingdata, setBD] = useState([]);

  function handleShow(date){
    setShow(date);
    const hall = ah.filter((item)=> item.day===date);
    setData(hall);
  }

  let array = [];
  var d = new Date;
  for(let i=1;i<=6;i++){
    var a = new Date(d.setDate(d.getDate()-d.getDay()+i));
    array.push(a.toString().split(" ")[2]+" "+a.toString().split(" ")[1]);
  }

  const handleToggle=(id,booked)=>{
    const staffid = {empid:id};
    console.log(bookingdata);
    if(booked){
      alert("This hall is being booked!!! Please wait until confirmation arrives.");
    }
    
    else{
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
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{getHallData()},[]);

  return (
    <div className="bg-[url('D:\Maddy\MERN\frontend\background\background.jpg')]  bg-no-repeat bg-cover bg-center h-screen w-screen flex justify-center items-center ">
     <div className='border-2 border-white  bg-blue-800 bg-opacity-80 flex flex-col items-center justify-center font-serif rounded-3xl p-6'>
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
                        onClick={()=>handleToggle(s.sid,s.slot)}>
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