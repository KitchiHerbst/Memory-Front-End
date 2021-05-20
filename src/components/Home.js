import React, { useState, useEffect } from "react";

export const Home = (props) => {
  const [postForm, setPostForm] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    // let post = {
    //     date:
    //     picture: 
    //     text:
    // }
  }
  console.log(props.timeline)

  return (
      <div>
      <h1>Home</h1>
      <button id='add-post' onClick={() => setPostForm(!postForm)}>Write a Post</button>
        { !postForm ? null 
        : 
        <form onSubmit={submitHandler}>
            <input type='date'/><br></br>
            <input type='text' placeholder='Picture'/> <br/>
            <textarea name="paragraph_text" cols="25" rows="30" placeholder='Today I went for a walk...'/><br/>
            <input type='submit' className='btn'/>
        </form>
        }
    </div>
  );
};
