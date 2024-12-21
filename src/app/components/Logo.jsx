import React from "react";
import { Link } from "react-router-dom";

export default function Logo({
  size = "small",
  collapsed = false,
  noPadding = false,
}) {
  return (
    <Link
      to="/"
      className={`flex items-center justify-center ${noPadding ? "" : "p-4"}`}
    >
      <img
        src="/borcelle-green.png"
        className={`object-contain object-center aspect-square ${
          !collapsed && "me-3"
        } ${size === "small" ? "h-8" : "h-9"}`}
      />
      {!collapsed ? (
        <div
          className={`-ms-3 self-center text-emerald-500 whitespace-nowrap font-sans ${
            size === "small" ? "text-lg font-semibold " : "text-2xl font-bold "
          }`}
        >
          ClamCan
        </div>
      ) : null}
    </Link>
  );
}
