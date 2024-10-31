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
import { FaHome } from "react-icons/fa";
export const JadwalMendatangPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
    }).format(new Date())
  );
  const rowsPerPage = 5;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
    //   const res = await getLayananByDokter();
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
  }, [data, page, pages]);

  const handleTanggalChange = (e) => {
    setTanggal(e.target.value);
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
            <div className="justify-between items-center hidden sm:flex">
              <div>
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
              <div>
                <div className="border shadow-sm p-2 rounded-md">
                  <p className="text-slate-700 text-medium">
                    Jumlah Pasien Booking:{" "}
                    <span className="font-semibold">80</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center sm:hidden">
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
                    <span className="font-semibold">80</span>
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
                <TableColumn>Nomor RM</TableColumn>
                <TableColumn>Nama</TableColumn>
                <TableColumn>No Telpon</TableColumn>
              </TableHeader>
              <TableBody
                items={items}
                emptyContent={"Tidak Ada Pasien Booking"}
              >
                {items.map((item, index) => (
                  <TableRow key={item.nama}>
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{/* {getKeyValue(item, "nama")} */}</TableCell>
                    <TableCell>
                      {/* {formatRupiah(getKeyValue(item, "harga"))} */}
                    </TableCell>
                    <TableCell>
                      {/* {getKeyValue(item, "deskripsi")} */}
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
