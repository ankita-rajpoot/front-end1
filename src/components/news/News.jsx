import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import Story from '../story/Story'
import './news.css'

const News = () => {

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
    <div className='news'>
      <Story />
      <Share />
      {posts?.map((post) => (
        <Post post={post} key={post._id}/>
      ))}
      
    </div>
  )
}

export default News