import React from 'react'
import { Link } from 'react-router-dom'

const OOnlineFriends = ({user}) => {
  return (
    <Link to={`/user/${user._id}`}>
      <div className="onlineGroup">
        <div className="onlineGroupLeft">
            <img src={`../assets/images/upload/${user.imageprofile}`} alt={user.username} className="onlineUserImage" />
            <div className="onlineBadge"></div>
        </div>
        <div className="onlineGroupRight">
            <span className='onlineUserName'>{user.username}</span>
        </div>
      </div>
    </Link>
  )
}

export default OOnlineFriends