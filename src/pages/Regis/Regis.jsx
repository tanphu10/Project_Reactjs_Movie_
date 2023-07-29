import React from "react";
import Lottie from "react-lottie";
import * as animationRegis from "../../assets/animation/regisUser.json";
import FormRegis from "../../Components/FormRegis/FormRegis";

const Regis = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationRegis,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-1/2">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <FormRegis />
    </div>
  );
};

export default Regis;
