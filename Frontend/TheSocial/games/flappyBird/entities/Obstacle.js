import Matter from "matter-js";
import React from "react";
import { Image } from "react-native";

const pipeGreen = require("@/assets/images/pipe-green.png");

const Obstacle = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <Image
      source={pipeGreen}
      resizeMode="repeat"
      style={{
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        transform: props.color === "red" ? [{ rotate: "180deg" }] : [],
      }}
    />
  );
};

export default (world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label,
      isStatic: true,
    }
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  };
};
