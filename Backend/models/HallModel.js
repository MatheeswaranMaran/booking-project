const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HallSchema = new Schema({
    hall:{
        type:String,
    },
    date:{
        type:String,
        required:true
    },
    slots:[
        {
            slot1:{type:Boolean},
            sid:{type:String}
        },
        {
            slot2:{type:Boolean},
            sid:{type:String}
        },
        {
            slot3:{type:Boolean},
            sid:{type:String}
        },
        {
            slot4:{type:Boolean},
            sid:{type:String}
        },
        {
            slot5:{type:Boolean},
            sid:{type:String}
        },
        {
            slot6:{type:Boolean},
            sid:{type:String}
        },
        {
            slot7:{type:Boolean},
            sid:{type:String}
        },
        {
            slot8:{type:Boolean},
            sid:{type:String}
        }
    ]
});

module.exports = mongoose.model("Hall",HallSchema);