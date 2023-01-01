import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import MyFriends from '../../components/myFriends/MyFriends'
import SearchMyFriends from '../../components/myFriends/SearchMyFriends'
import Top from '../../components/top/Top'
import './friends.css'

const Friends = () => {

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState({});
  const [query, setQuery] = useState("");


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

  //search
  const keys = ["username"];

  const search = () => {
    return friends.filter((friend) => keys.some((key) => friend[key].toLowerCase().includes(query)));
  }

  return (
    <>
      <Top />
      <div className="mainDiv">
        <div className="friends">
            <div className="friendsTop">
                <h3 className="friendsTitle">All Friends</h3>
                <div className="topSearch">
                    <input type="text" placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            <div className="friendsMiddle">
                <div className="friendsGroups">
                    {
                      friends.length === 0 ? (
                        <h3 className="noFriends">You don't have any friends yet</h3>
                      ) : (
                          <SearchMyFriends friends={search(SearchMyFriends)} />
                      )
                    }
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Friends