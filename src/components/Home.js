import React, { useState, useEffect } from "react";

export const Home = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/get_user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, user);

  const editUserHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
    .then(updatedUser => setUser(updatedUser))
  };

  console.log(user);
  console.log(props.timeline);
  return (
    <div>
      
      <h1>Home</h1>
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <p>{user.email}</p>
      <p>{user.profile_picture}</p>
      <form onSubmit={(e) => editUserHandler(e)}>
        <input
          type="text"
          placeholder="First Name"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="First Name"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="First Name"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="First Name"
          value={user.profile_picture}
          onChange={(e) =>
            setUser({ ...user, profile_picture: e.target.value })
          }
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};
