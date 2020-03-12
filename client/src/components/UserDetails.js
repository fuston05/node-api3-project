import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

export const UserDetails = ({users}) => {
  const {id}= useParams();

  useEffect(() => {
    const currUser= users.filter(user => {
      console.log('currUser: ', currUser);
      return(
        user.id === id
      )
    });
  }, [])

  return (
    <div>
      userDetails
      {/* {currUser && currUser.name} */}
    </div>
  )
}
