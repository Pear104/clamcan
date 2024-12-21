import { Button } from "antd";
import SearchBox from "app/components/SearchBox";
import { getRandomInt } from "app/modules/random";
import FloatingIcons from "app/pages/Home/partials/FloatingIcons";
import { motion } from "framer-motion";
import { Bell, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import language from "app/locales/pages/Home/HeroSection.json";
import { sConfig } from "app/stores/configStore";

const candidates = [
  "/01.jpg",
  "/02.jpg",
  "/03.jpg",
  "/04.jpg",
  "/05.jpg",
  // "https://shreethemes.in/jobstack/layouts/assets/images/team/06.jpg",
  // "https://shreethemes.in/jobstack/layouts/assets/images/team/07.jpg",
  // "https://shreethemes.in/jobstack/layouts/assets/images/team/08.jpg",
];

const Temp = () => {
  const config = sConfig.use();

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const parallaxs = document.querySelectorAll(".parallax1");

    if (hero) {
      hero.addEventListener("mousemove", (e) => {
        parallaxs.forEach((parallax) => {
          let speed = 0.5;
          // speed = getRandomInt(1, 3);
          const x = -(window.innerWidth / 2 - e.clientX * speed) / 90;
          const y = -(window.innerHeight / 2 - e.clientY * speed) / 90;
          parallax.style.transform = `translateX(${x}%) translateY(${y}%)`;
        });
      });

      // Cleanup event listener on component unmount
      // return () => hero.removeEventListener("mousemove");
    }
  }, []);

  return (
    <>
      <div className="lg:col-span-5 md:col-span-6">
        <div className="relative dark:text-primary-foreground">
          <div className="relative flex justify-end z-20">
            <img
              src="/ab01.jpg"
              className="parallax w-[400px] rounded-xl shadow dark:shadow-gray-700 -translate-x-0"
              alt=""
            />
            <div className="parallax p-5 absolute lg:bottom-20 -bottom-24 xl:-end-20 lg:-end-10 end-2 rounded-lg shadow-md bg-white z-10">
              <div className="text-base font-semibold mb-3">
                {language[config.language]["candidatesGetJob"]}
              </div>

              <ul className="list-none relative">
                {candidates.map((candidate) => (
                  <li key={candidate} className="inline-block relative -ms-3">
                    <a href="">
                      <img
                        src={candidate}
                        className="size-10 rounded-full shadow-md dark:shadow-gray-700 border-4 border-white relative hover:z-10 hover:scale-105 transition-all duration-500"
                        alt=""
                      />
                    </a>
                  </li>
                ))}

                <li className="inline-block relative -ms-3">
                  <Link
                    to="/worker/auth/login"
                    className="p-2 btn btn-icon table-cell rounded-full bg-emerald-500 hover:bg-emerald-600 border-emerald-600 hover:border-emerald-700 text-white z-0 hover:z-10 hover:scale-105"
                  >
                    <Plus />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="absolute -start-5 -bottom-16 z-20">
            <img
              src="/ab04.jpg"
              className="parallax w-[220px] border-8 border-white rounded-xl"
              alt=""
            />

            <div className="parallax absolute flex justify-between items-center -top-6 md:-start-10 start-2 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white w-max">
              <Bell className="text-amber-500" size={24} />
              <p className="text-lg font-semibold mb-0 ms-2">
                {language[config.language]["jobAlert"]}
              </p>
            </div>
          </div>

          <div className="absolute bottom-1/2 translate-y-1/2 start-1/2 -translate-x-1/2 z-10 ">
            <div className="overflow-hidden h-[500px] w-[500px] bg-gradient-to-tl to-emerald-600/5 via-emerald-600/50 from-emerald-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const HeroSection = () => {
  const [filter, setFilter] = useState({
    name: "",
  });
  const config = sConfig.use();
  return (
    <>
      <section
        className="pt-24 justify-center items-center flex relative overflow-hidden pb-32 background-effect"
        id="home"
      >
        <div className="relative container lg:px-32">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
            <div className="lg:col-span-7 md:col-span-6 mt-14 md:mt-0">
              <div className="lg:me-12 text-primary/80">
                <motion.div
                  className="lg:leading-normal leading-normal text-5xl lg:text-5xl mb-7 font-bold w-[600px]"
                  initial={{ opacity: 0, x: -75, y: -100 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  {language[config.language]["findThe"]}
                  <span className="parallax1 ml-10 before:block before:absolute shadow-2xl p-2 px-4 rounded-lg bg-emerald-600 relative inline-block">
                    <motion.div
                      className="text-secondary font-bold"
                      initial={{ opacity: 0, y: 75 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      {language[config.language]["bestJob"]}
                    </motion.div>
                  </span>{" "}
                  <br />
                  {language[config.language]["offersForYou"]}.
                </motion.div>

                <motion.p
                  className="text-slate-600 text-lg tracking-wide font-light leading-normal dark:text-zinc-400"
                  initial={{ opacity: 0, x: 75 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  {language[config.language]["findJobDesc"]}
                </motion.p>

                <motion.form
                  method="get"
                  action="/jobs"
                  className="w-full mt-8"
                  initial={{ opacity: 0, x: 275 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <div className="flex gap-3">
                    <SearchBox
                      widthclassName="flex-grow"
                      className="py-4"
                      placeholder={language[config.language]["searchJob"]}
                      name="name"
                      onChange={(e) =>
                        setFilter({ ...filter, name: e.target.value })
                      }
                      value={filter.name}
                    />

                    <input
                      type="submit"
                      className="shake px-16 font-bold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-lg cursor-pointer"
                      value={language[config.language]["search"]}
                    />
                  </div>
                </motion.form>
              </div>
            </div>
            <Temp />
          </div>
        </div>
        <div></div>
      </section>
      <ScrollHorizontal />
    </>
  );
};

const companies = [
  {
    name: "Shree",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/shree-logo.png",
  },
  {
    name: "Skype",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/skype.png",
  },
  {
    name: "Snapchat",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/snapchat.png",
  },
  {
    name: "Spotify",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/spotify.png",
  },
  {
    name: "Telegram",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/telegram.png",
  },
  {
    name: "Whatsapp",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/whatsapp.png",
  },
  {
    name: "Android",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/android.png",
  },
  {
    name: "Facebook",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/facebook-logo.png",
  },
  {
    name: "Linkedin",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/linkedin.png",
  },
  {
    name: "Google",
    logo: "https://shreethemes.in/jobstack/layouts/assets/images/company/google-logo.png",
  },
];

const positions = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Project Manager",
  "QA Engineer",
  "Software Engineer",
  "Data Analyst",
  "Technical Writer",
  "Marketing Specialist",
  "Business Analyst",
  "Sales Representative",
];

export const ScrollHorizontal = () => {
  return (
    <>
      <div className="pl-4 pb-8 w-[99vw] overflow-x-hidden font-semibold">
        <div className="inline-block w-max dark:text-primary-foreground">
          <div className="inline-block rtl">
            {companies.map((company) => (
              <span
                key={company.logo}
                className="inline-block gap-4 items-center border border-black rounded-md px-6 py-2 mr-4 dark:bg-primary"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={company.logo}
                    className="aspect-square w-6 object-contain object-center"
                    alt=""
                  />
                  {company.name}
                </div>
              </span>
            ))}
          </div>
          <div className="inline-block rtl">
            {companies.map((company) => (
              <span
                key={company.logo + "a"}
                className="inline-block gap-4 items-center border border-black rounded-md px-6 py-2 mr-4 dark:bg-primary"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={company.logo}
                    className="aspect-square w-6 object-contain object-center"
                    alt=""
                  />
                  {company.name}
                </div>
              </span>
            ))}
          </div>
        </div>
        <div className="inline-block w-max dark:text-primary-foreground mt-6">
          <div className="inline-block ltr">
            {positions.map((position) => (
              <span
                key={position}
                className="inline-block gap-4 items-center border border-black rounded-md px-6 py-2 mr-4 dark:bg-primary"
              >
                <div className="flex gap-4 items-center">{position}</div>
              </span>
            ))}
          </div>
          <div className="inline-block ltr">
            {positions.map((position) => (
              <span
                key={position + "a"}
                className="inline-block gap-4 items-center border border-black rounded-md px-6 py-2 mr-4 dark:bg-primary"
              >
                <div className="flex gap-4 items-center">{position}</div>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
