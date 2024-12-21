import { Carousel } from "antd";
import React from "react";

const Item = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-x-8 px-72">
      <div
        className="col-span-3 bg-no-repeat bg-cover bg-center aspect-square rounded-3xl border"
        style={{
          backgroundImage:
            "url(https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/339414843_149466307776932_664339198963158469_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=PkoBBd9IgeMQ7kNvgFN8i4O&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=ABbH6otl8DQmk-KqOjWsrCi&oh=00_AYBsUhHUMpXBzigm2Crz9FM_ykalEYCOplI_ARgbpzypVw&oe=67092A11)",
        }}
      ></div>
      <div className="col-span-9 flex flex-col gap-1">
        <div className="font-[500] opacity-70">
          Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis
          sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus.
          Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut
          molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula
          molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue
          ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu
          turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim
          sapien, vitae placerat ante feugiat eget. Quisque vulputate odio
          neque, eget efficitur libero condimentum id. Curabitur id nibh id sem
          dignissim finibus ac sit amet magna.
        </div>
        <div className="font-bold text-blue-500 text-xl pt-4">
          Trung Hung Nguyen
        </div>
        <div className="text-xl font-bold">Chief executive officer</div>
      </div>
    </div>
  );
};

const Temp = () => {
  return <div>1</div>;
};

export default function OurPeople() {
  return (
    <div className="bg-zinc-100 flex flex-col items-center pt-10 gap-10 pb-20">
      <div className="font-bold text-4xl text-blue-500">Our People</div>
      <Carousel className="flex justify-center">
        <Item />
        {/* <Item /> */}
      </Carousel>
    </div>
  );
}
