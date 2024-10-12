"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  Button,
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
import { FaHome, FaPencilAlt, FaSearch } from "react-icons/fa";
import { getAllArtikel } from "@/services/artikel";
import Link from "next/link";
import { ModalHapusArtikel } from "./HapusArtikel";

export const ArtikelPage = () => {
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
    return data.filter((item) =>
      item.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [page, filteredData]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllArtikel();
      setData(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

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
          href={"dashboard"}
        >
          Dashboard
        </BreadcrumbItem>
        <BreadcrumbItem className="font-normal">Artikel</BreadcrumbItem>
      </Breadcrumbs>

      <div>
        <Card className="w-full mt-8" radius="sm">
          <CardBody>
            <div className="justify-between items-center hidden sm:flex">
              <div>
                <Button
                  as={Link}
                  href={`artikel/tambah-artikel`}
                  radius="sm"
                  color="success"
                  className="text-white"
                >
                  Tambah Artikel
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
                  as={Link}
                  href={`artikel/tambah-artikel`}
                  radius="sm"
                  color="success"
                  className="text-white w-full"
                >
                  Tambah Artikel
                </Button>
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
              aria-label="Tabel Artikel"
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
                <TableColumn>Judul</TableColumn>
                <TableColumn>Aksi</TableColumn>
              </TableHeader>
              <TableBody items={items} emptyContent={"Tidak Ada Layanan"}>
                {items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{getKeyValue(item, "judul")}</TableCell>
                    <TableCell className="flex flex-row space-x-2 md:space-y-0">
                      <Tooltip
                        placement="top"
                        showArrow
                        content={"Ubah Artikel"}
                      >
                        <Link href={`artikel/ubah-artikel/${item.id}`}>
                          <button className="p-2 bg-orange-500 rounded hover:opacity-80">
                            <FaPencilAlt className="text-white " />
                          </button>
                        </Link>
                      </Tooltip>
                      <ModalHapusArtikel id={item.id} fetch={fetchData} />
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
