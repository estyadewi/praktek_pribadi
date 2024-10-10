"use client";

import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { sidebarItems } from "@/lib/sidebarItems";
import { useRouter, usePathname } from "next/navigation";
import { cekToken, logout } from "@/services/auth";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { createSlug } from "@/lib/constants";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const router = useRouter();
  const currentPath = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const logoutUser = async () => {
    const auth_token = Cookies.get("auth-token");
    if (auth_token) {
      const res = await logout(auth_token);
      if (res.status === "true") {
        toast.success(res.message);
        Cookies.remove("auth-token");
        router.replace("/masuk");
      } else {
        toast.error(res.error);
      }
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      const auth_token = Cookies.get("auth-token");
      if (auth_token) {
        const res = await cekToken(auth_token);
        setData(res);
        if (res.role === "Pasien") {
          setItems(sidebarItems.Pasien);
        } else if (res.role === "Dokter") {
          setItems(sidebarItems.Dokter);
        } else if (res.role === "Admin") {
          setItems(sidebarItems.Admin);
        } else if (res.role === "Super User") {
          setItems(sidebarItems.Super_User);
        }
      }
    };
    fetchRole();
  }, []);

  return (
    <>
      <div className="md:hidden top-0 z-50 bg-white shadow-sm p-4 flex justify-end">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <GiHamburgerMenu className="text-2xl text-slate-500" />
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-sm border-r transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-y-auto md:h-screen`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 pb-2 flex justify-center items-center">
            <Link
              href={`/${createSlug(data.role ?? "-")}/dashboard`}
              className="text-2xl text-center font-bold border-b border-gray-100 pb-4 w-full"
              onClick={closeSidebar}
            >
              🩺<span className="text-slate-700">Praktek</span>
              <span className="text-indigo-500"> Pribadi</span>
            </Link>
          </div>

          {/* Sidebar Items */}
          <div className="flex-grow overflow-y-auto sidebar-items">
            <ul className="px-3 space-y-4 mt-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeSidebar}>
                    <div
                      className={`flex items-center p-3 text-sm font-semibold hover:bg-[#6366F1] hover:text-slate-50 rounded-lg ${
                        currentPath.startsWith(item.href)
                          ? "text-slate-50 bg-[#6366F1]"
                          : "text-slate-400"
                      }`}
                    >
                      <item.icon className="text-2xl" aria-hidden="true" />
                      <span className="ml-4 text-medium font-normal">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer (Logout and user info) */}
          <div className="border-t p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-gray-800 font-semibold">
                  {data.nama}
                </h3>
                <p className="text-xs text-gray-600">{data.role}</p>
              </div>
              <button onClick={logoutUser} aria-label="Logout" className="p-2">
                <MdOutlineLogout className="text-2xl text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
