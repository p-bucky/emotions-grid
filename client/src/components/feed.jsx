"use client"
import { Card } from "./card";
import "./feed.css";

export const Feed = () => {
  return (
    <div className="feed_container">
      {[...Array(50).keys()].map((i) => {
        return <Card key={i} />;
      })}
    </div>
  );
};
