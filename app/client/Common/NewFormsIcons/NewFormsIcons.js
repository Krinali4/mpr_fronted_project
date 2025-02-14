import Image from "next/image";
import React from "react";
import personalInfoActive from "../../../../public/assets/personalInfoActive.svg";
import addressMapPinActive from "../../../../public/assets//map-pin-active.svg";
import addressMapPin from "../../../../public/assets/map-pin.svg";
import employmentInfoActive from "../../../../public/assets/employmentInfoActive.svg";
import employmentInfo from "../../../../public/assets/employmentInfo.svg";
import dashLine from "../../../..//public/assets/dash-line.svg";
import dashLineActive from "../../../..//public/assets/dash-line-active.svg";

const NewFormsIcons = ({ stepperData }) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-[20px]">
        <div className="flex flex-col gap-[4px]  justify-center  ">
          <div className="w-[50px] h-[50px] border justify-center flex items-center  border-[#844FCF] rounded-full  ">
            <Image
              src={personalInfoActive}
              alt="phone"
              width={20}
              height={20}
            />
          </div>
          <p className="text-[12px] text-[#212529] font-normal max-sm:text-[10px] text-center font-[poppins]">
            {stepperData?.firstTtitle}
          </p>
        </div>
        <div className=" flex justify-center items-center">
          <Image
            className=" text-[#212529]  mb-6"
            src={stepperData?.modalStepper >= 1 ? dashLineActive : dashLine}
            width={"127"}
            height={1}
            alt="dashline"
          />
        </div>
        <div className="flex flex-col gap-[4px] justify-center text-center items-center">
          <div
            className={`w-[50px] h-[50px] border justify-center flex items-center ${
              stepperData?.modalStepper >= 1
                ? "border-[#844FCF] "
                : "border-[#C2CACF]"
            }  rounded-full`}
          >
            <Image
              src={
                stepperData?.modalStepper >= 1
                  ? addressMapPinActive
                  : addressMapPin
              }
              alt="phone"
              width={20}
              height={20}
            />
          </div>
          <p className="text-[12px] max-sm:text-[10px] text-[#212529] font-normal text-center font-[poppins]">
            {stepperData?.secondTitle}
          </p>
        </div>

        <div className="flex justify-center items-center">
          <Image
            className="mb-6"
            src={stepperData?.modalStepper === 2 ? dashLineActive : dashLine}
            width={"127"}
            height={1}
            alt="dashline"
          />
        </div>
        <div className="flex flex-col gap-[4px] justify-center text-center items-center">
          <div
            className={`w-[50px] h-[50px] border justify-center flex items-center ${
              stepperData?.modalStepper === 2
                ? "border-[#844FCF] "
                : "border-[#C2CACF]"
            }  rounded-full`}
          >
            <Image
              src={
                stepperData?.modalStepper === 2
                  ? employmentInfoActive
                  : employmentInfo
              }
              alt="phone"
              width={20}
              height={20}
            />
          </div>
          <p className="text-[12px] text-[#212529] max-sm:text-[10px] font-normal text-center font-[poppins]">
            {stepperData?.thirdTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewFormsIcons;
