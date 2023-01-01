import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { format } from 'timeago.js';

const ONewSingleAccountPost = ({post}) => {

    const location = useLocation();
    console.log(location);
    const id = location.pathname.split('/')[2];
    console.log(id);

    const [user, setUser] = useState([]);

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(post.likes.includes(id));
    }, [id, post.likes])

    const likeHandler = () => {

        try {
            axios.put('/api/posts/' + post._id + '/like', {userId: id});
        } catch(err) {

        }

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked); //if true will be false, if false will be true
    }

    useEffect(() => {
    
        const fetchUser = async() => {
          const resultPosts = await axios.get(`/api/users/${id}`);
          setUser(resultPosts.data);
          console.log(resultPosts.data);
        }
        fetchUser();
    
    }, [id]);

  return (
    <div className="nsap">
        <div className="nsapGroups">
            <div className="nsapGroup">
                <div className="nsapCardHeader">
                    <div className="nsapCardHeaderLeft">
                        <img src={`../assets/images/upload/${user.imageprofile}`} alt={user.username} className="nsapUserImg" />
                        <div className="nsapInfo">
                            <span className='nsapUserName'>{user.username}</span>
                            <span className="nsapDate">{format(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className="nsapCardHeaderRight">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
                <div className="nsapCardBody">
                    <p className="nsapText">{post?.description}</p>
                    <img src={`./assets/images/upload/${post?.image}`} className='nsapImg' alt="" />
                </div>
                <div className="nsapCardFooter">
                    <div className="nsapCardFooterLeft">
                        {isLiked ? (
                            <>
                                <img src="../assets/images/icons/thumb-down.png" onClick={likeHandler} alt="" className="nsapIconsImg" />
                                <img src="../assets/images/icons/like.png" onClick={likeHandler} alt="" className="nsapIconsImg" />
                            </>
                        ) : (
                            <>
                                <img src="../assets/images/icons/thumb-up.png" onClick={likeHandler} alt="" className="nsapIconsImg" />
                                <img src="../assets/images/icons/heart.png" onClick={likeHandler} alt="" className="nsapIconsImg" />
                            </>
                        )}
                        
                        <span className="nsapCounter">{like} people like it</span>
                    </div>
                    <div className="nsapCardFooterRight">
                        <span className="nsapComments">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ONewSingleAccountPost