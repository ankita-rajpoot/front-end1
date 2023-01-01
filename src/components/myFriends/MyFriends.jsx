import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const MyFriends = ({friend}) => {
    
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const [followed, setFollowed] = useState(userInfo.followings.includes(friend?.id));

    const followHandler = async() => {
      try {

          if(followed) {

              await axios.put('/api/users/'+friend._id+'/unfollow', {userId: userInfo._id});

          } else {

              await axios.put('/api/users/'+friend._id+'/follow', {userId: userInfo._id});

          }

      } catch(error) {
          console.log(error);
      }
      setFollowed(!followed); //if true will be false, if false will be true
    }

  const unfollow = userInfo.followings.includes(friend?._id);

  return (
    <Link to={`/user/${friend._id}`}>
        <div className="friendsGroup">
            <img className='friendsImg' src={`./assets/images/upload/${friend.imageprofile}`} alt={friend.username} />
            <p className="friendsName">{friend.username}</p>
            <button onClick={followHandler}>{unfollow === !followed ? "Unfollow" : "Follow"}</button>
        </div>
    </Link>
  )
}

export default MyFriends