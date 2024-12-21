import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { sAuth } from "app/stores/authStore";
import ProfileDropdown from "./ProfileDropdown";
import { MenuIcon } from "lucide-react";
import ToggleLanguage from "./ToggleLanguage";
import { sConfig } from "app/stores/configStore";
import language from "app/locales/components/Header.json";

const HeaderLinkItem = ({ href, children }) => {
  const location = useLocation();
  return (
    <li>
      <Link
        to={href}
        className="group block py-2 pr-4 pl-3 text-emerald-500 dark:text-emerald-400 bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
        aria-current="page"
      >
        {children}
        <div
          className={`mt-1 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300 ${
            (location.pathname === href && href == "/") ||
            (location.pathname.startsWith(href) && href != "/")
              ? "w-full"
              : "w-0"
          }`}
        ></div>
      </Link>
    </li>
  );
};

export default function Header() {
  const auth = sAuth.use();
  const config = sConfig.use();
  const navigate = useNavigate();
  return (
    <nav className="py-2 shadow-md dark:bg-zinc-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex flex-wrap justify-between items-center w-full">
          <Logo />
          <div className="flex items-center lg:order-2 gap-4">
            {auth.isAuthenticated ? (
              <ProfileDropdown data={auth} />
            ) : (
              <div
                onClick={() => navigate("/auth/login")}
                type="primary"
                to="/auth/login"
                className="text-white font-bold rounded-lg text-sm bg-emerald-400 px-5 py-2.5 text-center mr-3 md:mr-0 hover:scale-110 duration-500 transition-all cursor-pointer"
              >
                {language[config.language]["login"]}
              </div>
            )}
            <div className="border-r border-gray-500 h-10 w-2" />
            <ToggleLanguage />
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon />
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <HeaderLinkItem href={"/"}>
                {language[config.language]["home"]}
              </HeaderLinkItem>
              <HeaderLinkItem href={"/about"}>
                {language[config.language]["about"]}
              </HeaderLinkItem>
              <HeaderLinkItem href={"/jobs"}>
                {language[config.language]["job"]}
              </HeaderLinkItem>
              <HeaderLinkItem href={"/play"}>
                {language[config.language]["play"]}
              </HeaderLinkItem>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
