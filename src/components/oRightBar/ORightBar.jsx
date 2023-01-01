import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OOnlineFriends from '../oOnlineFriends/OOnlineFriends'

const ORightBar = () => {

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    
    const getFriends = async() => {
      try {

        const resultPosts = await axios.get(`/api/users/${userInfo._id}`);
        setUsers(resultPosts.data);
        console.log(resultPosts.data);

        const myFriends = await axios.get('/api/users/friends/'+users._id);
        setFriends(myFriends.data);
        console.log(myFriends.data);

        } catch(error) {
          console.log(error);
        }
      }

    getFriends();

  }, [userInfo._id, users._id]);

  return (
    <div className='rightbar'>
      <h4 className="online">Online Friends</h4>
      <div className="onlineGroups">
        {
          userInfo.followings?.length === 0 ? (
            <span>No friends...</span>
          ) : (
            friends?.map((user) => (
              <OOnlineFriends user={user} key={user._id} />
            ))
          )
        }
        
      </div>
    </div>
  )
}

export default ORightBar