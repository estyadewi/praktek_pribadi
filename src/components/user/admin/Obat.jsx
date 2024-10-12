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
} from "@nextui-org/react";
import { FaHome, FaSearch } from "react-icons/fa";
import { getAllObat } from "@/services/obat";
import { ModalTambahStokObat } from "@/components/modal/obat/Modal-tambah-stok-obat";

export const ObatPage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredData = useMemo(() => {
    return data
      .filter((item) => item.is_active === 1)
      .filter((item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, data]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [page, filteredData]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllObat();
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

  useEffect(() => {
    if (page > pages && pages > 0) {
      setPage(pages);
    }
  }, [filteredData, page, pages]);

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
          href="/admin/dashboard"
        >
          Dashboard
        </BreadcrumbItem>
        <BreadcrumbItem className="font-normal">Obat</BreadcrumbItem>
      </Breadcrumbs>

      <div>
        <Card className="w-full mt-8" radius="sm">
          <CardBody>
            <div className="justify-between items-center hidden sm:flex">
              <div className="flex flex-row gap-2">
                <ModalTambahStokObat fetch={fetchData} obat={data} />
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
              <div className="w-full space-y-2">
                <ModalTambahStokObat fetch={fetchData} obat={data} />
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
              aria-label="Tabel Obat"
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
                <TableColumn>Nama</TableColumn>
                <TableColumn>Jenis</TableColumn>
                <TableColumn>Stok</TableColumn>
                <TableColumn>Harga</TableColumn>
              </TableHeader>
              <TableBody items={items} emptyContent={"Tidak Ada Obat"}>
                {items.map((item, index) => (
                  <TableRow key={item.nama}>
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="truncate whitespace-nowrap overflow-hidden max-w-[150px] md:max-w-none">
                      {getKeyValue(item, "nama")}
                    </TableCell>
                    <TableCell>{getKeyValue(item, "jenis")}</TableCell>
                    <TableCell>{getKeyValue(item, "stok")}</TableCell>
                    <TableCell>{getKeyValue(item, "harga")}</TableCell>
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
