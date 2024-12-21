import React from "react";
import language from "app/locales/pages/Home/HeroSection.json";
import { sConfig } from "app/stores/configStore";

export default function Reasons() {
  const config = sConfig.use();
  return (
    <section className="pt-16 flex flex-col items-center relative pb-44 bg-slate-200 dark:bg-zinc-700">
      <div className="container">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 text-5xl md:leading-normal leading-normal font-semibold">
            {language[config.language].whyClamCan}
          </h3>

          <p className="max-w-xl mx-auto">
            {language[config.language].popularDesc}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px] text-black">
          <div className="group relative bg-white rounded-md shadow dark:shadow-gray-700">
            <div className="relative overflow-hidden">
              <img
                src="/blog01.jpg"
                className="scale-110 group-hover:scale-100 transition-all duration-500"
                alt=""
              />
            </div>

            <div className="text-center group-hover:scale-110 w-10/12 absolute p-4 left-1/2 -translate-x-1/2 title text-lg font-semibold duration-500 ease-in-out -bottom-6 bg-white rounded-md border border-black">
              {language[config.language].desc1}
            </div>
          </div>

          <div className="group relative bg-white rounded-md shadow dark:shadow-gray-700">
            <div className="relative overflow-hidden">
              <img
                src="/blog02.jpg"
                className="scale-110 group-hover:scale-100 transition-all duration-500"
                alt=""
              />
            </div>

            <div className="text-center group-hover:scale-110 w-10/12 absolute p-4 left-1/2 -translate-x-1/2 title text-lg font-semibold duration-500 ease-in-out -bottom-6 bg-white rounded-md border border-black">
              {language[config.language].desc2}
            </div>
          </div>

          <div className="group relative bg-white rounded-md shadow dark:shadow-gray-700">
            <div className="relative overflow-hidden">
              <img
                src="/blog03.jpg"
                className="scale-110 group-hover:scale-100 transition-all duration-500"
                alt=""
              />
            </div>

            <div className="text-center group-hover:scale-110 w-10/12 absolute p-4 left-1/2 -translate-x-1/2 title text-lg font-semibold duration-500 ease-in-out -bottom-6 bg-white rounded-md border border-black">
              {language[config.language].desc3}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
