
export const CreateTimeline = (token) => {
    fetch('http://localhost:3001/api/v1/timelines', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    })
}