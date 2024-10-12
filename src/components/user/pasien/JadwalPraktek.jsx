"use client";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardBody,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  getDokterTersedia,
  getJadwalByTanggal,
} from "@/services/jadwal-praktek";
import { ModalBookingJadwal } from "@/components/modal/booking-jadwal/Modal-booking-jadwal";

export const JadwalPraktekDokterPasien = () => {
  const [dokter, setDokter] = useState([]);
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date())
  );
  const [idDokter, setIdDokter] = useState(0);
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeIdDokter = (e) => {
    setIdDokter(e.target.value);
  };

  const handleChangeTanggal = (e) => {
    setTanggal(e.target.value);
  };

  const fetchDokter = async () => {
    try {
      const res = await getDokterTersedia();
      setDokter(res);
      setIdDokter(res[0].id);
    } catch (error) {
      return error;
    }
  };

  const fetchJadwalPraktek = async () => {
    setLoading(true);
    try {
      const res = await getJadwalByTanggal(idDokter, tanggal);
      if (res === null) {
        setJadwal([]);
      } else {
        setJadwal(res.sesi);
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDokter();
  }, []);

  useEffect(() => {
    fetchJadwalPraktek();
  }, [idDokter, tanggal]);

  const isPastSession = (sessionTime) => {
    const sessionDateTime = new Date(`${tanggal}T${sessionTime}:00`);
    const currentDateTime = new Date();
    return currentDateTime > sessionDateTime;
  };

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
        <BreadcrumbItem className="font-normal">Jadwal Praktek</BreadcrumbItem>
      </Breadcrumbs>

      <div className="mt-4">
        <Card radius="sm" className="p-2">
          <CardHeader className="flex flex-col justify-center items-start">
            <h1 className=" text-gray-600 font-semibold text-xl">
              Jadwal Praktek
            </h1>
            <div className="mt-2 w-full flex flex-col gap-3 lg:gap-3">
              <div className="lg:max-w-64">
                <label
                  htmlFor="dokter"
                  className="block text-md font-medium text-slate-700 mb-2"
                >
                  Pilih Dokter
                </label>
                <select
                  name="dokter"
                  id="dokter"
                  value={idDokter}
                  onChange={handleChangeIdDokter}
                  className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                >
                  {dokter.map((dokter, index) => (
                    <option key={index} value={dokter.id}>
                      dr.{dokter.nama} (Spesialis {dokter.spesialisasi})
                    </option>
                  ))}
                </select>
              </div>
              <div className="lg:max-w-64">
                <label
                  htmlFor="tanggal"
                  className="block text-md font-medium text-slate-700 mb-2"
                >
                  Pilih Tanggal
                </label>
                <Input
                  type="date"
                  radius="sm"
                  id="tanggal"
                  value={tanggal}
                  onChange={handleChangeTanggal}
                  min={new Intl.DateTimeFormat("en-CA", {
                    timeZone: "Asia/Jakarta",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date())}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="flex justify-center items-center min-h-[222px]">
                <Spinner size="lg" />
              </div>
            ) : (
              <Table
                aria-label="Tabel Jadwal Praktek Dokter"
                classNames={{ wrapper: "min-h-[270px]" }}
              >
                <TableHeader>
                  <TableColumn>No</TableColumn>
                  <TableColumn>Sesi</TableColumn>
                  <TableColumn>Aksi</TableColumn>
                </TableHeader>
                <TableBody
                  items={jadwal}
                  emptyContent={"Tidak Ada Praktek"}
                  loadingState={loading}
                  loadingContent={<Spinner size="lg" />}
                >
                  {jadwal.map((item, index) => {
                    const isSessionPast = isPastSession(
                      item.waktu_selesai.slice(0, 5)
                    ); 
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {item.waktu_mulai.slice(0, 5)} -{" "}
                          {item.waktu_selesai.slice(0, 5)}
                        </TableCell>
                        <TableCell>
                          {!isSessionPast ? (
                            <ModalBookingJadwal
                              idJadwal={item.id}
                              tanggal={tanggal}
                              sisa_kuota={item.sisa_kuota}
                              fetch={fetchJadwalPraktek}
                            />
                          ):(
                            <p className="text-sm text-slate-700 font-medium">Sesi sudah berlalu</p>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
