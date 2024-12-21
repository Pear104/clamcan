import React from "react";

export default function HeroSection() {
  return (
    <div>
      <div className="flex flex-row pt-[100px] px-[350px] bg-gray-100 pb-[50px]">
        <div className="basis-3/4">
          <div className="inter-semibold text-[45px] text-gray-600 leading-tight">
            Welcome to <span className="text-blue-500 pr-2">Headhunters</span>
          </div>
          <p className="inter-regular text-[17px] my-[15px] text-gray-500">
            A leading recruitment platform that connects talented candidates
            with reputable companies. Our mission is to create an ideal work
            environment and enhance workforce quality through reliable
            recruitment solutions. We not only bridge job seekers and employers
            but also support individuals in finding their passions and career
            directions, understanding that people are key to a business's
            success.
          </p>
        </div>
        <div className="basis-1/4">
          <img src="/HomeRecruitment.png" alt="Introduction" />
        </div>
      </div>
    </div>
  );
}
