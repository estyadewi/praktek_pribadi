"use client";

import { Breadcrumbs, BreadcrumbItem, Card, CardHeader, CardBody } from "@nextui-org/react";
import { FaHome, FaCalendarAlt, FaBookMedical, FaHistory, FaUserAlt } from "react-icons/fa";
import Link from "next/link";

export const DashboardPasien = () => {
  return (
    <div className="p-6">
      <Breadcrumbs size="lg" itemClasses={{ item:"text-slate-700 font-semibold data-[current=false]:text-slate-400 data-[current=false]:font-normal", separator:"text-slate-700 text-xl" }}>
          <BreadcrumbItem startContent={<FaHome className="text-2xl"/>} href="/pasien/dashboard">Dashboard</BreadcrumbItem>
      </Breadcrumbs>
      
      <div className="mt-4">
        <Card>
          <CardHeader className="mt-3 text-gray-600 font-semibold text-xl">Akses Cepat</CardHeader>
          <CardBody>
            <div className="grid grid-flow-row lg:grid-cols-4 gap-4">
              <div className="flex items-center border-2 border-indigo-300 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="bg-indigo-500 p-2 rounded-md">
                  <FaCalendarAlt className="text-3xl text-slate-50" />
                </div>
                <div className="ml-2">
                  <h4 className="font-normal text-sm text-slate-600">Jadwal Praktek</h4>
                  <Link href="/pasien/jadwal-praktek" className="text-indigo-500 text-sm mt-1 inline-block font-bold hover:underline">Kunjungi</Link>
                </div>
              </div>

              <div className="flex items-center border-2 border-indigo-300 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="bg-indigo-500 p-2 rounded-md">
                  <FaBookMedical className="text-3xl text-slate-50" />
                </div>
                <div className="ml-2">
                  <h4 className="font-normal text-sm text-slate-600">Jadwal Saya</h4>
                  <Link href="/pasien/jadwal-saya" className="text-indigo-500 text-sm mt-1 inline-block font-bold hover:underline">Kunjungi</Link>
                </div>
              </div>

              <div className="flex items-center border-2 border-indigo-300 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="bg-indigo-500 p-2 rounded-md">
                  <FaHistory className="text-3xl text-slate-50" />
                </div>
                <div className="ml-2">
                  <h4 className="font-normal text-sm text-slate-600">Riwayat Periksa</h4>
                  <Link href="/pasien/riwayat-periksa" className="text-indigo-500 text-sm mt-1 inline-block font-bold hover:underline">Kunjungi</Link>
                </div>
              </div>

              <div className="flex items-center border-2 border-indigo-300 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="bg-indigo-500 p-2 rounded-md">
                  <FaUserAlt className="text-3xl text-slate-50" />
                </div>
                <div className="ml-2">
                  <h4 className="font-normal text-sm text-slate-600">Profil</h4>
                  <Link href="/pasien/profil" className="text-indigo-500 text-sm mt-1 inline-block font-bold hover:underline">Kunjungi</Link>
                </div>
              </div>

            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
