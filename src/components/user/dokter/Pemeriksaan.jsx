"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  Tooltip,
} from "@nextui-org/react";
import { FaHome, FaSearch, FaClipboardList } from "react-icons/fa";
import Link from "next/link";
import { getPasienPemeriksaanDokter } from "@/services/pemeriksaan";
import toast from "react-hot-toast";

export const PemeriksaanDokterPage = () => {
  const [pasien, setPasien] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const rowsPerPage = 5;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const pasienRes = await getPasienPemeriksaanDokter();
      setPasien(pasienRes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredData = useMemo(() => {
    return pasien.filter((item) =>
      item.pasien.user.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, pasien]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [page, filteredData]);

  useEffect(() => {
    if (page > pages && pages > 0) {
      setPage(pages);
    }
  }, [page, pages]);

  const handleLoading = () => {
    const loadingToast = toast.loading("Mengakses halaman diagnosa pasien...");
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false);
      toast.dismiss(loadingToast);
    }, 2000); 
  };

  return (
    <div className="p-6">
      <div className="flex justify-between gap-4">
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
          <BreadcrumbItem className="font-normal">Pemeriksaan</BreadcrumbItem>
        </Breadcrumbs>

        <div className="hidden lg:block">
          <Card radius="sm" shadow="sm">
            <CardBody className="flex justify-center items-center">
              <p className="text-[#334155] font-semibold text-lg">
                No. Antrian Pasien Saat Ini: {pasien.length === 0 ? 0 : pasien[0].nomor_antrian}
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="hidden lg:block">
          <Input
            type="text"
            startContent={<FaSearch className="text-slate-500" />}
            radius="sm"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Cari berdasarkan nama pasien"
          />
        </div>
      </div>

      <div>
        <Card className="w-full mt-8 lg:hidden" radius="sm">
          <CardBody>
            <div className="flex flex-col justify-center">
              <Input
                type="text"
                startContent={<FaSearch className="text-slate-500" />}
                radius="sm"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Cari berdasarkan nama pasien"
              />
              <div className="flex justify-center bg-[#F4F4F5] mt-2 rounded-md p-1">
                <p className="text-[#334155] font-semibold text-lg">
                  No. Antrian Pasien Saat Ini: {pasien.length === 0 ? 0 : pasien[0].nomor_antrian}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="mt-4">
          {loading || isNavigating ? (
            <div className="flex justify-center items-center min-h-[222px]">
              <Spinner size="lg" />
            </div>
          ) : (
            <Table
              aria-label="Tabel Pemeriksaan Pasien Dokter"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                  />
                </div>
              }
              classNames={{ wrapper: "min-h-[360px]" }}
            >
              <TableHeader>
                <TableColumn>No Antrian</TableColumn>
                <TableColumn>No RM</TableColumn>
                <TableColumn>Nama</TableColumn>
                <TableColumn>No Telp</TableColumn>
                <TableColumn>Aksi</TableColumn>
              </TableHeader>
              <TableBody items={items} emptyContent={"Tidak Ada Antrian Pasien"}>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{getKeyValue(item, "nomor_antrian")}</TableCell>
                    <TableCell>{getKeyValue(item, "nomor_rm")}</TableCell>
                    <TableCell>{getKeyValue(item.pasien.user, "nama")}</TableCell>
                    <TableCell>
                      {"0" + String(getKeyValue(item.pasien.user, "nomor")).replace(/^0+/, "")}
                    </TableCell>
                    <TableCell>
                      <Tooltip placement="top" showArrow content={"Diagnosa"}>
                        <Link
                          href={`/dokter/pemeriksaan/${item.nomor_rm}/diagnosa?idPemeriksaan=${item.id}`}
                        >
                          <button
                            className="p-2 bg-orange-500 rounded hover:opacity-80"
                            onClick={handleLoading}
                          >
                            <FaClipboardList className="text-white " />
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
      </div>
    </div>
  );
};
