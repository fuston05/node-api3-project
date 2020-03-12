const express = require('express');
const posts= require('../posts/postDb');
const shortid = require('shortid');

const router = express.Router();

// custom middleware
function validatePostId(req, res, next) {
  console.log('validate post id');
  //if post id is missing... for some reason???
  if( !req.params.id ){
    res.status(400).json({
      message: "Missing ID parameter"
    });
    //if id cannot be found in DB
  }else{
    req.post= req.params.id;
    posts.getById(req.post)
      .then( post => {
        console.log('post form validatePostId: ', post);
        if(post){ // found a match
          next();
        }else{
          //no id match found in DB
          res.status(400).json({
            error: "Cannot find that post"
          });
        }//end if
      } )
      .catch(error => {
        res.status(500).json({
          error: "There was a server error"
        });
      })
  }//end if
}//end validatePostId

router.get('/', (req, res) => {
  res.status(200).json({
    message: "success from '/'"
  });
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json({
    message: "success from /:id of 'posts'"
  });
});

router.delete('/:id', validatePostId, (req, res) => {
  res.status(200).json({
    message: "success from /:id of 'delete posts'"
  });
});

router.put('/:id', validatePostId, (req, res) => {
  res.status(200).json({
    message: "success from /:id of ' put posts'"
  });
});

module.exports = router;
