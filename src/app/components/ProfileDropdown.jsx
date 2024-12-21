import { Dropdown } from "antd";
import { Role } from "app/enums/Role";
import { setCookie } from "app/modules/cookie";
import { defaultAvatar } from "app/modules/default";
import { sAuth } from "app/stores/authStore";
import { sConfig } from "app/stores/configStore";
import { Link, useNavigate } from "react-router-dom";
import language from "app/locales/components/ProfileDropdown.json";
import {
  ChartPie,
  CircleUser,
  GanttChartSquare,
  Heart,
  Lock,
  LogOut,
} from "lucide-react";

const ProfileDropdown = ({ data }) => {
  const config = sConfig.use();
  const navigate = useNavigate();
  const items = [
    data.role !== Role.USER && {
      key: "3",
      label: (
        <Link
          to="/worker/dashboard"
          className="flex font-semibold gap-2 items-center"
        >
          <ChartPie size={18} />
          {language[config.language].dashboard}
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link
          to={`${data.role !== Role.USER ? "/worker" : ""}/profile`}
          className="flex font-semibold gap-2 items-center"
        >
          <CircleUser size={18} />
          {language[config.language].profile}
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to={`${
            data.role !== Role.USER ? "/worker" : ""
          }/profile/change-password`}
          className="flex font-semibold gap-2 items-center"
        >
          <Lock size={18} />
          {language[config.language].changePassword}
        </Link>
      ),
    },
    data.role == Role.USER && {
      key: "5",
      label: (
        <Link
          to="/profile/favorite"
          className="flex font-semibold gap-2 items-center"
        >
          <Heart size={18} />
          Favorite
        </Link>
      ),
    },
    data.role == Role.USER && {
      key: "6",
      label: (
        <Link
          to="/profile/applied-history"
          className="flex font-semibold gap-2 items-center"
        >
          <GanttChartSquare size={18} />
          Interview
        </Link>
      ),
    },
    {
      key: "4",
      onClick: () => {
        setCookie("accessToken", "", 0);
        sAuth.set((pre) => (pre.value = {}));
        if (data.role == Role.USER) {
          navigate("/");
        } else {
          navigate("/worker/auth/login");
        }
      },
      label: (
        <div className="flex font-semibold gap-2 items-center">
          <LogOut size={18} />
          {language[config.language].logout}
        </div>
      ),
    },
  ];
  return (
    <Dropdown
      className="flex font-bold items-center h-8 gap-3 group hover:scale-105 transition-all duration-200"
      menu={{
        items,
      }}
    >
      <span
        className="text-emerald-700 flex items-center cursor-pointer"
        onClick={() =>
          navigate(`${data.role != Role.USER ? "/worker" : ""}/profile`)
        }
      >
        <div
          style={{
            backgroundImage: `url(${
              data?.avatar
                ? `https://img.nglearns.dev/${data?.avatar}`
                : defaultAvatar
            })`,
          }}
          className="h-10 aspect-square bg-cover bg-center rounded-full bg-white border border-emerald-500"
        />
        <div className="text-xs text-emerald-500">
          <div className="">
            {data?.name}
            {(data?.role == Role.ADMIN ||
              data?.role == Role.MANAGER ||
              data?.role == Role.INTERVIEWER) &&
              "(Worker)"}
          </div>
          <div className="">{data?.email}</div>
        </div>
      </span>
    </Dropdown>
  );
};

export default ProfileDropdown;
