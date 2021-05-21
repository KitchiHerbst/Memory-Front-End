export const UserCard = (props) => {

    const addFriendHandler = () => {
        console.log(props.user.id)
        fetch('http://localhost:3001/api/v1/friendships', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(props.user.id)
        })
        .then(res => res.json())
        .then(response => console.log(response))
    }



    return(
        <div className='user-card'>
            <h4>{props.user.first_name}</h4> 

            <button onClick={() => addFriendHandler()}>Add Friend</button>
            
            <h5>{props.user.email}</h5>
            <img src={props.user.profile_picture}/>
        </div>
    )
}