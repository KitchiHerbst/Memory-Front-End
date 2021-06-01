import { Media, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const UserCard = (props) => {
  return (
    <Media className="user-card accent-color rounded ml-4 mr-4 mb-4">
      <Image
        src={props.user.profile_picture}
        alt="profile picture"
        roundedCircle
        className="profile-picture mr-4 ml-2 mt-4 mb-4"
      />
      <Media.Body className="mt-4 text-light">
        <h4>
          {props.user.first_name} {props.user.last_name}
        </h4>
        {/* <p>num of friends</p> */}
        <Link to={{ pathname: "/friendpage", state: { friend: props.user, status: props.status } }} className="btn btn-light col-10 mt-4">
          See {props.user.first_name}s page
        </Link>
        <Button
          onClick={() => props.friendshipHandler(props.user)}
          className={
            props.status
              ? "btn-danger col-10 mt-4"
              : "btn-secondary col-10 mt-4"
          }
        >
          {props.status ? "Remove Friend" : "Add Friend"}
        </Button>
      </Media.Body>
    </Media>
  );
};
