"use client"

import {
  Breadcrumbs,
  BreadcrumbItem,
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
import {
  FaHome,
  FaClipboardList,
  FaPills,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { useState, useEffect, useMemo } from "react";
import { getLayananByDokter } from "@/services/layanan";
import { getAllObat } from "@/services/obat";
import CounterCard from "@/components/Card/CounterCard";
import { getPasienDashboardDokter } from "@/services/pemeriksaan";
import SkeletonCounterCard from "@/components/Card/SkleteonCard";

export const DashboardDokter = () => {
  const [pasien, setPasien] = useState([]);
  const [layanan, setLayanan] = useState(0);
  const [obat, setObat] = useState(0);
  const [totalPemeriksaan, setTotalPemeriksaan] = useState(0);
  const [sisaAntrian, setSisaAntrian] = useState(0);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  const pages = Math.ceil(pasien.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return pasien.slice(start, end);
  }, [page, pasien]);

  const fetchData = async () => {
    try {
      const layananRes = await getLayananByDokter();
      const obatRes = await getAllObat();
      const res = await getPasienDashboardDokter();
      setLayanan(layananRes.length);
      setObat(obatRes.length);
      setPasien(res.data);
      setTotalPemeriksaan(res.total_pemeriksaan);
      setSisaAntrian(res.sisa_antrian);
    } catch (error) {
      return
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="p-6">
      <Breadcrumbs
        size="lg"
        itemClasses={{
          item: "text-slate-700 font-semibold data-[current=false]:text-slate-400 data-[current=false]:font-normal",
          separator: "text-slate-700 text-xl",
        }}
      >
        <BreadcrumbItem
          startContent={<FaHome className="text-2xl" />}
        >
          Dashboard
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 grid grid-flow-row lg:grid-cols-4 gap-4">
        {loading ? (
          <>
            <SkeletonCounterCard />
            <SkeletonCounterCard />
            <SkeletonCounterCard />
            <SkeletonCounterCard />
          </>
        ) : (
          <>
            <CounterCard
              icon={FaBriefcaseMedical}
              title="Total Layanan"
              value={layanan || 0}
            />
            <CounterCard
              icon={FaClipboardList}
              title="Total Pemeriksaan (hari ini)"
              value={totalPemeriksaan || 0}
            />
            <CounterCard icon={FaPills} title="Total Obat" value={obat || 0} />
            <CounterCard icon={MdFactCheck} title="Sisa Antrian" value={sisaAntrian || 0} />
          </>
        )}
      </div>
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
              <TableColumn>Sesi</TableColumn>
              <TableColumn>No RM</TableColumn>
              <TableColumn>Nama</TableColumn>
              <TableColumn>No Telp</TableColumn>
            </TableHeader>
            <TableBody items={items} emptyContent={"Tidak Ada Pasien Booking"}>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{item.sesi.waktu_mulai.slice(0 ,5)} - {item.sesi.waktu_selesai.slice(0, 5)}</TableCell>
                  <TableCell>{getKeyValue(item, "nomor_rm")}</TableCell>
                  <TableCell>{getKeyValue(item.pasien.user, "nama")}</TableCell>
                  <TableCell>{"0" + String(getKeyValue(item.pasien.user, "nomor")).replace(/^0+/, "")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};
