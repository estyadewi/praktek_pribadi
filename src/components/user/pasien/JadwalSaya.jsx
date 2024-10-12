"use client";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import { FaHome, FaBookMedical, FaInfoCircle } from "react-icons/fa";
import { formatDateWithDayName } from "@/lib/constants";
import { getJadwalBookingPasien } from "@/services/pemeriksaan";
import { useState, useEffect, useCallback } from "react";
import { ModalBatalJanjiPasien } from "@/components/modal/pemeriksaan/Modal-batal-janji-pasien";

export const JadwalSayaPasien = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await getJadwalBookingPasien();
      setData(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6">
      <Breadcrumbs
        size="lg"
        itemClasses={{
          item: "text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal",
          separator: "text-slate-700 text-xl",
        }}
      >
        <BreadcrumbItem
          startContent={<FaHome className="text-2xl" />}
          href="/pasien/dashboard"
        >
          Dashboard
        </BreadcrumbItem>
        <BreadcrumbItem className="font-normal">Jadwal Saya</BreadcrumbItem>
      </Breadcrumbs>

      <div className="mt-4">
        <Card radius="sm" className="p-2">
          <CardHeader>
            <h1 className=" text-gray-600 font-semibold text-xl">
              Jadwal Saya
            </h1>
          </CardHeader>

          {loading ? (
            <CardBody>
              <div className="flex items-center justify-center">
                <Spinner color="primary" />
              </div>
            </CardBody>
          ) : (
            <>
              {data.length === 0 && loading === false ? (
                <CardBody>
                  <div className="flex items-center justify-center">
                    <p className="text-gray-500">
                      Tidak ada jadwal yang ditemukan
                    </p>
                  </div>
                </CardBody>
              ) : (
                <CardBody>
                  {data[0].sisa_pasien !== null && (
                    <div className="mb-5 bg-[#cff4fc] px-4 py-2 rounded-md font-bold text-slate-700 text-sm sm:text-medium flex flex-col lg:flex-row lg:justify-start justify-center items-center lg:space-x-1">
                      <FaInfoCircle className="text-lg mr-2" />
                      Pemberitahuan:
                      <span className="font-normal text-center">
                        Tersisa antrian {data[0].sisa_pasien} lagi sebelum anda dipanggil, harap
                        bersiap-siap
                      </span>
                    </div>
                  )}
                  <div className="grid grid-flow-row lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {data.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start justify-center border-2 border-indigo-300 rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex flex-row">
                          <div className="bg-indigo-500 p-3 rounded-md flex items-center justify-center">
                            <FaBookMedical className="text-4xl text-slate-50" />
                          </div>
                          <div className="ml-4 flex-1 justify-center">
                            <div className="flex flex-col items-start justify-center mb-2 gap-2">
                              <h4 className="font-semibold text-sm lg:text-md text-slate-600">
                                {formatDateWithDayName(
                                  item.tanggal_pemeriksaan
                                )}
                              </h4>
                              <p className="p-1 text-orange-500 border border-orange-500 rounded text-xs">
                                {item.status}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-col w-full">
                          <div className="flex justify-between text-slate-500 text-sm">
                            <p>Sesi</p>
                            <p>
                              {item.sesi?.waktu_mulai.slice(0, 5)} -{" "}
                              {item.sesi?.waktu_selesai.slice(0, 5)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-slate-500 text-sm">
                            <div>
                              <p>Nomor Antrian</p>
                            </div>
                            <div>
                              <p>
                                {item.nomor_antrian ? item.nomor_antrian : "-"}
                              </p>
                            </div>
                          </div>
                          {item.status === "Janji Temu Dijadwalkan" && (
                            <div className="flex items-center justify-between text-slate-500 text-sm">
                              <div>
                                <p>Aksi</p>
                              </div>
                              <div>
                                <ModalBatalJanjiPasien fetch={fetchData} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};
