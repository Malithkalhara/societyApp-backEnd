var mongoose=require('mongoose');
var member =require('../models/member.model');

var schema=mongoose.Schema;

let societySchema=new schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    accno:{
        type:String
    },
    members:[{
        year:Number,
        members:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'member'
            
        }]
    }]
});

const society=mongoose.model('society',societySchema);
module.exports=society;