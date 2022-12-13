import React from "react";

const Loader = () => {
  let circleCommonClasses = "h-2.5 w-2.5 bg-current rounded-full text-orange-600";

  return (
    <div className="flex w-full h-screen opacity-60 bg-black">
        <div className="flex justify-center items-center w-full">
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>

        </div>
    </div>
  );
};

export default Loader;
