import {
  LayoutDashboard,
  Upload,
  History,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const username =
    localStorage.getItem("username") || "Guest";

  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/result",
    },
    {
      title: "Upload Resume",
      icon: Upload,
      path: "/upload",
    },
    {
      title: "History",
      icon: History,
      path: "/history",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <aside className="w-72 h-screen sticky top-0 bg-slate-950 border-r border-slate-800 flex flex-col">

      <div className="p-8 border-b border-slate-800">

        <h1 className="text-3xl font-extrabold text-white">
          ResumeIQ
        </h1>

        <p className="text-slate-400 mt-2">
          AI Resume Analyzer
        </p>

      </div>

      <div className="px-6 py-8">

        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
          {username.charAt(0).toUpperCase()}
        </div>

        <h2 className="mt-4 text-xl font-semibold text-white">
          {username}
        </h2>

        <p className="text-slate-400">
          ResumeIQ User
        </p>

      </div>

      <nav className="flex-1 px-4">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.title}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl mb-2 transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={22} />
              {menu.title}
            </NavLink>
          );
        })}

      </nav>

      <div className="p-5 border-t border-slate-800">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 rounded-xl py-3 font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}