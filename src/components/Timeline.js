
import React from "react";
import { Chrono } from "react-chrono";

export const Timeline = (props) => {
  // debugger
  // need to do some logic to sort the posts based on date?
  // need to also get the styling for the timeline to be an x axis

  let array = props.posts
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((post) => {
      return {
        title: post.date,
        cardTitle: post.location,
        cardDetailedText: post.text,
        media: {
          source: {
            url: post.picture,
          },
          type: "IMAGE",
        },
      };
    });

    console.log(array)

  return (
    <div className="mt-4 timeline-container border-test" >
      {array !== [] ? 
      <Chrono items={array} mode='HORIZONTAL' cardPositionHorizontal="TOP" disableNavOnKey='true' allowDynamicUpdate='true'/>
        : null}
    </div>
  );
};
