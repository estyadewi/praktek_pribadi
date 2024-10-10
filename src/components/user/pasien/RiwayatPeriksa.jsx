"use client";

import { Breadcrumbs, BreadcrumbItem, Card, CardHeader, CardBody, Spinner, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { formatDate, formatRupiah } from "@/lib/constants";
import { cekToken } from "@/services/auth";
import { getHistoryPasien } from "@/services/data-pasien";
import Cookies from "js-cookie";
export const RiwayatPeriksaPasien = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const pages = Math.ceil(data.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);

    const fetchData = async () => {
        try {
            const res = await cekToken(Cookies.get("auth-token"));
            const response = await getHistoryPasien(res.id_pasien);
            if (response){
                setData(response);
            } else {
                setData([]);
            }
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-6">
            <Breadcrumbs size="lg" itemClasses={{ item: "text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal", separator: "text-slate-700 text-xl" }}>
                <BreadcrumbItem startContent={<FaHome className="text-2xl" />} href="/pasien/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem className="font-normal">Riwayat Periksa</BreadcrumbItem>
            </Breadcrumbs>

            <div className="mt-4">
                <Card radius="sm" className="p-2">
                    <CardHeader>
                        <h1 className=" text-gray-600 font-semibold text-xl">Riwayat Periksa</h1>
                    </CardHeader>

                    {loading ? (
                        <CardBody>
                            <div className="flex items-center justify-center">
                                <Spinner color="primary" />
                            </div>
                        </CardBody>
                    ) : (
                        <div className="p-3">
                            <Table 
                                aria-label="Tabel Riwayat Periksa Pasien"
                                bottomContent={
                                    <div className="flex w-full justify-center min-h">
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
                                    wrapper: "min-h-[340px]",
                                }}
                                >
                                <TableHeader>
                                    <TableColumn>No</TableColumn>
                                    <TableColumn>Tanggal</TableColumn>
                                    <TableColumn>Status</TableColumn>
                                    <TableColumn>Harga</TableColumn>
                                </TableHeader>
                                <TableBody items={items} emptyContent={"Belum Ada Riwayat Periksa"}>
                                    {(item) => (
                                    <TableRow key={item.name}>
                                        <TableCell>{(page - 1) * rowsPerPage + items.indexOf(item) + 1}</TableCell>
                                        <TableCell>{formatDate(item.tanggal_pemeriksaan)}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{formatRupiah(item.total_bayar)}</TableCell>
                                    </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
