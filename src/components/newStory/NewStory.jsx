import axios from 'axios';
import React, { useEffect, useState } from 'react'

const NewStory = ({story}) => {

    const [users, setUsers] = useState({}); //empty object for default

    useEffect(() => {
    
        const fetchUsers = async() => {
          const resultStory = await axios.get(`/api/users/${story.userId}`);
          setUsers(resultStory.data);
          console.log(resultStory.data);
        }
        fetchUsers();
    
    }, [story.userId]);

  return (
    <div className="storyGroup">
        <div className="storyDiv">
            <div className="storyUserAddImgDiv">
                <img src={`./assets/images/upload/${users.imageprofile}`} className='storyUserAddImg' alt={users.username} />
            </div>
            <div className="storyUser">
                <img src={`./assets/images/upload/${story?.image}`} alt="" />
            </div>
            <div className="storyUserTitle">
                <h5>{users.username}</h5>
            </div>
        </div>
    </div>
  )
}

export default NewStory