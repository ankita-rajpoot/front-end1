import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewSingleAccPost from '../newSingleAccPost/NewSingleAccPost.jsx/NewSingleAccPost'
import Share from '../share/Share'

const NewAccountPost = () => {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  
  const [posts, setPosts] = useState([]); //default is empty for post, no add post

  useEffect(() => {
    
    const fetchPosts = async() => {
      const resultPosts = await axios.get(`/api/posts/all/${userInfo._id}`);
      setPosts(resultPosts.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }));
      console.log(resultPosts.data);
    }
    fetchPosts();

  }, [userInfo._id]);

  return (
    <div className='nAPost'>
      <div className="nAShareDiv">
        <Share />
        {posts.map((post) => (
         userInfo._id === post.userId && (
            <NewSingleAccPost post={post} key={post._id}/>
         )
      ))}
      </div>
    </div>
  )
}

export default NewAccountPost