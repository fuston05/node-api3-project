const express = require('express');
const cors= require('cors');
const moment = require('moment');

//routes
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const helmet = require('helmet');

const server = express();

//middleWare
server.use(helmet());
server.use(cors());
server.use(logger);
server.use(express.json());

//custom middleware
function logger(req, res, next) {
  const ts = `"${moment(new Date(Date.now()), "MM-DD-YYYY")}"`;
  const method = `"${req.method}"`;
  const fromURL = `"${req.url}"`;
  const protocol = `"${req.protocol}"`;
  const ip = `"${req.ip}"`;
  const contentType = `"${req.get('content-type')}"`

  //output
  console.log(`\n** LOGGER: **\n A ${method} request was made to URL: ${fromURL} \n Timestamp: ${ts}, \n protocol: ${protocol},\n ip: ${ip}, \ncontent-type: ${contentType}
  `);

  next();
}//end logger

//routes
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Welcome: ${req.hostname} to my API</h2>`);
});

//catch-all/fall-back case
server.use(function notFound(req, res, next){
  res.status(404).json({error: "We could not find what you are looking for"})
});

module.exports = server;
