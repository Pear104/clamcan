import React from "react";

export default function OurStorySection() {
  return (
    <div>
      <div className="flex flex-row py-[100px] px-[400px] gap-16">
        <div className="basis-3/4">
          <div className="inter-semibold text-[45px] text-gray-600 leading-tight">
            Our Story
          </div>
          <p className="inter-regular text-[15px] my-[15px] text-gray-500">
            We began our journey in 2024 with a vision: to help millions find
            their dream jobs and enable businesses to build outstanding teams.
            From our early days with a small team, we've rapidly grown through
            passion, perseverance, and a spirit of innovation. Each day, we
            learn and enhance our services to meet the diverse needs of the job
            market. With advancements in technology, we've implemented
            cutting-edge recruitment tools, making the process faster, more
            transparent, and more efficient.
          </p>
        </div>
        <div className="basis-1/4">
          <img src="/HomeHowto.png" alt="Introduction" />
        </div>
      </div>
    </div>
  );
}
