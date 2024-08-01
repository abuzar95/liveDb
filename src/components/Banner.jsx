import React from "react";
import banner from "../assets/images/banner.PNG";
import { Chatbot } from "./Chatbot";
export const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Use cover to make sure the image covers the entire area
        backgroundPosition: "center", // Center the image
      }}
    >
      <Chatbot />
    </div>
  );
};
