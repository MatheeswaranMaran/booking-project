import React,{useState,useEffect} from "react";

import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Home() {

  const [ah,setAh] = useState();

  const [data,setData] = useState([]);

  const [show,setShow] = useState();

  const [bookingdata, setBD] = useState([]);

  const [isLogin, setIsLogin] = useState();

  const navigate = useNavigate();

  const [loginAuth,setLoginAuth] = useState();

  const [gotSID, setGOTSID] = useState();

  const [drop,setDrop] = useState(false);

  const [regdata,setRD] = useState([]);

  const [loading,setLoading] = useState();

  const loginCheck=()=>{
    const login = localStorage.getItem("login");
    console.log(login);
    
    if(login==="true"){
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

  const logOut=()=>{
    localStorage.setItem("login",false);
    localStorage.setItem("user","");
    window.location.reload();
  }


  const handleToggle=async(id,booked,hallid,slotno)=>{
    
    if(booked){
      if(loginCheck()){
        try{
          setLoading(true);
          alert("This hall is being booked!!! Please wait until confirmation arrives.");
        const updateData = data.filter((hall,i)=> hall._id === hallid);

        updateData[0].slots[slotno].slot = !updateData[0].slots[slotno].slot;
        updateData[0].slots[slotno].sid = gotSID;

        axios.put(`http://localhost:4000/update/${hallid}`,updateData[0]);

        const bh = updateData[0].hname;
        const bs = updateData[0].slots[slotno].name;
        const bd = updateData[0].day;
        
        const update = {hname:bh,slot:bs,day:bd,slotno:slotno};
        axios.put(`http://localhost:4000/updateuser/${regdata._id}`,update);
        }
        catch(e){alert(e);}
        finally{
          setLoading(false);
        }
      }
      else{
        alert("Please Login First !!!");
        navigate("/");
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
  const getData=()=>{
    
      axios.get("http://localhost:4000/").then((res)=>{setAh(res.data);});
      const user = localStorage.getItem("user");
      if(!user){
        setLoginAuth(false)
      }
      else{
        setLoginAuth(true);
        try{
        setLoading(true);
        const sid = {empid:user};
        console.log();
        axios.post("http://localhost:4000/search",sid).then((res)=>{setRD(res.data);});
        console.log(regdata);
        }catch(e){}
        finally{
          setLoading(false);
        }
      }
  }

  useEffect(()=>{getData()},[]);


  const dropDown=()=>{
    setDrop(!drop);
  }

  const multipleSlotBooking=()=>{
    navigate("/multipleslotbooking");
  }
  
  const logIn=()=>{
    navigate("/");
  }
  
  return (
    <div className="bg-[url('D:\Maddy\MERN\frontend\background\background.jpg')]  bg-no-repeat bg-cover bg-center h-screen w-screen flex flex-col items-center ">
    {loading && <p>Loading...</p>}
    {!loading && 
     <div className='border-2 border-white relative  bg-[#114B5F] bg-opacity-80 flex flex-col items-center w-screen font-serif rounded-3xl p-6'>
     <div className="">
     <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <p class="self-center text-3xl font-semibold whitespace-nowrap text-white font-serif">HallGenie</p>            
            {loginAuth===false?<button className="text-white border-2 border-white absolute right-5  p-2" onClick={logIn}>Login</button>:<button className={`${drop===false ?"text-white border-2 border-white":"text-[#1A936F] bg-white"}  absolute right-5  p-2`}   onClick={dropDown}>{localStorage.getItem("user")}</button>}
            
      </div>
      <div classname="absolute">
      {drop && <div className="absolute right-5 ">
        <div className="bg-white flex flex-col p-[17.3px] text-blue-800 font-serif ">
              <span className="mb-4 w-full text-[#1A936F]"><Link to={{pathname:'/profile',state:{regdata}}}>Profile</Link></span>
              <span><button className="text-[#1A936F]" onClick={logOut}>Logout</button></span>
              </div>
      </div>}
      </div>
      </div>
      
      <div className="flex mb-4 h-24 w-full justify-around items-center">
      {
        array.map((date)=>{
          return <div className="m-1">
            <button className={`h-12 w-12 border-2  ${show===date?"bg-[#F3E9D2] text-[#114B5F] font-bold h-16 w-14":" border-[#F3E9D2] text-[#F3E9D2]"}`} onClick={()=>{handleShow(date)}} >{date}</button>
          </div>
        })
      }
      </div>
      <button onClick={multipleSlotBooking} className="mb-4 border-2 border-white text-white p-2">For Multiple Slot Booking</button>
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
                        <button className={`${s.slot ? "text-[#88d498] border-2 border-[#88d499] mr-1 mb-1 mt-1" : "text-[#F3E9D2] border-2 border-[#F3E9D2] mr-1 mb-1 mt-1"} font-mono pl-1 pr-1 font-semibold w-[125px] flex-wrap`}
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
    </div>}
    </div>
  );

}

export default Home