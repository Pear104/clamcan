import React from "react";

export default function AboutUsSection() {
  return (
    <div>
      <div className="flex flex-row pt-[100px] px-[400px] pb-[50px]">
        <div className="basis-1/4">
          <img src="/HomeAbout.png" alt="Introduction" />
        </div>
        <div className="basis-3/4 pl-[100px]">
          <div className="inter-semibold text-[45px] text-gray-600 leading-tight">
            About us
          </div>
          <p className="inter-regular text-[15px] my-[15px] text-gray-500">
            At IT Amazing, our mission is to connect businesses with exceptional
            talent. We believe that a strong workforce is key to the sustainable
            growth of any organization. By providing optimal recruitment
            solutions, we help companies find suitable candidates while enabling
            individuals to discover and realize their potential. With a
            long-term vision and commitment, we aim to deliver outstanding value
            to both candidates and employers, contributing to a more
            professional and diverse global workforce.
          </p>
        </div>
      </div>
    </div>
  );
}
