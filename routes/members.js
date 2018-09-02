var express = require('express');
var jwt    = require('jsonwebtoken');
var router = express.Router();
var config = require('../config');

var member =require('../models/member.model');


//aUTHENTIcation
router.post('/authenticate', function(req, res) {

    // find the society
    member.findOne({
      regno: req.body.regno
    }, function(err, member) {
  
      if (err) throw err;
  
      if (!member) {
        res.json({ success: false, message: 'Authentication failed. Invalid registration number.' });
      } else {
  
          // if society is found and password is right
          // create a token with only our given payload
      // we don't want to pass in the entire society since that has the password
      const payload = {
        regno: member.regno
      };
          var token = jwt.sign(payload, config.secret, {
           // expiresInMinutes: 1440 // expires in 24 hours
          });
  
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }   
  
    });
  });

router.get('/',(req,res)=>{
    member.find((err,member)=>{
        if(err)
            Console.log('err');
        
        else
           res.json(member) ;
    });
});

router.post('/add',(req,res)=>{
    let memberone=new member(req.body);
    memberone.save()
        .then(memberone=>{
            res.status(200).json({'Member':'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send(err);
        });              
});

router.get('/:regno',(req,res)=>{
    member.findOne({
      regno: req.params.regno
    },(err,member)=>{
        if(err)
            console.log(err);
  
        else
            res.json(member);
    });
});

router.post('/update/:regno',(req,res)=>{
    if(req.decoded.regno == req.params.regno){
      //update code
      member.findOneAndUpdate({regno: req.params.regno},
        {
            name : req.body.name,
            email : req.body.email,
            regno :req.body.regno,
            mobile:req.body.mobile,
            faculty:req.body.faculty,
            socpost:req.body.socpost
            },(err, member)=>{
  
              if(err) res.json(err);
            else
            { 
              res.json(member);
              
            }
            })
    }else{
      res.json({sucess:false,message:"member regno mismatch"})
    }
});

router.delete('/delete/:regno', (req, res) => {
    member.findOneAndRemove({regno: req.params.regno}, (err) => {
      if (err) {
        res.json(err)
      }

      res.json({success:true,message:'Member deleted!!'})
    });
    
});





module.exports = router;
