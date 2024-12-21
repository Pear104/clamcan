const HowToSection = () => {
  return (
    <div className="pb-[50px] bg-zinc-100">
      <div className="flex flex-row pt-[100px] px-[400px]">
        <div className="basis-1/4">
          <img src="/HomeHowto.png" alt="Introduction" />
        </div>
        <div className="basis-3/4 pl-[100px]">
          <div className="inter-semibold text-[45px] text-gray-600 leading-tight">
            Our mission
          </div>
          <p className="inter-regular text-[15px] my-[15px] text-gray-500">
            We help people and organisations tap into the power of open source
            to develop new products at speed and with confidence. Whether it’s
            powering up self-driving cars or enabling compute for scientific
            discovery, we are here to deliver the best open source experience.<br/> <br/>
            Every team member contributes to this mission with a commitment to
            excellence.
          </p>
          {/* <button
            type="button"
            className="my-[5px] inter-regular text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Learn more
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HowToSection;
