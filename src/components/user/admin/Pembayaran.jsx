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
  Button,
} from "@nextui-org/react";
import { FaHome, FaSearch } from "react-icons/fa";
import { ModalDetailPembayaran } from "@/components/modal/pembayaran/Modal-detail-pembayaran";
import { PembayaranInvoice } from "@/components/print/PembayaranInvoice";
import { ResepInvoice } from "@/components/print/ResepInvoice";
import { ModalSuratKeteranganSakit } from "@/components/modal/surat-keterangan-sakit/Modal-surat-keterangan-sakit";
import { getPembayaranPasien } from "@/services/pembayaran";

export const PembayaranPage = () => {
  const [pasien, setPasien] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

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
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [page, filteredData]);

  useEffect(() => {
    if (page > pages && pages > 0) {
      setPage(pages);
    }
  }, [filteredData, page, pages]);

  const fetchPasien = useCallback(async () => {
    try {
      const res = await getPembayaranPasien();
      setPasien(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchPasien();
  }, [fetchPasien]);

  return (
    <div className="p-6">
      <div className="flex justify-between">
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
          <BreadcrumbItem className="font-normal">Pembayaran</BreadcrumbItem>
        </Breadcrumbs>

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
            <div className="flex justify-center">
              <div className="w-full">
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
          </CardBody>
        </Card>

        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[222px]">
              <Spinner size="lg" />
            </div>
          ) : (
            <Table
              aria-label="Tabel Pembayaran"
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
                <TableColumn>No RM</TableColumn>
                <TableColumn>Nama</TableColumn>
                <TableColumn>No Telp</TableColumn>
                <TableColumn>Aksi</TableColumn>
              </TableHeader>
              <TableBody items={items} emptyContent={"Tidak Ada Pembayaran"}>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {(page - 1) * rowsPerPage + items.indexOf(item) + 1}
                    </TableCell>
                    <TableCell>{getKeyValue(item, "nomor_rm")}</TableCell>
                    <TableCell>
                      {getKeyValue(item.pasien.user, "nama")}
                    </TableCell>
                    <TableCell>
                      {"0" +
                        String(getKeyValue(item.pasien.user, "nomor")).replace(
                          /^0+/,
                          ""
                        )}
                    </TableCell>
                    <TableCell className="flex flex-row space-x-2 md:space-y-0">
                      <PembayaranInvoice data={item} />
                      <ModalDetailPembayaran data={item} fetch={fetchPasien} />
                      <ModalSuratKeteranganSakit data={item} />
                      {item.resep !== null && <ResepInvoice data={item} />}
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
