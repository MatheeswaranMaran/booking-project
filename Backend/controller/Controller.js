const mongoose = require('mongoose');
const regmodel = require("../models/RegModel.js");
const hallmodel = require("../models/HallModel.js");

const registerUser = async(req,res) =>{
    const {username,dept,empid,mobno,password} = req.body
    
    try{
        const eid = await regmodel.findOne({empid:empid});
        if(!eid){
            const register = await regmodel.create({username,dept,empid,mobno,password});
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



module.exports = { registerUser,loginUser };