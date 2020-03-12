const express = require('express');
const users= require('../users/userDb');
const posts= require('../posts/postDb');
const shortid = require('shortid');

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

//route handlers
//create a new user
router.post('/', validateUser, (req, res) => {
  users.insert(req.body)
  .then( user => {
    res.status(201).json({user});
  } )
  .catch(error => {
    res.status(500).json({
      error: "Could not process your request"
    })
  })
});

// add a post for a given user by id
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  posts.insert(req.body)
  .then( post => {
    res.status(201).json({post});
  } )
  .catch(error => {
    error: "Could not process your request"
  });
});

//get all users
router.get('/', (req, res) => {
  users.get()
  .then( users => {
    res.status(200).json({users});
  })
  .catch(error => {
    res.status(500).json({
      error: "Could not process your request"
    });
  })
});

//get a user by ID
router.get('/:id', validateUserId, (req, res) => {
  users.getById(req.params.id)
  .then(user => {
    res.status(200).json({user})
  })
  .catch(error => {
    res.status(500).json({
      error: "could not process your request"
    });
  })
});

//get all posts for a user: by their ID
router.get('/:id/posts', validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
  .then( posts => {
    res.status(200).json({posts});
  } )
  .catch(error => {
    res.status(500).json({error: "Could not process your request"});
  })
});

//delete a user by ID
router.delete('/:id', validateUserId, (req, res) => {
  users.remove(req.params.id)
  .then( delRes => {
    res.status(200).json({delRes});
  })
  .catch(error => {
    res.status(500).json({error: "Could not process your request"});
  })
});

// edit a uer by ID
router.put('/:id', validateUserId, (req, res) => {
  !req.body.name ? res.status(400).json({error: "Must have a name"}) : null
  users.update(req.params.id, req.body)
  .then( user => {
    res.status(200).json({user});
  } )
  .catch(error => {
    res.status(500).json({
      error: "Could not process your request"
    })
  });
});

module.exports = router;
