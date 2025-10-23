"use client";

import { ReactNode, useState } from "react";
import {
  Home,
  User,
  LayoutDashboard,
  Scroll,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const Sidebar = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  const menus = [
    { title: "Home", icon: <Home size={20} />, path: "/" },
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    { title: "Posts", icon: <Scroll size={20} />, path: "/posts" },
    { title: "Users", icon: <User size={20} />, path: "posts" },
    { title: "Settings", icon: <Settings size={20} />, path: "posts" },
    { title: "Logout", icon: <LogOut size={20} />, path: "posts" },
  ];

  return (
    <div className="flex min-h-screen">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-gray-900 text-gray-100  min-h-screen p-5 pt-8 relative duration-300`}
      >
        <button
          className={`absolute top-9 right-4 ${!open && "me-3"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex items-center gap-x-3">
          <h1
            className={`text-xl font-bold origin-left duration-300 ${
              !open && "scale-0"
            }`}
          >
            Next Blog
          </h1>
        </div>

        <div className="pt-8">
          {menus.map((menu, i) => (
            <Link
              href={menu?.path}
              key={i}
              className="flex items-center gap-x-3 cursor-pointer p-2 hover:bg-indigo-600 rounded-md mt-2"
            >
              {menu.icon}
              <span
                className={`text-sm font-medium duration-200 ${
                  !open && "hidden"
                }`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 p-7">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="text-gray-600 mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
