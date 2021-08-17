

export const deleteFriend = (id) => {
    fetch('http://localhost:3001/api/v1/friendships', {
            method: 'DELETE',
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