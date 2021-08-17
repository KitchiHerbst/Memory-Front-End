// import { useState, useEffect } from "react";
import { UserCard } from "./UserCard";
import { deleteFriend } from "../functions/DeleteFriend";
import { addFriend } from "../functions/AddFriend";
import { Container, InputGroup, FormControl, Row } from "react-bootstrap";

export const UsersIndex = (props) => {
  const addFriendHandler = (user) => {
    props.setFriends([...props.friends, user]);
    props.setNotFriends(
      props.notFriends.filter((people) => people.id !== user.id)
    );
    addFriend(user.id);
  };

  const removeFriendHandler = (user) => {
    props.setNotFriends([...props.notFriends, user]);
    props.setFriends(props.friends.filter((people) => people.id !== user.id));
    deleteFriend(user.id);
  };

  return (
    <Container fluid className="container-main">
      <Row className="mt-4 col-8 justify-content-md-center mb-4 mx-auto">
        <InputGroup size="lg">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-lg">Search</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => props.search(e.target.value)}
          />
        </InputGroup>
      </Row>
      <Row className="mt-4 mx-auto justify-content-md-center mb-4">
        {props.notFriends.map((person) => (
          <UserCard
            user={person}
            friendshipHandler={addFriendHandler}
            status={false}
          />
          ))}
          {props.friends.map((person) => (
            <UserCard
              user={person}
              friendshipHandler={removeFriendHandler}
              status={true}
            />
          ))}
      </Row>
    </Container>
  
  );
};
