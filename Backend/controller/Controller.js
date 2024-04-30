const mongoose = require('mongoose');
const regmodel = require("../models/RegModel.js");
const hallmodel = require("../models/HallModel.js");

const registerUser = async(req,res) =>{
    const {username,dept,empid,mobno,email,password} = req.body
    
    try{
        const eid = await regmodel.findOne({empid:empid});
        if(!eid){
            const register = await regmodel.create({username,dept,empid,mobno,email,password});
            res.status(200).json(register);
        }
        else{
            res.status(200).json("empid exists");
        }
    }
    catch(e){
        res.status(400).json({error:e.message});
    }

};

const loginUser = async(req,res) =>{
    const {empid,password} = req.body
    try{
        const login = await regmodel.findOne({empid: empid , password : password});
            return res.status(200).json(login);
    }
    catch(e){
        res.status(400).json({Error:"Employee ID does not exist"});
    }
}

const searchUser = async(req,res) => {
    const {empid} = req.body
    try{
        const search = await regmodel.findOne({empid:empid});
        if(!search){
            res.status(400).json();
            console.log("Loading");
        }
        else{
            res.status(200).json(search);
        }
    }
    catch(e){
        res.status(400).json({Error:"No Employee Found with this EmpID!"});
    }
}

const getHallData = async(req,res)=>{
    try{
         const data = await hallmodel.find();
         res.status(200).json(data);
    }
    catch(e){
        res.status(400).json({Error: e.message});
    }
}

const updateHallStatus = async(req,res)=>{
    const {id} = req.params;
    try{
        const hall = await hallmodel.findByIdAndUpdate({_id:id},{...req.body});
        res.status(200).json(hall);
    }
    catch(e){
        res.status(400).json({Error:e.message});
    }
}

const updateUserData = async(req,res)=>{
    const {id} = req.params;
    try{
        const data = await regmodel.findByIdAndUpdate({_id:id},{$push:{booking:req.body}});
        res.status(200).json(data);
    }
    catch(e){
        res.status(400).json({Error:e.message});
    }
}


module.exports = { registerUser,loginUser,searchUser, getHallData, updateHallStatus, updateUserData };