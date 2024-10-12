"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Spinner } from "@nextui-org/react";
import { FaHome, FaSearch } from "react-icons/fa";
import { GetKaryawan } from "@/services/super-user";
import { ModalTambahKaryawan } from "@/components/modal/super-user/Modal-tambah-karyawan";
import { ModalUbahKaryawan } from "@/components/modal/super-user/Modal-ubah-karyawan";
import { ModalHapusKaryawan } from "@/components/modal/super-user/Modal-hapus-karyawan";

export const AdminPage = () => {
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
        return data.filter(item => {
            return item.nama.toLowerCase().includes(searchTerm.toLowerCase())
        });
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
            const res = await GetKaryawan("Admin");
            setData(res);
        } catch (error) {
            console.error("Failed to fetch data", error);
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
                <BreadcrumbItem startContent={<FaHome className="text-2xl"/>} href="/super-user/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem className="font-normal">Admin</BreadcrumbItem>
            </Breadcrumbs>

            <div>
                <Card className="w-full mt-8" radius="sm">
                    <CardBody>
                        <div className="justify-between items-center hidden sm:flex">
                            <div>
                                <ModalTambahKaryawan fetch={fetchData} />
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    startContent={<FaSearch className="text-slate-500"/>}
                                    radius="sm"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Cari Admin"
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
                                    placeholder="Cari Admin"
                                />
                            </div>
                            <div className="w-full">
                                <ModalTambahKaryawan fetch={fetchData} />
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
                            aria-label="Tabel Admin"
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
                                <TableColumn>Nomor Telepon <span className="font-light">(Digunakan untuk login)</span></TableColumn>
                                <TableColumn>Aksi</TableColumn>
                            </TableHeader>
                            <TableBody items={items} emptyContent={"Tidak Ada Admin"}>
                                {items.map((item, index) => (
                                    <TableRow key={item.nama}>
                                        <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell className="truncate whitespace-nowrap overflow-hidden max-w-[150px] md:max-w-none">{getKeyValue(item, "nama")}</TableCell>
                                        <TableCell>{getKeyValue(item, "nomor")}</TableCell>
                                        <TableCell className="flex flex-row space-x-2 md:space-y-0">
                                            <ModalHapusKaryawan id={item.id} fetch={fetchData}/>
                                            <ModalUbahKaryawan karyawan={item} fetch={fetchData}/>
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