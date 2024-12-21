const OurCustomersSection = () => {
  return (
    <div className="bg-zinc-100 flex flex-col items-center pt-10 gap-10 pb-20">
      <div className="font-bold text-4xl text-blue-500">Our Customers</div>
      <div className="w-3/5 grid grid-cols-12 gap-x-8">
        <div
          className="col-span-3 bg-no-repeat bg-cover bg-center aspect-square rounded-3xl border"
          style={{
            backgroundImage:
              "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkwg4mzRNxpwXnd6l7uzQHO09BYsSrmDPHkw&s)",
          }}
        ></div>
        <div className="col-span-9 flex flex-col gap-1">
          <div className="font-[500] opacity-70">
            Maecenas dignissim justo eget nulla rutrum molestie. Maecenas
            lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu
            enim metus. Vivamus sed libero ornare, tristique quam in, gravida
            enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit
            at ligula molestie, nec molestie mi blandit. Suspendisse cursus
            tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse
            eget lorem eu turpis vestibulum pretium. Suspendisse potenti.
            Quisque malesuada enim sapien, vitae placerat ante feugiat eget.
            Quisque vulputate odio neque, eget efficitur libero condimentum id.
            Curabitur id nibh id sem dignissim finibus ac sit amet magna.
          </div>
          <div className="font-bold text-blue-500 text-xl pt-4">
            Ahihi Ahoho
          </div>
          <div className="text-xl font-bold">Chief Executive Officer</div>
        </div>
      </div>
    </div>
  );
};

export default OurCustomersSection;
