"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Spinner } from "@nextui-org/react";
import { FaHome, FaSearch } from "react-icons/fa";
import { getDataPasien } from "@/services/data-pasien";
import { ModalTambahPasien } from "@/components/modal/data-pasien/Modal-tambah-pasien";
import { ModalDetailPasien } from "@/components/modal/data-pasien/Modal-detail-pasien";
import { ModalUbahPasien } from "@/components/modal/data-pasien/Modal-ubah-pasien";
import { ModalTambahHistoryLama } from "@/components/modal/data-pasien/Modal-tambah-history-lama";
import { ModalBookingJadwalMendadakPasien } from "@/components/modal/data-pasien/Modal-booking-jadwal-mendadak";
import { getDokterTersedia } from "@/services/jadwal-praktek";

export const DataPasienPage = () => {
    const [data, setData] = useState([]);
    const [dokter, setDokter] = useState([]);
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
            const itemNORM = String(item.nomor_rm);
            return item.user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            itemNORM.toLowerCase().includes(searchTerm.toLowerCase())
        });
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
            const [dataPasien, dataDokter] = await Promise.all([getDataPasien(), getDokterTersedia()]);
            setData(dataPasien);
            setDokter(dataDokter);
        } catch (error) {
            console.error("Failed to fetch data", error);
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
            <Breadcrumbs size="lg" itemClasses={{ item:"text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal", separator:"text-slate-700 text-xl" }}>
                <BreadcrumbItem startContent={<FaHome className="text-2xl"/>} href="/admin/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem className="font-normal">Data Pasien</BreadcrumbItem>
            </Breadcrumbs>

            <div>
                <Card className="w-full mt-8" radius="sm">
                    <CardBody>
                        <div className="justify-between items-center hidden sm:flex">
                            <div className="flex flex-row gap-2">
                                <ModalTambahPasien fetch={fetchData}/>
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    startContent={<FaSearch className="text-slate-500"/>}
                                    radius="sm"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Cari berdasarkan nama atau nomor RM"
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
                                    placeholder="Cari berdasarkan nama atau nomor RM"
                                />
                            </div>
                            <div className="w-full space-y-2">
                                <ModalTambahPasien fetch={fetchData}/>
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
                            aria-label="Tabel Data Pasien"
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
                            <TableBody items={items} emptyContent={"Tidak Ada Data Pasien"}>
                                {items.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{getKeyValue(item, "nomor_rm")}</TableCell>
                                        <TableCell className="whitespace-nowrap">{getKeyValue(item.user, "nama")}</TableCell>
                                        <TableCell>{"0" + String(getKeyValue(item.user, "nomor")).replace(/^0+/, "")}</TableCell>
                                        <TableCell className="flex flex-row space-x-2 md:space-y-0">
                                            <ModalDetailPasien data={item}/>
                                            <ModalUbahPasien pasien={item} fetch={fetchData}/>
                                            <ModalBookingJadwalMendadakPasien fetch={fetchData} idPasien={item.id} dokter={dokter}/>
                                            <ModalTambahHistoryLama idPasien={item.id}/>
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