const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegSchema = new Schema(
    {
        username:{
            type:String,
            require:true
        },
        dept:{
            type:String,
            require:true
        },
        empid:{
            type:String,
            require:true
        },
        mobno:{
            type:Number,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        booking:[{
            hname:{type:String},
            slot:{type:String},
            day:{type:String},
            slotno:{type:Number}
        }]
    }
);
module.exports = mongoose.model("Register",RegSchema);