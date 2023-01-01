import React from 'react'
import MyFriends from './MyFriends'

const SearchMyFriends = ({friends}) => {
  return (
    <div className="friendsGroups">
        {
            friends?.map((friend) => (
                <MyFriends key={friend._id} friend={friend} />
            ))
        }
    </div>
  )
}

export default SearchMyFriends