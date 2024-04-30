import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Profile() {
    const [userdata,setUD] = useState();
    const [halldata,setHall] = useState([]);
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    console.log(user);
    const getUserData=() =>{
        try{
        const userid = {empid:user};
        axios.post("http://localhost:4000/search",userid).then((res)=>{setUD(res.data);});
        axios.get("http://localhost:4000/").then((res)=>{setHall(res.data);});
        }
        catch{
            alert("loading");
        }
}
useEffect(()=>{getUserData()},[]);

const navHome=()=>{
    navigate("/home")
}

const handleCancel=(name,day,sno,i)=>{
    const hall = halldata.filter((h)=>h.hname===name && h.day===day);
    hall[0].slots[sno].slot = !hall[0].slots[sno].slot;
    hall[0].slots[sno].sid = "";
    const hallid = hall._id;
    userdata.booking.splice(i);

    
    try{
        axios.put(`http://localhost:4000/update/${hallid}`,hall[0]);
    }catch{

    }
    console.log(hall);
}

  return (
    <div className='bg-[url("D:\Maddy\MERN\frontend\background\background.jpg")] h-screen bg-black bg-no-repeat bg-center'>
        <button className=" bg-blue-800 p-2 opacity-80 font-serif absolute right-3 top-3 text-white" onClick={navHome}>Home Page</button>
        <div className='p-4 bg-opacity-80 bg-white font-serif text-blue-800 mb-4'><p className='text-5xl text-center'>Profile</p></div>
        <div className='bg-blue-800 opacity-80 text-white font-serif flex flex-col justify-center'>
            <p className='mb-2'>Staff Name:{userdata?.username}</p>
            <p className='mb-2'>Staff ID: {userdata?.empid}</p>
            <p className='mb-2'>Number of Booked Halls:{userdata?.booking.length}</p>
            <p className='flex justify-center'>Booking Details</p>
            <div className='flex flex-wrap w-screen'>
                {
                    userdata?.booking.map((data,i)=>{
                        return(<div className='border-2 border-white m-4 p-2' key={i}>
                            <p>Hall Name: {data.hname}</p>
                            <p>Hall Day: {data.day}</p>
                            <p>Hall Booked Time: {data.slot}</p> 
                            <button className='bg-white w-full text-blue-800 font-bold' onClick={()=>{handleCancel(data.hname,data.day,data.slotno,i)}}>Cancel</button>
                        </div>)
                    })
                }
            </div>
        </div>
    </div>
  )
}
export default Profile