import Matter from "matter-js";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";

// Load your bird frames
const birdFrames = [
  require("@/assets/images/bluebird-downflap.png"),
  require("@/assets/images/bluebird-midflap.png"),
  require("@/assets/images/bluebird-upflap.png"),
];

const Bird = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const [frameIndex, setFrameIndex] = useState(0);

  // Animate flapping
  useEffect(() => {
    const flapInterval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % birdFrames.length);
    }, 150); // change speed as needed

    return () => clearInterval(flapInterval);
  }, []);

  return (
    <Image
      source={birdFrames[frameIndex]}
      resizeMode="contain"
      style={{
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
  );
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird />,
  };
};
