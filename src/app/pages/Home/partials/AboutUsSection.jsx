import { Button } from "antd";
import { Link } from "react-router-dom";

const AboutUsSection = () => {
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
            Welcome to Headhunters, where we connect talent with opportunity.
            Our mission is to simplify the recruitment process for both
            employers and job seekers, creating a seamless experience that
            fosters meaningful connections. With a user-friendly interface and
            advanced matching algorithms, we help businesses find the perfect
            candidates while empowering individuals to discover their dream
            jobs. At Headhunters, we believe in the power of diversity and
            inclusion, and we are committed to supporting a wide range of
            industries and professions. Join us on this journey to transform the
            way people connect and grow in their careers!
          </p>
          <Link to="/about">
            <Button type="primary" className="py-4">
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
