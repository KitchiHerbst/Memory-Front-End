

export const addFriend = id => {
    fetch('http://localhost:3001/api/v1/friendships', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(id)
    })
    .then(res => res.json())
    .then(response => console.log(response))
}