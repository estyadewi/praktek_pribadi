"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Button,
  Tooltip,
} from "@nextui-org/react";
import { FaHome, FaSearch, FaCalendarAlt } from "react-icons/fa";
import {
  getJadwalHarianByDokter,
  getJadwalDadakanByDokter,
} from "@/services/jadwal-praktek";
import { formatDate, calculateTotalKuota } from "@/lib/constants";
import { getDokterTersedia } from "@/services/jadwal-praktek";
import { ModalHapusJadwalDadakan } from "@/components/modal/jadwal-praktek/Modal-hapus-jadwal-dadakan";
import Link from "next/link";

export const JadwalPraktekPage = () => {
  const [dokterTersedia, setDokterTersedia] = useState([]);
  const [dokterSelected, setDokterSelected] = useState(null);
  const [data, setData] = useState([]);
  const [jadwalDadakan, setJadwalDadakan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageDadakan, setPageDadakan] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageDadakan(1);
  };

  const filteredJadwalDadakan = useMemo(() => {
    return jadwalDadakan.filter(
      (item) =>
        formatDate(item.tanggal)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.hari.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, jadwalDadakan]);

  const pagesDadakan = Math.ceil(filteredJadwalDadakan.length / rowsPerPage);

  const itemsDadakan = useMemo(() => {
    const start = (pageDadakan - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredJadwalDadakan.slice(start, end);
  }, [pageDadakan, filteredJadwalDadakan]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getJadwalHarianByDokter(dokterSelected);
      const response = await getJadwalDadakanByDokter(dokterSelected);
      setData(res);
      setJadwalDadakan(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDokter = async () => {
    try {
      const response = await getDokterTersedia();
      setDokterTersedia(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDokter();
  }, []);

  useEffect(() => {
    if (dokterTersedia.length > 0) {
      setDokterSelected(dokterTersedia[0].id);
    }
  }, [dokterTersedia]);

  useEffect(() => {
    if (dokterSelected) {
      fetchData();
    }
  }, [dokterSelected]);

  useEffect(() => {
    if (pageDadakan > pagesDadakan && pagesDadakan > 0) {
      setPageDadakan(pagesDadakan);
    }
  }, [filteredJadwalDadakan, pageDadakan, pagesDadakan]);

  const handleDokterChange = (e) => {
    setDokterSelected(e.target.value);
  };

  return (
    <div className="p-6">
      <Breadcrumbs
        size="lg"
        itemClasses={{
          item:
            "text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal",
          separator: "text-slate-700 text-xl",
        }}
      >
        <BreadcrumbItem
          startContent={<FaHome className="text-2xl" />}
          href="/admin/dashboard"
        >
          Dashboard
        </BreadcrumbItem>
        <BreadcrumbItem className="font-normal">
          Jadwal Praktek
        </BreadcrumbItem>
      </Breadcrumbs>

      <div>
        <div className="mt-4">
          <label
            htmlFor="dokter"
            className="block text-md font-semibold text-slate-700 mb-2"
          >
            Pilih Dokter
          </label>
          <select
            name="dokter"
            id="dokter"
            value={dokterSelected || ""}
            onChange={handleDokterChange}
            className="h-10 w-full md:w-64 rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
          >
            <option value="" disabled>
              Pilih Dokter
            </option>
            {dokterTersedia.map((item, index) => (
              <option key={index} value={item.id}>
                dr. {item.nama} (Spesialis {item.spesialisasi})
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          <h1 className="mb-1 font-semibold text-slate-700">
            Jadwal Praktek Harian
          </h1>
          {loading ? (
            <div className="flex justify-center items-center min-h-[222px]">
              <Spinner size="lg" />
            </div>
          ) : (
            <Table
              aria-label="Tabel Jadwal Praktek Harian"
              classNames={{
                wrapper: "min-h-[360px]",
              }}
            >
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Hari</TableColumn>
                <TableColumn>Slot</TableColumn>
                <TableColumn>Kuota</TableColumn>
                <TableColumn>Aksi</TableColumn>
              </TableHeader>
              <TableBody
                items={data}
                emptyContent={"Tidak Ada Jadwal Praktek"}
              >
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{getKeyValue(item, "hari")}</TableCell>
                    <TableCell>{item.sesi.length}</TableCell>
                    <TableCell>{calculateTotalKuota(item)}</TableCell>
                    <TableCell>
                      <Tooltip
                        placement="top"
                        showArrow
                        content="Ubah Jadwal Praktek"
                      >
                        <Link
                          href={`/admin/jadwal-praktek/${item.hari}/ubah-jadwal?idDokter=${dokterSelected}`}
                        >
                          <button className="p-2 bg-orange-500 rounded hover:opacity-80">
                            <FaCalendarAlt className="text-white" />
                          </button>
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="mt-4">
          <Card className="w-full mb-2" radius="sm">
            <CardBody>
              <div className="justify-between items-center hidden sm:flex">
                <div className="flex flex-row gap-2">
                  <Button
                    href={`/admin/jadwal-praktek/perubahan-jadwal?idDokter=${dokterSelected}`}
                    as={Link}
                    color="success"
                    className="text-white"
                    radius="sm"
                  >
                    Perubahan Jadwal
                  </Button>
                </div>
                <div>
                  <Input
                    type="text"
                    startContent={<FaSearch className="text-slate-500" />}
                    radius="sm"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center sm:hidden">
                <div className="w-full">
                  <Input
                    type="text"
                    startContent={<FaSearch className="text-slate-500" />}
                    radius="sm"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="w-full">
                  <Button
                    href={`/admin/jadwal-praktek/perubahan-jadwal?idDokter=${dokterSelected}`}
                    as={Link}
                    color="success"
                    className="text-white w-full"
                    radius="sm"
                  >
                    Perubahan Jadwal
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
          {loading ? (
            <div className="flex justify-center items-center min-h-[222px]">
              <Spinner size="lg" />
            </div>
          ) : (
            <Table
              aria-label="Tabel Jadwal Praktek Dadakan"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={pageDadakan}
                    total={pagesDadakan}
                    onChange={(page) => setPageDadakan(page)}
                  />
                </div>
              }
              classNames={{
                wrapper: "min-h-[360px]",
              }}
            >
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Tanggal</TableColumn>
                <TableColumn>Hari</TableColumn>
                <TableColumn>Slot</TableColumn>
                <TableColumn>Kuota</TableColumn>
                <TableColumn>Aksi</TableColumn>
              </TableHeader>
              <TableBody
                items={itemsDadakan}
                emptyContent={"Tidak Ada Jadwal Praktek Dadakan"}
              >
                {itemsDadakan.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {(pageDadakan - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{formatDate(item.tanggal)}</TableCell>
                    <TableCell>{getKeyValue(item, "hari")}</TableCell>
                    <TableCell>{item.sesi.length}</TableCell>
                    <TableCell>{calculateTotalKuota(item)}</TableCell>
                    <TableCell className="flex flex-row space-x-2 md:space-y-0">
                      <Tooltip
                        placement="top"
                        showArrow
                        content={"Ubah Jadwal Dadakan"}
                      >
                        <Link
                          href={`/admin/jadwal-praktek/${item.tanggal}/ubah-perubahan-jadwal?idDokter=${dokterSelected}`}
                        >
                          <button className="p-2 bg-orange-500 rounded hover:opacity-80">
                            <FaCalendarAlt className="text-white" />
                          </button>
                        </Link>
                      </Tooltip>
                      <ModalHapusJadwalDadakan id={item.id} fetch={fetchData} />
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
