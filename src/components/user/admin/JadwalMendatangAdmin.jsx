"use client";
import React, { useState, useEffect, useMemo, useCallback, use } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { getJadwalMendatangAdmin } from "@/services/pemeriksaan";
import { getDokterTersedia } from "@/services/jadwal-praktek";

export const JadwalMendatangAdminPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
    }).format(new Date())
  );
  const [selectedDokter, setSelectedDokter] = useState(null);
  const [dokter, setDokter] = useState([]);
  const rowsPerPage = 5;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const fetchDokter = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDokterTersedia();
      setDokter(res);
      setSelectedDokter(res[0]?.id || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getJadwalMendatangAdmin(selectedDokter, tanggal);
      setData(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, [selectedDokter, tanggal]);

  useEffect(() => {
    fetchDokter();
  }, [fetchDokter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (page > pages && pages > 0) {
      setPage(pages);
    }
  }, [data, page, pages]);

  const handleTanggalChange = (e) => {
    setTanggal(e.target.value);
  };

  const handleChangeDokter = (e) => {
    setSelectedDokter(e.target.value);
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
          href="/dokter/dashboard"
        >
          Dashboard
        </BreadcrumbItem>
        <BreadcrumbItem className="font-normal">
          Jadwal Mendatang
        </BreadcrumbItem>
      </Breadcrumbs>

      <div>
        <Card className="w-full mt-8" radius="sm">
          <CardBody>
            <div className="justify-between items-center hidden lg:flex">
              <div>
                <select
                  name="dokter"
                  id="dokter"
                  value={selectedDokter || 1}
                  onChange={handleChangeDokter}
                  className="h-10 w-full md:w-64 rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                >
                  {dokter.map((item) => (
                    <option key={item.id} value={item.id}>
                      dr. {item.nama} (Spesialis {item.spesialisasi})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="border shadow-sm p-2 rounded-md">
                  <p className="text-slate-700 text-medium">
                    Jumlah Pasien Booking:{" "}
                    <span className="font-semibold">{data.length || 0}</span>
                  </p>
                </div>
              </div>
              <div className="w-48">
                <Input
                  type="date"
                  radius="sm"
                  value={tanggal}
                  onChange={handleTanggalChange}
                  min={new Intl.DateTimeFormat("en-CA", {
                    timeZone: "Asia/Jakarta",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date())}
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center lg:hidden">
            <div className="w-full">
                <select
                  name="dokter"
                  id="dokter"
                  value={selectedDokter || 1}
                  onChange={handleChangeDokter}
                  className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                >
                  {dokter.map((item) => (
                    <option key={item.id} value={item.id}>
                      dr. {item.nama} (Spesialis {item.spesialisasi})
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <Input
                  type="date"
                  radius="sm"
                  value={tanggal}
                  onChange={handleTanggalChange}
                  min={new Intl.DateTimeFormat("en-CA", {
                    timeZone: "Asia/Jakarta",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date())}
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>
              <div className="w-full">
                <div className="border shadow-sm p-2 rounded-md">
                  <p className="text-slate-700 text-medium text-center">
                    Jumlah Pasien Booking:{" "}
                    <span className="font-semibold">{data.length || 0}</span>
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[222px]">
              <Spinner size="lg" />
            </div>
          ) : (
            <Table
              aria-label="Tabel Pasien Booking"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              classNames={{
                wrapper: "min-h-[360px]",
              }}
            >
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Sesi</TableColumn>
                <TableColumn>Nomor RM</TableColumn>
                <TableColumn>Nama</TableColumn>
                <TableColumn>No Telpon</TableColumn>
              </TableHeader>
              <TableBody
                items={items}
                emptyContent={"Tidak Ada Pasien Booking"}
              >
                {items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>
                      {getKeyValue(item.sesi.waktu_mulai.slice(0, 5))} -{" "}
                      {getKeyValue(item.sesi.waktu_selesai.slice(0, 5))}
                    </TableCell>
                    <TableCell>
                      {getKeyValue(item.pasien, "nomor_rm")}
                    </TableCell>
                    <TableCell>
                      {getKeyValue(item.pasien.user, "nama")}
                    </TableCell>
                    <TableCell>
                      {0 + getKeyValue(item.pasien.user, "nomor")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
