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
    password:{
        type:String
    },
    accno:{
        type:String
    },
    count:{
        type:Number
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