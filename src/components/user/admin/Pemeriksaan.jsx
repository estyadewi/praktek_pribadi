"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Spinner, Button } from "@nextui-org/react";
import { FaHome, FaSearch } from "react-icons/fa";
import { ModalPindahAntrian } from "@/components/modal/pemeriksaan/Modal-pindah-antrian";
import { ModalPemeriksaanSubjektif } from "@/components/modal/pemeriksaan/Modal-subjektif";
import { getDokterTersedia } from "@/services/jadwal-praktek";
import { getPasienHaveNoAntrian } from "@/services/pemeriksaan";

export const PemeriksaanAdminPage = () => {
    const [pasien, setPasien] = useState([]);
    const [dokter, setDokter] = useState([]);
    const [selectedDokter, setSelectedDokter] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const rowsPerPage = 5;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(1);
    };

    const filteredData = useMemo(() => {
        return pasien.filter(item => 
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

    const fetchDokter = async () => {
        setLoading(true);
        try {
            const response = await getDokterTersedia();
            setDokter(response);
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    }

    const fetchPasien = async () => {
        setLoading(true);
        try {
            const response = await getPasienHaveNoAntrian(selectedDokter);
            setPasien(response);
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDokter();
    }, []);

    useEffect(() => {
        fetchPasien();
    }, [selectedDokter]);

    const handleChangeDokter = (e) => {
        setSelectedDokter(e.target.value);
    }

    return (
        <div className="p-6">
            <div className="flex justify-between gap-4">
                <Breadcrumbs size="lg" itemClasses={{ item:"text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal", separator:"text-slate-700 text-xl" }}>
                    <BreadcrumbItem startContent={<FaHome className="text-2xl"/>} href="/admin/dashboard">Dashboard</BreadcrumbItem>
                    <BreadcrumbItem className="font-normal">Pemeriksaan</BreadcrumbItem>
                </Breadcrumbs>

                <div className="hidden lg:block">
                    <Card radius="sm" shadow="sm">
                        <CardBody className="flex justify-center items-center">
                            <p className="text-[#334155] font-semibold text-lg">No. Antrian untuk Pemeriksaan: {pasien.length === 0 ? 0 : pasien[0].nomor_antrian}</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="hidden lg:block">
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
                <Card className="w-full mt-8 lg:hidden" radius="sm">
                    <CardBody>
                        <div className="flex flex-col justify-center">
                            <div>
                                <Input
                                    type="text"
                                    startContent={<FaSearch className="text-slate-500"/>}
                                    radius="sm"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="flex justify-center bg-[#F4F4F5] mt-2 rounded-md p-1">
                                <p className="text-[#334155] font-semibold text-lg">No. Antrian untuk Pemeriksaan: {pasien.length === 0 ? 0 : pasien[0].nomor_antrian}</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="dokter" className="block text-md font-semibold text-slate-700 mb-2">
                            Pilih Dokter
                        </label>
                        <select
                            name="dokter"
                            id="dokter"
                            value={selectedDokter}
                            onChange={handleChangeDokter}
                            className="h-10 w-full md:w-64 rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                        >
                            {dokter.map((item, index) => (
                                <option key={index} value={item.id}>dr. {item.nama} (Spesialis {item.spesialisasi})</option>
                            ))}
                        </select>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[222px]">
                            <Spinner size="lg" />
                        </div>
                    ) : (
                        <Table 
                            aria-label="Tabel Pemeriksaan Pasien Admin"
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
                                        <TableCell>{"0" + String(getKeyValue(item.pasien.user, "nomor")).replace(/^0+/, "")}</TableCell>
                                        <TableCell className="flex flex-row space-x-2 md:space-y-0">
                                            <ModalPindahAntrian idPemeriksaan={item.id} fetch={fetchPasien}/>
                                            <ModalPemeriksaanSubjektif idPemeriksaan={item.id} fetch={fetchPasien}/>
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