import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

//components
import { User } from './components/User';
import {UserDetails} from './components/UserDetails';

//styles
import './sass/index.scss';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users/')
      .then(res => {
        setUsers(res.data.users);
        console.log('res.data: ', res.data);
      })
      .catch(err => { console.log('err: ', err); })
  }, []);

  return (
    <div className="App">
      <h1>Users API</h1>
      {
        users && users.map(user => {
          return (
            <User
              key={user.id}
              user={user}
            />)
        })//end map
      }
      <Route exact path= 'userdetails/:id'>
        <UserDetails 
          users= {users}
        />
      </Route>
    </div>
  );
}

export default App;
