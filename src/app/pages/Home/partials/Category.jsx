import Cube from "app/components/Cube";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BookOpen,
  Building2,
  CircleDollarSign,
  HardHat,
  HeartPulse,
  Landmark,
  Laptop,
  Paintbrush,
  Search,
  Soup,
} from "lucide-react";
import React from "react";
import language from "app/locales/pages/Home/HeroSection.json";
import { sConfig } from "app/stores/configStore";
import { Link } from "react-router-dom";

const Item = ({ index, data }) => {
  const config = sConfig.use();
  return (
    <Link
      to={`/jobs?companyIndustry=${data.title}`}
      className="hover:!scale-110 group px-3 py-10 rounded-xl shadow hover:shadow-emerald-600 text-center bg-secondary hover:bg-emerald-400/30 transition duration-300"
    >
      <div className="size-16 group-hover:text-emerald-700 text-emerald-500 text-2xl flex align-middle justify-center items-center transition duration-500 mx-auto">
        {data?.icon || <Search />}
      </div>

      <div className="content mt-1">
        <div className="title text-xl font-semibold hover:text-emerald-600">
          {data?.title}
        </div>
        <p className="mt-3">
          {data?.jobs} {language[config.language].jobs}
        </p>
      </div>
    </Link>
  );
};

export default function Category() {
  const config = sConfig.use();
  const categories = [
    {
      title: "Business",
      jobs: 74,
      icon: <Building2 size={48} />,
    },
    {
      title: "Healthcare",
      jobs: 47,
      icon: <HeartPulse size={48} />,
    },
    {
      title: "Marketing",
      jobs: 68,
      icon: <CircleDollarSign size={48} />,
    },
    {
      title: "Engineering",
      jobs: 102,
      icon: <HardHat size={48} />,
    },
    {
      title: "Design",
      jobs: 35,
      icon: <Paintbrush size={48} />,
    },
    {
      title: "Finance",
      jobs: 56,
      icon: <Landmark size={48} />,
    },
    {
      title: "Content Writing",
      jobs: 82,
      icon: <BookOpen size={48} />,
    },
    {
      title: "Technology",
      jobs: 43,
      icon: <Laptop size={48} />,
    },
    {
      title: "Food",
      jobs: 97,
      icon: <Soup size={48} />,
    },

    {
      title: "Sports",
      jobs: 56,
      icon: <Activity size={48} />,
    },
  ];
  return (
    <div className="appear py-24 flex flex-col items-center relative md:pb-24 pb-16 bg-slate-200 dark:bg-zinc-700">
      <div className="container">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 md:text-5xl md:leading-normal text-2xl leading-normal font-semibold text-emerald-500">
            {language[config.language].popularCategories}
          </h3>

          <p className="max-w-xl mx-auto leading-6">
            {language[config.language].commonDesc}
          </p>
        </div>
        {/* <AnimatePresence> */}
        <motion.div
          className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-8 gap-[30px]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              staggerChildren: 0.5,
              repeat: 0,
            },
          }}
        >
          {categories.map((data, index) => (
            <Item key={index} index={index} data={data} />
          ))}
        </motion.div>
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
}
