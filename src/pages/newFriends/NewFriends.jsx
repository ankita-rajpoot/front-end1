import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import Top from '../../components/top/Top'
import './newfreinds.css'
import SearchNewFriends from './SearchNewFriends'

const NewFriends = () => {

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getUsers= async() => {
      try {

        const resultUsers = await axios.get('/api/users/');
        setUsers(resultUsers.data);
        console.log(resultUsers.data);

        } catch(error) {
          console.log(error);
        }
      }

      getUsers();
  }, [])

  //search
  const keys = ["username"];

  const search = () => {
    return users.filter((user) => keys.some((key) => user[key].toLowerCase().includes(query)));
  }

  return (
    <>
      <Top />
      <div className="mainDiv">
        <div className="friends">
            <div className="friendsTop">
                <h3 className="friendsTitle">People you may know</h3>
                <div className="topSearch">
                    <input type="text" placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            <div className="friendsMiddle">
                <div className="friendsGroups">
                  {
                      users.length === 0 ? (
                        <h3 className="noFriends">There are currently no registered users</h3>
                      ) : (
                        <SearchNewFriends users={search(SearchNewFriends)} />
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

export default NewFriends