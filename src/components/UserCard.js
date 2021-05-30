
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";


export const UserCard = (props) => {

    

    console.log(props.friendshipHandler)
    return(
        <div className='user-card mt-4'>
            <img src={props.user.profile_picture} className='user-card-picture'/>
            <br/>
            <div className='user-card-info'>
            <h4>{props.user.first_name} {props.user.last_name}</h4> 
            <br/>
            <Link to={{pathname: '/friendpage', state:{friend: props.user}}} className='btn btn-dark col-12'>See {props.user.first_name}s page</Link> 
            <br/>
            <br/>
            <button onClick={() => props.friendshipHandler(props.user)} className='btn btn-light col-12'>{props.status ? 'Remove Friend' : 'Add Friend'}</button>
            <br></br>
            </div>
        </div>
    )
}