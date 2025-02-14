import Image from "next/image";
import React from "react";
import LoaderLogo from "../../../../public/assets/logo-loader.gif";

const Loader = () => {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-75 z-40 transition-opacity"></div>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center  sm:p-0">
          <div className="relative transform overflow-hidden">
            <Image
              src={LoaderLogo}
              className="w-[150px] h-[150px] bg-white rounded-full"
              alt="imageloader"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
