import React from "react";
import EmptyJson from "../lottie/Empty.json";
import Lottie from "lottie-react";
const EmptyLottie = () => {
  return (
    <div className=" w-[300px]">
      <Lottie animationData={EmptyJson} loop={true} />;
    </div>
  );
};

export default EmptyLottie;
