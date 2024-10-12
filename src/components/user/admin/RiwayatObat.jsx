"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Spinner } from "@nextui-org/react";
import { FaHome, FaSearch } from "react-icons/fa";
import { getHistoryObatMasuk, getHistoryObatKeluar } from "@/services/riwayat-obat";
import { formatDate } from "@/lib/constants";

export const RiwayatObatPage = () => {
    const [obatMasuk, setObatMasuk] = useState([]);
    const [obatKeluar, setObatKeluar] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageMasuk, setPageMasuk] = useState(1);
    const [pageKeluar, setPageKeluar] = useState(1);
    const [loading, setLoading] = useState(true);
    const rowsPerPage = 5;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageMasuk(1);
        setPageKeluar(1);
    };

    const filteredObatMasuk = useMemo(() => {
        const obatMasukArray = Object.values(obatMasuk).flat();
    
        return obatMasukArray.filter(item =>
            formatDate(item.tanggal).toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.obat.nama.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, obatMasuk]);
    
    const filteredObatKeluar = useMemo(() => {
        const obatKeluarArray = Object.values(obatKeluar).flat();
    
        return obatKeluarArray.filter(item =>
            formatDate(item.tanggal).toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.obat.nama.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, obatKeluar]);
    

    const pagesMasuk = Math.ceil(filteredObatMasuk.length / rowsPerPage);
    const pagesKeluar = Math.ceil(filteredObatKeluar.length / rowsPerPage);

    const itemsMasuk = useMemo(() => {
        const start = (pageMasuk - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredObatMasuk.slice(start, end);
    }, [pageMasuk, filteredObatMasuk]);

    const itemsKeluar = useMemo(() => {
        const start = (pageKeluar - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredObatKeluar.slice(start, end);
    }, [pageKeluar, filteredObatKeluar]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const resMasuk = await getHistoryObatMasuk();
            setObatMasuk(resMasuk);
            const resKeluar = await getHistoryObatKeluar();
            setObatKeluar(resKeluar);
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
        if (pageMasuk > pagesMasuk && pagesMasuk > 0) {
            setPageMasuk(pagesMasuk);
        }
    }, [filteredObatMasuk, pageMasuk, pagesMasuk]);

    useEffect(() => {
        if (pageKeluar > pagesKeluar && pagesKeluar > 0) {
            setPageKeluar(pagesKeluar);
        }
    }, [filteredObatKeluar, pageKeluar, pagesKeluar]);

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <Breadcrumbs size="lg" itemClasses={{ item:"text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal", separator:"text-slate-700 text-xl" }}>
                    <BreadcrumbItem startContent={<FaHome className="text-2xl"/>} href="/admin/dashboard">Dashboard</BreadcrumbItem>
                    <BreadcrumbItem className="font-normal">Riwayat Obat</BreadcrumbItem>
                </Breadcrumbs>

                <div className="hidden sm:block">
                    <Input
                        type="text"
                        startContent={<FaSearch className="text-slate-500"/>}
                        radius="sm"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div>
                <Card className="w-full mt-8 sm:hidden" radius="sm">
                    <CardBody>
                        <div>
                            <div className="w-full">
                                <Input
                                    type="text"
                                    startContent={<FaSearch className="text-slate-500"/>}
                                    radius="sm"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Cari berdasarkan nama atau tanggal"
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Tabel Riwayat Obat Masuk */}
                <div className="mt-4">
                    <h1 className="mb-1 font-semibold text-slate-700">Riwayat Obat Masuk</h1>
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[222px]">
                            <Spinner size="lg" />
                        </div>
                    ) : (
                        <Table 
                            aria-label="Tabel Riwayat Obat Masuk"
                            bottomContent={
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="primary"
                                        page={pageMasuk}
                                        total={pagesMasuk}
                                        onChange={(page) => setPageMasuk(page)}
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
                                <TableColumn>Nama</TableColumn>
                                <TableColumn>Jumlah</TableColumn>
                                <TableColumn>Satuan</TableColumn>
                            </TableHeader>
                            <TableBody items={itemsMasuk} emptyContent={"Tidak Ada Riwayat Obat Masuk"}>
                                {itemsMasuk.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{(pageMasuk - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{formatDate(getKeyValue(item, "tanggal"))}</TableCell>
                                        <TableCell>{getKeyValue(item.obat, "nama")}</TableCell>
                                        <TableCell>{getKeyValue(item, "jumlah")}</TableCell>
                                        <TableCell>{getKeyValue(item.obat, "satuan")}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                {/* Tabel Riwayat Obat Keluar */}
                <div className="mt-4">
                    <h1 className="mb-1 font-semibold text-slate-700">Riwayat Obat Keluar</h1>
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[222px]">
                            <Spinner size="lg" />
                        </div>
                    ) : (
                        <Table 
                            aria-label="Tabel Riwayat Obat Keluar"
                            bottomContent={
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="primary"
                                        page={pageKeluar}
                                        total={pagesKeluar}
                                        onChange={(page) => setPageKeluar(page)}
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
                                <TableColumn>Nama</TableColumn>
                                <TableColumn>Jumlah</TableColumn>
                                <TableColumn>Satuan</TableColumn>
                            </TableHeader>
                            <TableBody items={itemsKeluar} emptyContent={"Tidak Ada Riwayat Obat Keluar"}>
                                {itemsKeluar.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{(pageKeluar - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{formatDate(getKeyValue(item, "tanggal"))}</TableCell>
                                        <TableCell>{getKeyValue(item.obat, "nama")}</TableCell>
                                        <TableCell>{getKeyValue(item, "jumlah")}</TableCell>
                                        <TableCell>{getKeyValue(item.obat, "satuan")}</TableCell>
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
