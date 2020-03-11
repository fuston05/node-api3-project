const express = require('express');
const users= require('../users/userDb');

const router = express.Router();

function validateUserId(req, res, next) {
  // must have an id
  if( req.params.id ){
    req.user= parseInt(req.params.id);
    console.log('req.user', req.user);
    users.getById(req.user)
      .then( user => { //returns an array, empty array if not found
        console.log('user:', user);
        //if id found in DB
        if(user){
          next();
        }else{
          res.status(400).json({message: "invalid user id"});
        }//if post
      } )
      .catch( error => {
        res.status(500).json({error: "There was a problem with the server"});
      } )
  }else{
    res.status(400).json({message: "invalid user id"});
  }// end if req.params.id
}//end validateUserId

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  console.log('req.params.id:', req.params.id)
  res.status(200).json({messgae: "success"})
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware



function validateUser(req, res, next) {
  // do your magic!
}//end validate user

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
