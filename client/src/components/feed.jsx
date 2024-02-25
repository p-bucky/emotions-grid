"use client";
import axios from "axios";
import { Card } from "./card";
import { DialogWrapper } from "./dialog-wrapper";
import "./feed.css";
import { SERVER_BASE_URL } from "@/constants/base-url";

export const Feed = () => {
  const JWT = localStorage.getItem("JWT");
  const createStory = async () => {
    // console.log("hoo", getCookie("connect.sid"))
    // return
    await axios.post(
      `${SERVER_BASE_URL}/api/story`,
      {
        story: "this is story",
        emotion: "happy",
      },
      {
        headers: {
          "X-JWT": JWT,
        },
      }
    );
  };
  return (
    <>
      {/* <div className="feed_container">
        {[...Array(50).keys()].map((i) => {
          return <Card key={i} />;
        })}
      </div> */}

      <button onClick={createStory}>Create</button>
      <DialogWrapper></DialogWrapper>
    </>
  );
};
