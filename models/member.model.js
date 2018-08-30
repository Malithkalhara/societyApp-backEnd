var mongoose=require('mongoose');

var schema=mongoose.Schema;

let memberSchema=new schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    regNo:{
        type:String
    },
    post:{
        type:String
    },
    contactNo:{
        type:String
    },
    email:{
        type:String
    },
    faculty:{
        type:String
    },
});

var member=mongoose.model('member',memberSchema);
module.exports=member;