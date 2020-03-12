const express = require('express');
const posts= require('../posts/postDb');

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

//get all posts
router.get('/', (req, res) => {
  posts.get()
  .then( posts => {
    res.status(200).json({posts});
  } )
  .catch(error  => {
    res.status(500).json({error: "Could not process your request"})
  });
});

//get a post by its id
router.get('/:id', validatePostId, (req, res) => {
  posts.getById(req.params.id)
  .then( post => {
    res.status(200).json({post});
  } )
  .catch(error => {
    res.status(500).json({error: "Could not process your request"});
  })
});

//delete a post by its ID
router.delete('/:id', validatePostId, (req, res) => {
  posts.remove(req.params.id)
  .then( post => {
    res.status(200).json({post});
  } )
  .catch(error => {
    res.status(500).json({error: "Could not process your request"})
  })
});

//edit/update a post by its ID
router.put('/:id', validatePostId, (req, res) => {
  posts.update(req.params.id, req.body)
  .then( post => {
    res.status(200).json({post});
  } )
  .catch(error => {
    res.status(500).json({error: "Could not process your request"});
  })
});

module.exports = router;
