import React,{useState} from "react";

function Home() {

  const [ah,setAh] = useState([{
    "hname":"Lord Iyyappan Hall",
    "day" : "Monday",
    "slot1":true,
    "slot2":true,
    "slot3":true,
    "slot4":false,
    "slot5":true,
    "slot6":true,
    "slot7":false,
    "slot8":true,
  }]);

  const [show,setShow] = useState();

  function handleShow(date){
    setShow(date);
  }
  


  let array = [];
  var d = new Date;
  for(let i=1;i<=6;i++){
    var a = new Date(d.setDate(d.getDate()-d.getDay()+i));
    array.push(a.toString().split(" ")[2]+" "+a.toString().split(" ")[1]);
  }

  return (
    <div className="bg-[url('D:\Maddy\MERN\frontend\background\background.jpg')]  bg-no-repeat bg-center h-screen w-screen flex justify-center items-center ">
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
            ah.map((hall,i)=>{
              return <div key={i} className="flex items-center">
                <p className="pr-2 m-2 text-white text-center">{hall.hname}</p>
                <div className="flex flex-wrap">
                <button className={`${hall.slot1 ? "text-green-400 border-2 border-green-400 m-2" : "text-[#C5CBE3] border-2 border-[#C5CBE3] m-2"}`}>Slot1</button>
                <button className={`${hall.slot2 ? "text-green-400 border-2 border-green-400 m-2" : "text-[#C5CBE3] border-2 border-[#C5CBE3] m-2"}`}>Slot2</button>
                <button className={`${hall.slot3 ? "text-green-400 border-2 border-green-400 m-2" : "text-[#C5CBE3] border-2 border-[#C5CBE3] m-2"}`}>Slot3</button>
                <button className={`${hall.slot4 ? "text-green-400 border-2 border-green-400 m-2" : "text-[#C5CBE3] border-2 border-[#C5CBE3] m-2"}`}>Slot4</button>
                <button className={`${hall.slot5 ? "text-green-400 border-2 border-green-400 m-2" : "text-[#C5CBE3] border-2 border-[#C5CBE3] m-2"}`}>Slot5</button>
                <button className={`${hall.slot6 ? "text-green-400 border-2 border-green-400 m-2" : "text-[#C5CBE3] border-2 border-[#C5CBE3] m-2"}`}>Slot6</button>
                <button className={`${hall.slot7 ? "text-green-400 border-2 border-green-400 m-2" : "text-[#C5CBE3] border-2 border-[#C5CBE3] m-2"}`}>Slot7</button>
                <button className={`${hall.slot8 ? "text-green-400 border-2 border-green-400 m-2" : "text-[#C5CBE3] border-2 border-[#C5CBE3] m-2"}`}>Slot8</button>
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