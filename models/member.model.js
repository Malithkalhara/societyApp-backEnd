var mongoose=require('mongoose');

var schema=mongoose.Schema;

let memberSchema=new schema({
    fname:{
        type:String
    },
    regno:{
        type:String
    },
    mobile:{
        type:Number
    },
    email:{
        type:String
    },
    faculty:{
        type:String
    },
    socpost:{
        type:String
    },
});

var member=mongoose.model('member',memberSchema);
module.exports=member;