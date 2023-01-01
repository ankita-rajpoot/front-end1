import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'

const OCover = () => {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const location = useLocation();
    console.log(location);
    const id = location.pathname.split('/')[2];
    console.log(id);

    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState([]);
    const [followed, setFollowed] = useState(userInfo.followings.includes(user?.id)); //check if i follow a user, default is false
    const [fileProfile, setFileProfile] = useState(null);
    const [fileCover, setFileCover] = useState(null);
    

    useEffect(() => {
        const getUser = async() => {
            try {
      
              const userData = await axios.get('/api/users/'+id);
              setUser(userData.data);
              console.log(userData.data);

                const myFriends = await axios.get('/api/users/friends/'+id);
                setFriends(myFriends.data);
                console.log(myFriends.data);
      
            } catch(error) {
              console.log(error);
            }
          }
      
          getUser();
    }, [id]);

    const followHandler = async() => {
        try {

            if(followed) {

                await axios.put('/api/users/'+user._id+'/unfollow', {userId: userInfo._id});

            } else {

                await axios.put('/api/users/'+user._id+'/follow', {userId: userInfo._id});

            }

        } catch(error) {
            console.log(error);
        }
        setFollowed(!followed); //if true will be false, if false will be true
    }

    const unfollow = userInfo.followings.includes(user._id);
    
  return (
    <div className="accountDiv">
        <div className="accountCover">
            <img src={`../assets/images/upload/${user.imagecover}`} alt={user.username} />
        </div>
        <div className="accountInfo">
            <div className="accountInfoLeft">
                <img src={`../assets/images/upload/${user.imageprofile}`} alt={user.username} />
            </div>
            <div className="accountInfoRight">
                <h2 className="userName">{user.username}</h2>
                <span className="userFriends">friends: {user.followings?.length}</span>
                <div className="friends">
                    {
                        friends.length === 0 ? (
                            <span>No friends...</span>
                        ) : (
                            <>
                                {
                                    friends?.slice(-4).map((friend) => (
                                        <Link to={`/user/${friend._id}`} key={friend._id}>
                                            <img src={`../assets/images/upload/${friend.imageprofile}`} alt={friend.username} />
                                        </Link>
                                    ))
                                }
                                <span className='dots'>...</span>
                            </>
                        )
                    }
                </div>
                
                <button onClick={followHandler} className='unfriend'>{unfollow === !followed ? "Unfollow" : "Follow"}</button> 
            </div>
        </div>
    </div>
  )
}

export default OCover