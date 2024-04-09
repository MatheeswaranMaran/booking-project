const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HallSchema = new Schema({
    day:{
        type:String,
    },
    hname:{
        type:String,
        required:true
    },
    slots:[
        {
            slot:{type:Boolean},
            name:{type:String},
            sid:{type:String}
        },
        {
            slot:{type:Boolean},
            name:{type:String},
            sid:{type:String}
        },
        {
            slot:{type:Boolean},
            name:{type:String},
            sid:{type:String}
        },
        {
            slot:{type:Boolean},
            name:{type:String},
            sid:{type:String}
        },
        {
            slot:{type:Boolean},
            name:{type:String},
            sid:{type:String}
        },
        {
            slot:{type:Boolean},
            name:{type:String},
            sid:{type:String}
        },
        {
            slot:{type:Boolean},
            name:{type:String},
            sid:{type:String}
        },
        {
            slot:{type:Boolean},
            name:{type:String},
            sid:{type:String}
        }
    ]
});

module.exports = mongoose.model("Hall",HallSchema);