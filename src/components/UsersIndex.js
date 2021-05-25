import { useState, useEffect } from "react"
import {UserCard } from './UserCard'

export const UsersIndex = props => {

    // const [users, setUsers] = useState([])

    // useEffect(() =>{
    //     fetch('http://localhost:3001/api/v1/users')
    //     .then(res => res.json())
    //     .then(userData => setUsers(userData))
    // },props.redirect)

    const addFriendHandler = (user) => {
        fetch('http://localhost:3001/api/v1/friendships', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(user.id)
        })
        .then(res => res.json())
        .then(response => console.log(response))
    }

    console.log(props.notFriends)
    return(
        <div>
            {props.users.map(user => <UserCard user={user} addButton={addFriendHandler}/>)}
        </div>
    )
}