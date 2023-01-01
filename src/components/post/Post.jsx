import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js';
import './post.css'

const Post = ({post}) => {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const [users, setUsers] = useState({}); //empty object for default
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(post.likes.includes(userInfo._id));
    }, [post.likes, userInfo._id])

    const likeHandler = () => {

        try {
            axios.put('/api/posts/' + post._id + '/like', {userId: userInfo._id});
        } catch(err) {

        }

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked); //if true will be false, if false will be true
    }

    useEffect(() => {
    
        const fetchUsers = async() => {
          const resultPosts = await axios.get(`/api/users/${post.userId}`);
          setUsers(resultPosts.data);
          console.log(resultPosts.data);
        }
        fetchUsers();
    
      }, [post.userId]);

  return (
    <div className='post'>
        <div className="postGroups">
            <div className="postGroup">
                <div className="postCardHeader">
                    <div className="postCardHeaderLeft">
                        {
                            userInfo ? (
                                <Link to={`/account`}>
                                    <img src={`./assets/images/upload/${users.imageprofile}`} alt="" className="postUserImg" />
                                </Link> 
                            ) : (
                                <Link to={`/user/${users.username}`}>
                                    <img src={users.imageprofile} alt="" className="postUserImg" />
                                </Link> 
                            )
                        }
                                               
                        <div className="postInfo">
                            <span className='postUserName'>{users.username}</span>
                            <span className="postDate">{format(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className="postCardHeaderRight">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
                <div className="postCardBody">
                    <p className="postText">{post?.description}</p>
                    <img src={`./assets/images/upload/${post?.image}`} className='postImg' alt="" />
                </div>
                <div className="postCardFooter">
                    <div className="postCardFooterLeft">
                        {isLiked ? (
                            <>
                                <img src="./assets/images/icons/thumb-down.png" onClick={likeHandler} alt="" className="postIconsImg" />
                                <img src="./assets/images/icons/like.png" onClick={likeHandler} alt="" className="postIconsImg" />
                            </>
                        ) : (
                            <>
                                <img src="./assets/images/icons/thumb-up.png" onClick={likeHandler} alt="" className="postIconsImg" />
                                <img src="./assets/images/icons/heart.png" onClick={likeHandler} alt="" className="postIconsImg" />
                            </>
                        )}
                        
                        <span className="postCounter">{like} people like it</span>
                    </div>
                    <div className="postCardFooterRight">
                        <span className="postComments">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post