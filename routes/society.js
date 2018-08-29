var express = require('express');
var jwt    = require('jsonwebtoken');
var config = require('../config');

const society =require('../models/society.model');

var router = express.Router();

//aUTHENTIcation
router.post('/authenticate', function(req, res) {

  // find the society
  society.findOne({
    email: req.body.email
  }, function(err, society) {

    if (err) throw err;

    if (!society) {
      res.json({ success: false, message: 'Authentication failed. Invalid Society email.' });
    } else if (society) {

      // check if password matches
      if (society.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if society is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire society since that has the password
    const payload = {
      email: society.email
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

    }

  });
});

/* GET home page. */
router.get('/',(req,res)=>{
  society.find((err,socities)=>{
      if(err)
          Console.log('err');
      
      else
         res.json(socities) ;
  });
});

router.get('/:name',(req,res)=>{
  society.findOne({
    name: req.params.name
  },(err,society)=>{
      if(err)
          console.log(err);

      else
          res.json(society);
  })
})

router.post('/register',(req,res)=>{
  let soc=new society(req.body);
  soc.save()
      .then(soc=>{
          res.status(200).json({'society':'Added successfully'});
      })
      .catch(err =>{
          res.status(400).send(err);
      });              
});

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

router.post('/update/:name',(req,res)=>{
  if(req.decoded.name == req.params.name){
    //update code
    society.findOne(req.params.name,(err,soc)=>{
      if(!soc)
          res.send('Document not found');

      else
          soc.name=req.body.name
          soc.email=req.body.email

          soc.save().then(soc=>{
              res.json('Updated done');
          }).catch(err=>{
              res.status(400).send('Updated failed');
          });
  });
  }else{
    res.json({sucess:false,message:"Society names mismatch"})
  }
  
});
module.exports = router;