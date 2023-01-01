import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cover = () => {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState({});
    const [fileProfile, setFileProfile] = useState(null);
    const [fileCover, setFileCover] = useState(null);


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
    

    const coverHandler = async (e) => {
        e.preventDefault();

        const newCover = {
            userId: userInfo._id,
        };

        if(fileCover) {
            const data = new FormData();
            const fileName = Date.now() + fileCover.name;
            data.append('name', fileName);
            data.append('file', fileCover);
            newCover.imagecover = fileName;
            try {
                await axios.post('/api/upload', data);
            } catch(err) {
                toast.error('Error adding image!');
            }
        }

        try {

            await axios.put('/api/users/update/'+userInfo._id, newCover);
            window.location.reload();

        } catch(err) {
            toast.error('Error adding a new cover image!');
        }

       
    }

    const profileHandler = async(e) => {
        e.preventDefault();

        const newProfile = {
            userId: userInfo._id,
        };

        if(fileProfile) {
            const data = new FormData();
            const fileName = Date.now() + fileProfile.name;
            data.append('name', fileName);
            data.append('file', fileProfile);
            newProfile.imageprofile = fileName;
            try {
                await axios.post('/api/upload', data);
            } catch(err) {
                toast.error('Error adding image!');
            }
        }

        try {

            await axios.put('/api/users/update/'+userInfo._id, newProfile);
            window.location.reload();

        } catch(err) {
            toast.error('Error adding a new cover image!');
        }
    
    }


  return (
    <div className="accountDiv">
        <form onSubmit={coverHandler}>
            <div className="accountCover">
            
                <label htmlFor="coverImg">
                    <img src={`./assets/images/upload/${userInfo.imagecover}`} alt={userInfo.username} />
                    {fileCover && <button className='addCoverImg'>Add</button>}
                </label>
                <input type="file" id='coverImg' hidden accept='.png, .jpg, .jpeg' onChange={(e) => setFileCover(e.target.files[0])}  />
            </div>
        </form>
        <div className="accountInfo">
            <form onSubmit={profileHandler}>
                <div className="accountInfoLeft">
                  <label htmlFor="profileImg">
                        <img src={`./assets/images/upload/${userInfo.imageprofile}`} alt={userInfo.username} />
                        {fileProfile && <button className='addProfileImg'>Add</button>}
                    </label>
                    <input type="file" id='profileImg' hidden accept='.png, .jpg, .jpeg' onChange={(e) => setFileProfile(e.target.files[0])} />
                </div>
            </form>
            <div className="accountInfoRight">
                <h2 className="userName">{userInfo.username}</h2>
                <span className="userFriends">friends: {friends.length}</span>
                <div className="friends">
                    {
                        friends.length === 0 ? (
                            <span>No friends...</span>
                        ) : (
                            <>
                                {
                                    friends?.slice(-4).map((friend) => (
                                        <Link to={`/user/${friend._id}`} key={friend._id}>
                                            <img src={`./assets/images/upload/${friend.imageprofile}`} alt={friend.username} />
                                        </Link>
                                    ))
                                }
                                <span className='dots'>...</span>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cover