import React, {useState} from "react";

export const FriendPage = (props) => {
    const [postForm, setPostForm] = useState(false)
    const [friend, setFriend] = useState(null)
    const [posts, setPosts] = useState([])


    const submitHandler = (e) => {
        e.preventDefault()
        let post = {
            date: e.target[0].value, 
            picture: e.target[1].value,
            text:e.target[2].value,
            timelineId: null
        }
        console.log(post)
        fetch('http://localhost:3001/api/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify(post)
        })
        .then(res => res.json())
        .then(createdPost => console.log(createdPost))
    
      } 

  return (
    <div>
      <h1>This is friend page</h1>
      <button id="add-post" onClick={() => setPostForm(!postForm)}>
        Write a Post
      </button>
      {!postForm ? null : (
        <form onSubmit={submitHandler}>
          <input type="date" />
          <br></br>
          <input type="text" placeholder="Picture" /> <br />
          <textarea
            name="paragraph_text"
            cols="25"
            rows="30"
            placeholder="Today I went for a walk..."
          />
          <br />
          <input type="submit" className="btn" />
        </form>
      )}
    </div>
  );
};
