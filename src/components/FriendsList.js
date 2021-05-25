import React, {useState} from 'react'
import { UserCard } from './UserCard'

export const FriendsList = props => {

    const seeFriendPage = (user) => {
        console.log(user)
    }

    const removeFriend = (friend) => {
        console.log(friend)
        fetch('http://localhost:3001/api/v1/friendships', {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(friend.id)
        })
        props.setFriends(props.friends.filter(obj => obj.id !== friend.id))
    }


    return(
        <div>
            {props.friends.map(friend => <UserCard user={friend} seeButton={seeFriendPage} delete={removeFriend}/>)}
        </div>
    )
}