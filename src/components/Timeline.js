import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Chrono } from "react-chrono";

export const Timeline = (props) => {
  // debugger
  // need to do some logic to sort the posts based on date?
  // need to also get the styling for the timeline to be an x axis

  let titles = props.posts
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((post) => {
      return { title: post.date };
    });



  return (
    <div className="mt-4 timeline-container">
      {props.posts !== [] ? (
        <Chrono
          items={titles}
          mode="HORIZONTAL"
          cardPositionHorizontal="TOP"
          disableNavOnKey="true"
          allowDynamicUpdate="true"
          theme={{
            primary: "black",
            secondary: "white",
            cardBgColor: "rgb(190, 194, 194, 0)",
          }}
        >
          {props.posts.map((post) => (
            <Card className="timeline-card">
              <Card.Img
                variant="top"
                src={post.picture}
                style={{ "max-height": "350px" }}
              />
              <Card.Body>
                <Card.Title>{post.location}</Card.Title>
                <Card.Text>{post.text}</Card.Text>
              </Card.Body>
              {props.postHandler !== undefined ? (
                <Button
                  className="btn-danger col-10 mb-4 mx-auto"
                  onClick={() => props.postHandler(post)}
                >
                  Delete
                </Button>
              ) : null}
            </Card>
          ))}
        </Chrono>
      ) : null}
    </div>
  );
};
