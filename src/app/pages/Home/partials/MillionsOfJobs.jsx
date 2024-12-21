import { Button } from "antd";
import { CircleCheck, Search } from "lucide-react";
import React from "react";
import language from "app/locales/pages/Home/HeroSection.json";
import { sConfig } from "app/stores/configStore";

export default function MillionsOfJobs() {
  const config = sConfig.use();
  return (
    <div className="py-32 flex flex-col items-center relative">
      <div className="container">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
          <div></div>
          <div className="lg:col-span-4 md:col-span-5">
            <div className="relative">
              <div className="relative">
                <div
                  style={{
                    backgroundImage: `url(https://shreethemes.in/jobstack/layouts/assets/images/about/ab01.jpg)`,
                  }}
                  //   src="https://shreethemes.in/jobstack/layouts/assets/images/about/ab01.jpg"
                  className="parallax w-[320px] aspect-[3/4] rounded-md shadow dark:shadow-gray-700 bg-center bg-cover relative"
                  alt=""
                >
                  <div className="absolute top-0 translate-y-2/4 -end-10 text-center">
                    <div className="parallax lightbox size-20 rounded-full shadow-lg hover:scale-110 shadow-gray-700 inline-flex items-center justify-center bg-emerald-500 text-white transition-all">
                      <Search />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute md:end-10 -bottom-16">
                <img
                  src="/ab02.jpg"
                  className="parallax w-[200px] border-8 border-white rounded-md shadow dark:shadow-gray-700"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 md:col-span-6 mt-14 md:mt-0">
            <div className="lg:ms-5">
              <h3 className="mb-6 text-5xl md:leading-normal leading-normal font-semibold">
                {language[config.language].mJobs} <br />{" "}
                {language[config.language].findTheOne}
              </h3>

              <ul className="flex flex-col gap-2 mt-4 text-xl">
                <li className="mb-1 flex">
                  <CircleCheck size={28} className="text-emerald-500 mr-4" />
                  {language[config.language].digi}
                </li>
                <li className="mb-1 flex">
                  <CircleCheck size={28} className="text-emerald-500 mr-4" />
                  {language[config.language].ourTalented}
                </li>
                <li className="mb-1 flex">
                  <CircleCheck size={28} className="text-emerald-500 mr-4" />
                  {language[config.language].createYour}
                </li>
              </ul>

              <div className="mt-6">
                <Button
                  className="py-6 px-8 text-lg font-bold flex items-center"
                  type="primary"
                >
                  {language[config.language].contactUS}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
