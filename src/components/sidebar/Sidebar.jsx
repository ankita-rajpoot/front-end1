import { faAdd, faArrowDown, faBook, faEye, faPhotoFilm, faShop, faUserGroup, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  return (
    <div className='sidebar'>
        <div className="sidebarGroups">
            {
                userInfo && (
                    <div className="sidebarGroup">
                        <Link to='/account' className='sidebarLink'>
                            <img src={`./assets/images/upload/${userInfo.imageprofile}`} alt="" className="currentUserImg" />
                            <span className='currentUserName'>{userInfo.username}</span>
                        </Link>
                    </div>
                )
            }
            <div className="sidebarGroup">
                <FontAwesomeIcon icon={faUsers} />
                <Link to='/friends' className="subTitle">Friends</Link>
            </div>
            <div className="sidebarGroup">
                <FontAwesomeIcon icon={faAdd} />
                <Link to='/add' className="subTitle">Add Friends</Link>
            </div>
            <div className="sidebarGroup">
                <FontAwesomeIcon icon={faUserGroup} />
                <Link to='/groups' className="subTitle">Groups</Link>
            </div>
            <div className="sidebarGroup">
                <FontAwesomeIcon icon={faShop} />
                <Link to='/marketplace' className="subTitle">Marketplace</Link>
            </div>
            <div className="sidebarGroup">
                <FontAwesomeIcon icon={faEye} />
                <Link to='/watch' className="subTitle">Watch</Link>
            </div>
            <div className="sidebarGroup">
                <FontAwesomeIcon icon={faBook} />
                <Link to='/pages' className="subTitle">Pages</Link>
            </div>
            <div className="sidebarGroup">
                <FontAwesomeIcon icon={faPhotoFilm} />
                <Link to='/memories' className="subTitle">Memories</Link>
            </div>
            <hr className="hr" />
            <div className="sidebarGroup">
                <FontAwesomeIcon icon={faArrowDown} />
                <button>Click for More</button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar