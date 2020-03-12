require('dotenv').config();
//import server
const server= require('./server');

const port= process.env.PORT || 5001;
server.listen(port, () => {
  console.log( ` \n ** Server running on http://localhost: ${port} ** \n ` );
});