const mongoose=require('mongoose');

const schema=mongoose.Schema;

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
            name:String,
            faculty:String
        }]
    }]
});

const society=mongoose.model('society',societySchema);
module.exports=society;