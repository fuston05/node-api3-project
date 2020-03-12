import React from 'react';

//styles
import '../sass/User.scss';

export const User= ({user}) => {
  return(
    <div className= 'card'>
      <h2>Name: {user.name}</h2>
    </div>
  )
}//end Users
