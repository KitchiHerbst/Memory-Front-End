import { useState, useEffect } from "react"
import {UserCard } from './UserCard'
import {deleteFriend} from '../functions/DeleteFriend'
import { addFriend } from "../functions/AddFriend"

export const UsersIndex = props => {

    const addFriendHandler = (user) => {
        console.log(user)
        props.setFriends([...props.friends, user])
        props.setNotFriends(props.notFriends.filter(people => people.id !== user.id))
        addFriend(user.id)
       
    }

    const removeFriendHandler = (user) => {
        console.log(user)
        props.setNotFriends([...props.notFriends, user])
        props.setFriends(props.friends.filter(people => people.id !== user.id))
        deleteFriend(user.id)
    }
    
    return(
        <div>
            <input type='text' onChange={(e) => props.search(e.target.value)} placeholder='Search'/>
            {props.notFriends.map(person => <UserCard user={person} friendshipHandler={addFriendHandler} status={false}/>)}
            {props.friends.map(person => <UserCard user={person} friendshipHandler={removeFriendHandler} status={true}/>)}
        </div>
    )
}