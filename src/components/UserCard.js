
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";


export const UserCard = (props) => {


    const addFriend = () => {
        props.addButton(props.user)

    }

    // console.log(props.delete)
    return(
        <div className='user-card'>
            <h4>{props.user.first_name}</h4> 
            {props.addButton !== undefined ?
            <button onClick={() => addFriend()}>Add friend</button>
            :
            <Link to={{pathname: '/friendpage', state:{friend: props.user}}} className='btn'>See {props.user.first_name}s page</Link>
            }
            {props.delete !== undefined ? <button onClick={() => props.delete(props.user)}>Remove Friend</button> : null}
            <h5>{props.user.email}</h5>
            <img src={props.user.profile_picture}/>
        </div>
    )
}