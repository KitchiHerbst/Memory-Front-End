
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";


export const UserCard = (props) => {

    

    console.log(props.friendshipHandler)
    return(
        <div className='user-card'>
            <h4>{props.user.first_name} {props.user.last_name}</h4> 
            <Link to={{pathname: '/friendpage', state:{friend: props.user}}} className='btn'>See {props.user.first_name}s page</Link> <br/>
            <button onClick={() => props.friendshipHandler(props.user)}>{props.status ? 'Remove Friend' : 'Add Friend'}</button><br></br>
            <img src={props.user.profile_picture}/>
        </div>
    )
}