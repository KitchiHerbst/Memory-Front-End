import { useState, useEffect } from "react"
import {UserCard } from './UserCard'

export const UsersIndex = props => {

    // const [users, setUsers] = useState([])

    // useEffect(() =>{
    //     fetch('http://localhost:3001/api/v1/users')
    //     .then(res => res.json())
    //     .then(userData => setUsers(userData))
    // },props.redirect)


    console.log(props.users)
    return(
        <div>
            {props.users.map(user => <UserCard user={user} />)}
        </div>
    )
}