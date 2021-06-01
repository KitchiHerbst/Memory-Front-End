import React from "react";
import { Container, Row } from "react-bootstrap";
import { deleteFriend } from "../functions/DeleteFriend";
import { UserCard } from "./UserCard";

export const FriendsList = (props) => {
  const removeFriend = (friend) => {
    props.setFriends(props.friends.filter((person) => person.id !== friend.id));
    deleteFriend(friend.id);
  };

  // console.log(props.friends)
  return (
    <Container fluid className="container-main">
      <Row className="mt-4 mx-auto justify-content-md-center">
        {props.friends.map((friend) => (
          <UserCard
            user={friend}
            friendshipHandler={removeFriend}
            status={true}
          />
        ))}
      </Row>
    </Container>
  );
};
