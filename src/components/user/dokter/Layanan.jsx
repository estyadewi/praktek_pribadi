"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Spinner } from "@nextui-org/react";
import { FaHome, FaSearch } from "react-icons/fa";
import { getLayananByDokter } from "@/services/layanan";
import { ModalTambahLayanan } from "@/components/modal/layanan/Modal-tambah-layanan";
import { ModalHapusLayanan } from "@/components/modal/layanan/Modal-hapus-layanan";
import { ModalUbahLayanan } from "@/components/modal/layanan/Modal-ubah-layanan";
import { formatRupiah } from "@/lib/constants";

export const LayananPage = () => {
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
        return data.
        filter(item => item.is_active === 1).
        filter(item => 
            item.nama.toLowerCase().includes(searchTerm.toLowerCase())
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
            const res = await getLayananByDokter();
            setData(res);
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (page > pages && pages > 0) {
            setPage(pages);
        }
    }, [filteredData, page, pages]);
    
    return (
        <div className="p-6">
            <Breadcrumbs size="lg" itemClasses={{ item:"text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal", separator:"text-slate-700 text-xl" }}>
                <BreadcrumbItem startContent={<FaHome className="text-2xl"/>} href="/dokter/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem className="font-normal">Layanan</BreadcrumbItem>
            </Breadcrumbs>

            <div>
                <Card className="w-full mt-8" radius="sm">
                    <CardBody>
                        <div className="justify-between items-center hidden sm:flex">
                            <div>
                                <ModalTambahLayanan fetch={fetchData} />
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    startContent={<FaSearch className="text-slate-500"/>}
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
                                    startContent={<FaSearch className="text-slate-500"/>}
                                    radius="sm"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="w-full">
                                <ModalTambahLayanan fetch={fetchData} />
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
                            aria-label="Tabel Layanan"
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
                                <TableColumn>Harga</TableColumn>
                                <TableColumn>Deskripsi</TableColumn>
                                <TableColumn>Aksi</TableColumn>
                            </TableHeader>
                            <TableBody items={items} emptyContent={"Tidak Ada Layanan"}>
                                {items.map((item, index) => (
                                    <TableRow key={item.nama}>
                                        <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell className="truncate whitespace-nowrap overflow-hidden max-w-[150px] md:max-w-none">{getKeyValue(item, "nama")}</TableCell>
                                        <TableCell>{formatRupiah(getKeyValue(item, "harga"))}</TableCell>
                                        <TableCell className="text-ellipsis max-w-xs overflow-hidden whitespace-nowrap">{getKeyValue(item, "deskripsi")}</TableCell>
                                        <TableCell className="flex flex-row space-x-2 md:space-y-0">
                                            <ModalHapusLayanan id={item.id} fetch={fetchData}/>
                                            <ModalUbahLayanan id={item.id} fetch={fetchData}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    )
}