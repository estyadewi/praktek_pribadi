"use client";

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
  FaClock,
  FaClinicMedical,
  FaCommentDollar,
} from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { useState, useEffect, useMemo } from "react";
import CounterCard from "@/components/Card/CounterCard";
import { ModalBeriAntrian } from "@/components/modal/beri-antrian/Modal-beri-antrian";
import { getDokterTersedia } from "@/services/jadwal-praktek";
import { getJadwalTemuDokter, getDashboardAdmin } from "@/services/pemeriksaan";
import SkeletonCounterCard from "@/components/Card/SkleteonCard";
import { ModalAdminBatalJanjiPasien } from "@/components/modal/pemeriksaan/Modal-batal-janji-pasien-admin";

export const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [dokter, setDokter] = useState([]);
  const [selectedDokter, setSelectedDokter] = useState(0);
  const [totalSlot, setTotalSlot] = useState(0);
  const [totalKuota, setTotalKuota] = useState(0);
  const [totalPembayaran, setTotalPembayaran] = useState(0);
  const [sisaAntrian, setSisaAntrian] = useState(0);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  const pages = Math.ceil((users?.length || 0) / rowsPerPage);

  const items = useMemo(() => {
    if (!users || users.length === 0) return [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const fetchDokter = async () => {
    try {
      const res = await getDokterTersedia();
      setDokter(res);
      setSelectedDokter(res[0].id);
    } catch (error) {
      return error;
    }
  };

  const fetchPasien = async () => {
    try {
      const res = await getJadwalTemuDokter(selectedDokter);
      setUsers(res);
    } catch (error) {
      setUsers([]);
      return error;
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardAdmin(selectedDokter);
      setTotalSlot(res.total_slot);
      setTotalKuota(res.total_kuota);
      setTotalPembayaran(res.pembayaran_selesai);
      setSisaAntrian(res.sisa_antrian);
    } catch (error) {
      return error;
    }
  };

  const handleChangeDokter = (e) => {
    setSelectedDokter(e.target.value);
  };

  useEffect(() => {
    fetchDokter();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPasien();
    fetchDashboard();
    setLoading(false);
  }, [selectedDokter]);

  return (
    <div className="p-6">
      <Breadcrumbs
        size="lg"
        itemClasses={{
          item: "text-slate-700 font-semibold data-[current=false]:text-slate-400 data-[current=false]:font-normal",
          separator: "text-slate-700 text-xl",
        }}
      >
        <BreadcrumbItem startContent={<FaHome className="text-2xl" />}>
          Dashboard
        </BreadcrumbItem>
      </Breadcrumbs>

      <div className="mt-5">
        <label
          htmlFor="dokter"
          className="block text-md font-semibold text-slate-700 mb-2"
        >
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
            <option key={index} value={item.id}>
              dr. {item.nama} (Spesialis {item.spesialisasi})
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="mt-3 grid grid-flow-row lg:grid-cols-4 gap-4">
          <SkeletonCounterCard />
          <SkeletonCounterCard />
          <SkeletonCounterCard />
          <SkeletonCounterCard />
        </div>
      ) : (
        <div className="mt-3 grid grid-flow-row lg:grid-cols-4 gap-4">
          <CounterCard
            icon={FaClock}
            title="Total Slot"
            value={totalSlot || 0}
          />
          <CounterCard
            icon={FaClinicMedical}
            title="Total Kuota"
            value={totalKuota || 0}
          />
          <CounterCard
            icon={FaCommentDollar}
            title="Pembayaran Selesai"
            value={totalPembayaran || 0}
          />
          <CounterCard
            icon={MdFactCheck}
            title="Sisa Antrian"
            value={sisaAntrian || 0}
          />
        </div>
      )}

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
              <TableColumn>Aksi</TableColumn>
            </TableHeader>
            <TableBody items={items} emptyContent={"Tidak Ada Pasien Booking"}>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {item.sesi.waktu_mulai.slice(0, 5)} -{" "}
                    {item.sesi.waktu_selesai.slice(0, 5)}
                  </TableCell>
                  <TableCell>{getKeyValue(item, "nomor_rm")}</TableCell>
                  <TableCell>{getKeyValue(item.pasien.user, "nama")}</TableCell>
                  <TableCell>
                    {"0" +
                      String(getKeyValue(item.pasien.user, "nomor")).replace(
                        /^0+/,
                        ""
                      )}
                  </TableCell>
                  <TableCell className="flex flex-row space-x-2 md:space-y-0">
                    <ModalBeriAntrian
                      idPemeriksaan={item.id}
                      fetch={fetchPasien}
                    />
                    <ModalAdminBatalJanjiPasien
                      idPemeriksaan={item.id}
                      fetch={fetchPasien}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};
