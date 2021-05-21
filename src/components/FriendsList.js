import React, {useState} from 'react'
import { UserCard } from './UserCard'

export const FriendsList = props => {
    return(
        <div>
            {props.friends.map(friend => <UserCard user={friend}/>)}
        </div>
    )
}