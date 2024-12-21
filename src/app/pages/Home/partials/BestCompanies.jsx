import React from "react";
import language from "app/locales/pages/Home/HeroSection.json";
import { sConfig } from "app/stores/configStore";

export default function BestCompanies() {
  const config = sConfig.use();
  return (
    <div className="py-24 flex flex-col items-center relative md:pb-24 pb-16">
      <div className="container">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 text-5xl md:leading-normal leading-normal font-semibold">
            {language[config.language].findTheBest}
          </h3>

          <p className="max-w-xl mx-auto">
            {language[config.language].popularDesc}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
          <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6 hover:scale-110 transition-all">
            <div className="size-14 flex items-center justify-center bg-white shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
              <img
                src="https://shreethemes.in/jobstack/layouts/assets/images/company/spotify.png"
                className="size-8"
                alt=""
              />
            </div>

            <div className="mt-4">
              <a
                href=""
                className="text-lg hover:text-emerald-600 font-semibold"
              >
                Spotify
              </a>
              <p className="mt-2">Digital Marketing Solutions for Tomorrow</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <span className="text-slate-400">
                <i className="uil uil-map-marker"></i> Australia
              </span>
              <span className="block font-semibold text-emerald-600">
                6 Jobs
              </span>
            </div>
          </div>

          <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6 hover:scale-110 transition-all">
            <div className="size-14 flex items-center justify-center bg-white shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
              <img
                src="https://shreethemes.in/jobstack/layouts/assets/images/company/facebook-logo.png"
                className="size-8"
                alt=""
              />
            </div>

            <div className="mt-4">
              <a
                href=""
                className="text-lg hover:text-emerald-600 font-semibold"
              >
                Facebook
              </a>
              <p className="mt-2">Digital Marketing Solutions for Tomorrow</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <span className="text-slate-400">
                <i className="uil uil-map-marker"></i> USA
              </span>
              <span className="block font-semibold text-emerald-600">
                6 Jobs
              </span>
            </div>
          </div>

          <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6 hover:scale-110 transition-all">
            <div className="size-14 flex items-center justify-center bg-white shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
              <img
                src="https://shreethemes.in/jobstack/layouts/assets/images/company/google-logo.png"
                className="size-8"
                alt=""
              />
            </div>

            <div className="mt-4">
              <a
                href=""
                className="text-lg hover:text-emerald-600 font-semibold"
              >
                Google
              </a>
              <p className="mt-2">Digital Marketing Solutions for Tomorrow</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <span className="text-slate-400">
                <i className="uil uil-map-marker"></i> China
              </span>
              <span className="block font-semibold text-emerald-600">
                6 Jobs
              </span>
            </div>
          </div>

          <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6 hover:scale-110 transition-all">
            <div className="size-14 flex items-center justify-center bg-white shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
              <img
                src="https://shreethemes.in/jobstack/layouts/assets/images/company/android.png"
                className="size-8"
                alt=""
              />
            </div>

            <div className="mt-4">
              <a
                href=""
                className="text-lg hover:text-emerald-600 font-semibold"
              >
                Android
              </a>
              <p className="mt-2">Digital Marketing Solutions for Tomorrow</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <span className="text-slate-400">
                <i className="uil uil-map-marker"></i> Dubai
              </span>
              <span className="block font-semibold text-emerald-600">
                6 Jobs
              </span>
            </div>
          </div>

          <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6 hover:scale-110 transition-all">
            <div className="size-14 flex items-center justify-center bg-white shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
              <img
                src="https://shreethemes.in/jobstack/layouts/assets/images/company/lenovo-logo.png"
                className="size-8"
                alt=""
              />
            </div>

            <div className="mt-4">
              <a
                href=""
                className="text-lg hover:text-emerald-600 font-semibold"
              >
                Lenovo
              </a>
              <p className="mt-2">Digital Marketing Solutions for Tomorrow</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <span className="text-slate-400">
                <i className="uil uil-map-marker"></i> Pakistan
              </span>
              <span className="block font-semibold text-emerald-600">
                6 Jobs
              </span>
            </div>
          </div>

          <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6 hover:scale-110 transition-all">
            <div className="size-14 flex items-center justify-center bg-white shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
              <img
                src="https://shreethemes.in/jobstack/layouts/assets/images/company/shree-logo.png"
                className="size-8"
                alt=""
              />
            </div>

            <div className="mt-4">
              <a
                href=""
                className="text-lg hover:text-emerald-600 font-semibold"
              >
                Shreethemes
              </a>
              <p className="mt-2">Digital Marketing Solutions for Tomorrow</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <span className="text-slate-400">
                <i className="uil uil-map-marker"></i> India
              </span>
              <span className="block font-semibold text-emerald-600">
                6 Jobs
              </span>
            </div>
          </div>

          <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6 hover:scale-110 transition-all">
            <div className="size-14 flex items-center justify-center bg-white shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
              <img
                src="https://shreethemes.in/jobstack/layouts/assets/images/company/skype.png"
                className="size-8"
                alt=""
              />
            </div>

            <div className="mt-4">
              <a
                href=""
                className="text-lg hover:text-emerald-600 font-semibold"
              >
                Skype
              </a>
              <p className="mt-2">Digital Marketing Solutions for Tomorrow</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <span className="text-slate-400">
                <i className="uil uil-map-marker"></i> Rush
              </span>
              <span className="block font-semibold text-emerald-600">
                6 Jobs
              </span>
            </div>
          </div>

          <div className="group relative p-6 rounded-md shadow dark:shadow-gray-700 mt-6 hover:scale-110 transition-all">
            <div className="size-14 flex items-center justify-center bg-white shadow-md dark:shadow-gray-700 rounded-md relative -mt-12">
              <img
                src="https://shreethemes.in/jobstack/layouts/assets/images/company/snapchat.png"
                className="size-8"
                alt=""
              />
            </div>

            <div className="mt-4">
              <a
                href=""
                className="text-lg hover:text-emerald-600 font-semibold"
              >
                Snapchat
              </a>
              <p className="mt-2">Digital Marketing Solutions for Tomorrow</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
              <span className="text-slate-400">
                <i className="uil uil-map-marker"></i> Turkey
              </span>
              <span className="block font-semibold text-emerald-600">
                6 Jobs
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
          <div className="md:col-span-12 text-center">
            <a
              href=""
              className="btn btn-link text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out"
            >
              {language[config.language].seeMoreComp}
              <i className="uil uil-arrow-right align-middle"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
