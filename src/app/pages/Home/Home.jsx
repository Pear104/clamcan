import React from "react";
import OurCustomersSection from "./partials/OurCustomersSection";
import CaringSection from "./partials/CaringSection";
import HotJobsSection from "./partials/HotJobsSection";
import AchievementsSection from "./partials/AchievementsSection";
import HeroSection from "./partials/HeroSection";
import AboutUsSection from "./partials/AboutUsSection";
import HowToSection from "./partials/HowToSection";
import Category from "./partials/Category";
import MillionsOfJobs from "./partials/MillionsOfJobs";
import PopularJobs from "./partials/PopularJobs";
import Reasons from "./partials/Reasons";
import BestCompanies from "./partials/BestCompanies";

export default function Home() {
  return (
    <div className="hero">
      <HeroSection />
      <Category />
      <MillionsOfJobs />
      <PopularJobs />
      <BestCompanies />
      <Reasons />
      {/* <HotJobsSection />
      <AchievementsSection />
      <OurCustomersSection />
      <CaringSection />
      <HowToSection />
      <AboutUsSection /> */}
    </div>
  );
}
