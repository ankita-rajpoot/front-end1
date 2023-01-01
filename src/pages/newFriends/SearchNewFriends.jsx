import React from 'react'
import AddNewFriends from '../../components/addNewFriends/AddNewFriends';

const SearchNewFriends = ({users}) => {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  return (
    <div className="friendsGroups">
        {
            
            users?.map((user) => (
                userInfo?._id !== user?._id && (
                    <AddNewFriends key={user?._id} user={user} />
                )
                
            ))
            
        }
    </div>
  )
}

export default SearchNewFriends