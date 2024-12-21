import { Outlet } from "react-router-dom";
import ToggleTheme from "app/components/ToggleTheme";
import { FloatButton } from "antd";

export default function GlobalLayout() {
  return (
    <>
      <ToggleTheme />
      <FloatButton.BackTop type="primary" />
      <div className="dark:bg-secondary text-secondary-foreground">
        <Outlet />
      </div>
    </>
  );
}
