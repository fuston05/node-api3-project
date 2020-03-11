const express = require('express');
const users= require('../users/userDb');

const router = express.Router();

//custom middleware
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

function validateUser(req, res, next) {
  //if body is missing or empty
  if( Object.keys(req.body).length <= 0 ){
    res.status(400).json({
      message: "missing user data"
    });
    //if name field is missing
  }else if(!req.body.name){
    res.status(400).json({
      message: "missing required name field"
    });
  }else{
    next();
  }//end if else
}//end validate user

router.post('/', validateUser, (req, res) => {
  res.status(200).json({messgae: "success"})
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  res.status(200).json({message: "success from /:id/posts"});
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

function validatePost(req, res, next) {
  console.log('validatePost: ', validatePost);
  // if body is empty
  if( Object.keys(req.body).length <= 0 ){
    res.status(400).json({
      message: "missing post data"
    });
    //if text field is not in the body
  }else if( !req.body.text ){
    res.status(400).json({
      message: "missing required text field"
    });
  }else{
    //if validation passes
    next();
  }//end if else
}//end validatePost

module.exports = router;
