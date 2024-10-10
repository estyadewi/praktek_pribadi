"use client";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { FaHome, FaUserMd, FaUserTie, FaPills, FaBriefcaseMedical } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getAllLayanan } from "@/services/layanan";
import { getAllObat } from "@/services/obat";
import { GetKaryawan } from "@/services/super-user";
import CounterCard from "@/components/Card/CounterCard";

export const DashboardSuperUser = () => {
  const [layanan, setLayanan] = useState(0);
  const [obat, setObat] = useState(0);
  const [dokter, setDokter] = useState(0);
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const layananRes = await getAllLayanan();
        const obatRes = await getAllObat();
        const dokterRes = await GetKaryawan("Dokter");
        const adminRes = await GetKaryawan("Admin");

        setLayanan(layananRes.length);
        setObat(obatRes.length);
        setDokter(dokterRes.length);
        setAdmin(adminRes.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
        <Breadcrumbs size="lg" itemClasses={{ item:"text-slate-700 font-semibold data-[current=false]:text-slate-400 data-[current=false]:font-normal", separator:"text-slate-700 text-xl" }}>
            <BreadcrumbItem startContent={<FaHome className="text-2xl"/>} href="/super-user/dashboard">Dashboard</BreadcrumbItem>
        </Breadcrumbs>
      <div className="mt-5 grid grid-flow-row lg:grid-cols-4 gap-4">
        <CounterCard icon={FaUserMd} title="Total Dokter" value={dokter} />
        <CounterCard icon={FaUserTie} title="Total Admin" value={admin} />
        <CounterCard icon={FaBriefcaseMedical} title="Total Layanan" value={layanan} />
        <CounterCard icon={FaPills} title="Total Obat" value={obat} />
      </div>
    </div>
  );
};
