import React from "react";
import HeroSection from "./partials/HeroSection";
import AboutUsSection from "./partials/AboutUsSection";
import OurStorySection from "./partials/OurStorySection";
import OurPeople from "./partials/OurPeople";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Tag } from "antd";

export default function About() {
  useGSAP(() => {
    gsap
      .timeline()
      .from(".title", {
        scale: 0.1,
        z: -200,
        opacity: 0,
        duration: 1,
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.5)",
        ease: "power1.inOut",
      })
      .to(".title", {
        x: 0,
        duration: 1,
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.5)",
        ease: "power1.inOut",
      })
      .to(".f-ceo", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(".s1-kien", {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to(".s1-sang", {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to(".s1-hung", {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to(".s1-truong", {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to(".f-ceo", {
        scale: 1.05,
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to(".f-ceo", {
        scale: 1,
        duration: 0.5,
        ease: "power1.inOut",
      });

    const getScrollAmount = () => {
      const races = document.querySelector(".scroll-wrapper");
      return -(races.scrollWidth - window.innerWidth);
    };
    // const getScrollPosition =
    ScrollTrigger.create({
      animation: gsap.to(".horizontal-scroll", {
        x: getScrollAmount,
        ease: "power1.inOut",
      }),
      trigger: ".scroll-wrapper",
      start: "center center",
      end: () => `+=${getScrollAmount() * -1}`,
      scrub: 1,
      pin: true,
      // snap: 1 / (5 - 1),
      // markers: true,
    });
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="h-[90vh] flex justify-center items-center gap-8">
        <div className="grid grid-cols-2 justify-center gap-4 opacity-0 f-ceo">
          <div
            className="w-[280px] aspect-square bg-no-repeat bg-cover rounded-lg p1-kien"
            style={{ backgroundImage: `url(/images/sep-kien.png)` }}
          ></div>
          <div
            className="w-[280px] aspect-square bg-no-repeat bg-right bg-cover rounded-lg p1-sang"
            style={{ backgroundImage: `url(/images/sep-sang.png)` }}
          ></div>
          <div
            className="w-[280px] aspect-square bg-no-repeat bg-center bg-cover rounded-lg p1-hung"
            style={{ backgroundImage: `url(/images/sep-hung.png)` }}
          ></div>
          <div
            className="w-[280px] aspect-square bg-no-repeat bg-cover bg-center rounded-lg p1-truong"
            style={{ backgroundImage: `url(/images/sep-truong.png)` }}
          ></div>
        </div>
        <div className="title translate-x-[400px] font-semibold sedgwick-ave-display-regular">
          <div className="text-[40px] mb-4 s1-kien opacity-0 translate-x-[200px]">
            Trinh Dac Trung Kien - CEO
          </div>
          <div className="text-right text-[40px] mt-4 mb-10 s1-sang opacity-0 -translate-x-[200px]">
            PO - Truong Quang Sang
          </div>
          <div className="leading-none -translate-y-6 flex justify-start items-center text-[100px] font-bold protest-revolution-regular ">
            CLCA Company
          </div>
          <div className="flex justify-end items-center text-[80px] font-bold protest-revolution-regular ">
            CEO & Founder
          </div>
          <div className="text-[40px] mb-4 s1-hung opacity-0 translate-x-[200px]">
            Nguyen Trung Hung - R&D
          </div>
          <div className="text-right text-[40px] mt-4 mb-10 s1-truong opacity-0 -translate-x-[200px]">
            Culi - Le The Truong
          </div>
        </div>
      </div>
      <div className="w-screen overflow-x-scroll scroll-wrapper">
        <div className="w-fit gap-8 horizontal-scroll h-screen flex">
          <div className="w-screen flex px-[50px] items-center">
            <div className="flex gap-8 justify-center items-center w-full">
              <div
                className="h-[500px] aspect-square bg-no-repeat bg-cover rounded-lg p1-kien"
                style={{ backgroundImage: `url(/images/sep-kien.png)` }}
              ></div>
              <div className="grow self-start">
                <div className="flex text-8xl font-bold sedgwick-ave-display-regular">
                  Trịnh Đắc Trung Kiên
                  <div className="mt-8">
                    <Tag color="volcano-inverse">CEO</Tag>
                    <Tag color="green-inverse">Founder</Tag>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold mt-8">
                    Experience:{" "}
                  </div>
                  <li className="mt-6 text-2xl">
                    Employed as Google's ASEAN regional manager for 20 years.
                  </li>
                  <li className="mt-6 text-2xl">
                    Head of Software Freedom Conservancy
                  </li>
                  <div className="text-4xl font-bold mt-8">
                    Skills:
                  </div>
                  <li className="mt-6 text-2xl">
                    Identify missing markets ripe for competition
                  </li>
                  <li className="mt-6 text-2xl">
                    Team leader, team player, team negotiator.
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen flex px-[50px] items-center">
            <div className="flex gap-8 justify-center items-center w-full">
              <div
                className="h-[500px] aspect-square bg-no-repeat bg-cover bg-right rounded-lg p1-kien"
                style={{ backgroundImage: `url(/images/sep-sang.png)` }}
              ></div>
              <div className="grow self-start">
                <div className="flex text-8xl font-bold sedgwick-ave-display-regular">
                  Trương Quang Sang
                  <div className="mt-8">
                    <Tag color="blue-inverse">Product Owner</Tag>
                    <Tag color="cyan-inverse">Scrum Master</Tag>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold mt-8">
                    Experience:{" "}
                  </div>
                  <li className="mt-6 text-2xl">
                    30 years ReactJS developer.
                  </li>
                  <li className="mt-6 text-2xl">
                    Developed the CLCA.js library, used by a team of 4 for 20 years.
                  </li>
                  <div className="text-4xl font-bold mt-8">
                    Skills:
                  </div>
                  <li className="mt-6 text-2xl">
                    Advancing technology, ensuring we stay on the bleeding-edged of human knowledge
                  </li>
                  <li className="mt-6 text-2xl">
                    Direct networking with all S&P500 companies around the world.
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen flex px-[50px] items-center">
            <div className="flex gap-8 justify-center items-center w-full">
              <div
                className="h-[500px] aspect-square bg-no-repeat bg-cover bg-center rounded-lg p1-kien"
                style={{ backgroundImage: `url(/images/sep-hung.png)` }}
              ></div>
              <div className="grow self-start">
                <div className="flex text-8xl font-bold sedgwick-ave-display-regular">
                  Nguyễn Trung Hưng
                  <div className="mt-8">
                    <Tag color="geekblue-inverse">R&D</Tag>
                    <Tag color="lime-inverse">Automation Tester</Tag>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold mt-8">
                    Experience:{" "}
                  </div>
                  <li className="mt-6 text-2xl">
                    5 years as a professional Yo-Yo player.
                  </li>
                  <li className="mt-6 text-2xl">
                    20 years as a professional student.
                  </li>
                  <div className="text-4xl font-bold mt-8">
                    Skills:
                  </div>
                  <li className="mt-6 text-2xl">
                    Solve a Rubik's cube in just over 1 minutes.
                  </li>
                  <li className="mt-6 text-2xl">
                    Ride motorbike with 1 hand only.
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen flex px-[50px] items-center">
            <div className="flex gap-8 justify-center items-center w-full">
              <div
                className="h-[500px] aspect-square bg-no-repeat bg-cover bg-center rounded-lg p1-kien"
                style={{ backgroundImage: `url(/images/sep-truong.png)` }}
              ></div>
              <div className="grow self-start">
                <div className="flex text-8xl font-bold sedgwick-ave-display-regular">
                  Lê Thế Trường
                  <div className="mt-8">
                    <Tag color="volcano-inverse">Culi</Tag>
                    <Tag color="cyan-inverse">Developer</Tag>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold mt-8">
                    Experience:{" "}
                  </div>
                  <li className="mt-6 text-2xl">
                    Professional water-drinker for 21 years.
                  </li>
                  <li className="mt-6 text-2xl">
                    Professionally in this room for 5 minutes.
                  </li>
                  <div className="text-4xl font-bold mt-8">
                    Skills
                  </div>
                  <li className="mt-6 text-2xl">
                    Professional O2 to CO2 human converter.
                  </li>
                  <li className="mt-6 text-2xl">
                    Father of 4 dogs, 3 cats, and 5 legitimate children.
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
