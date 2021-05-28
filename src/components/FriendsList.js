import React, {useState} from 'react'
import { deleteFriend } from '../functions/DeleteFriend'
import { UserCard } from './UserCard'

export const FriendsList = props => {


    const removeFriend = (friend) => {
        props.setFriends(props.friends.filter(person => person.id !== friend.id))
        deleteFriend(friend.id)
    }

    return(
        <div>
            {props.friends.map(friend => <UserCard user={friend} friendshipHandler={removeFriend} status={true}/>  )}
        </div>
    )
}