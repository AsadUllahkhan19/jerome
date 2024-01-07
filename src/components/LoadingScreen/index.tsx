import Image from "next/image";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Image src="logo.svg" alt="iamge" height={500} width={500} />
    </div>
  );
};

export default LoadingScreen;
