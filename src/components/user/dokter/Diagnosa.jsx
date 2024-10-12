"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  Spinner,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { getLayananByDokter } from "@/services/layanan";
import { getAllObat } from "@/services/obat";
import { ModalHistoryPasien } from "@/components/modal/pemeriksaan/Modal-riwayat-pasien";
import { getPasienByNoRM } from "@/services/data-pasien";
import { formatDate } from "@/lib/constants";
import {
  getPemeriksaanByIdPemeriksaan,
  insertPemeriksaanDokter,
} from "@/services/pemeriksaan";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const DiagnosaPasienPage = ({ noRM }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idPemeriksaan = searchParams.get("idPemeriksaan");
  const [pasien, setPasien] = useState({});
  const [layanan, setLayanan] = useState([]);
  const [obat, setObat] = useState([]);
  const [resep, setResep] = useState("");
  const [selected, setSelected] = useState("Obat");
  const [scheduleVisit, setScheduleVisit] = useState(false);
  const [jadwalKunjungan, setJadwalKunjungan] = useState({ tanggal: "" });
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [layananUsed, setLayananUsed] = useState([{ layanan_id: "" }]);
  const [obatUsed, setObatUsed] = useState([]);
  const [pemeriksaan, setPemeriksaan] = useState({
    tekanan_darah: "",
    berat_badan: "",
    keluhan: "",
    gpa: "",
    hpm: "",
    objektif: "",
    assessment: "",
    plan: "",
  });

  const handleSeleted = useCallback((value) => {
    setSelected(value);
    if (value === "Obat") {
      setResep("");
    } else if (value === "Resep") {
      setObatUsed([]);
    } else if (value === "Obat+Resep") {
      setResep("");
      setObatUsed([]);
    } else if (value === "Tanpa Obat") {
      setResep("");
      setObatUsed([]);
    }
  }, []);

  const handleJadwalKunjunganChange = useCallback((e) => {
    const { value, name } = e.target;
    setJadwalKunjungan(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePemeriksaanChange = useCallback((e) => {
    const { value, name } = e.target;
    setPemeriksaan(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleResepChange = useCallback((e) => {
    setResep(e.target.value);
  }, []);

  const handleLayananChange = useCallback((index, value) => {
    setLayananUsed(prev => {
      const updated = [...prev];
      updated[index].layanan_id = value;
      return updated;
    });
  }, []);

  const addLayanan = useCallback(() => {
    setLayananUsed(prev => [...prev, { layanan_id: "" }]);
  }, []);

  const removeLayanan = useCallback((index) => {
    setLayananUsed(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleObatChange = useCallback((index, field, value) => {
    setObatUsed(prev => {
      const updated = [...prev];
      if (updated.length === 0) {
        updated.push({ obat_id: "", jumlah: "" });
      }
      updated[index][field === "id" ? "obat_id" : field] = value;
      return updated;
    });
  }, []);

  const addObat = useCallback(() => {
    setObatUsed(prev => [...prev, { obat_id: "", jumlah: "" }]);
  }, []);

  const removeObat = useCallback((index) => {
    setObatUsed(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleScheduleVisitChange = useCallback((isSelected) => {
    setScheduleVisit(isSelected);
    if (!isSelected) {
      setJadwalKunjungan({});
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [layananData, obatData, pasienData, pemeriksaanData] = await Promise.all([
        getLayananByDokter(),
        getAllObat(),
        getPasienByNoRM(noRM),
        getPemeriksaanByIdPemeriksaan(idPemeriksaan)
      ]);

      setLayanan(layananData);
      setObat(obatData);
      setPasien(pasienData);
      setPemeriksaan(prev => ({
        ...prev,
        tekanan_darah: pemeriksaanData.pemeriksaan_awal.tekanan_darah || "",
        berat_badan: pemeriksaanData.pemeriksaan_awal.berat_badan || "",
        keluhan: pemeriksaanData.pemeriksaan_awal.keluhan || "",
        gpa: pemeriksaanData.pemeriksaan_awal.gpa || "",
        hpm: pemeriksaanData.pemeriksaan_awal.hpm || "",
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [noRM, idPemeriksaan]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = useCallback(async () => {
    setLoadingButton(true);
    if (scheduleVisit && !jadwalKunjungan.tanggal) {
      setLoadingButton(false);
      return toast.error("Tanggal kunjungan tidak boleh kosong");
    }

    const data = {
      objective: pemeriksaan.objektif,
      assessment: pemeriksaan.assessment,
      plan: pemeriksaan.plan,
      resep,
      penjadwalan_kembali: jadwalKunjungan,
      pemeriksaan_awal: {
        tekanan_darah: pemeriksaan.tekanan_darah,
        berat_badan: pemeriksaan.berat_badan,
        keluhan: pemeriksaan.keluhan,
        gpa: pemeriksaan.gpa,
        hpm: pemeriksaan.hpm,
      },
      obat: obatUsed,
      layanan: layananUsed,
    };

    // Remove empty fields
    if (!data.pemeriksaan_awal.gpa && !data.pemeriksaan_awal.hpm) {
      delete data.pemeriksaan_awal.gpa;
      delete data.pemeriksaan_awal.hpm;
    }
    if (!data.resep) delete data.resep;
    if (data.obat.length === 0) delete data.obat;
    if (!scheduleVisit) delete data.penjadwalan_kembali;

    try {
      const res = await insertPemeriksaanDokter(data, idPemeriksaan);
      if (res.status === "true") {
        toast.success(res.message);
        router.replace("/dokter/pemeriksaan");
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.error instanceof Object) {
        Object.values(error.error).forEach(toast.error);
      } else {
        toast.error(error.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoadingButton(false);
    }
  }, [pemeriksaan, resep, jadwalKunjungan, obatUsed, layananUsed, scheduleVisit, idPemeriksaan, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div>
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
          <BreadcrumbItem className="font-normal" href="/dokter/pemeriksaan">
            Pemeriksaan
          </BreadcrumbItem>
          <BreadcrumbItem className="font-normal">Diagnosa</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <div className="mt-5 flex flex-col lg:flex-row w-full gap-4">
          <div className="lg:hidden">
            <Card radius="sm" shadow="sm">
              <CardBody>
                <h1 className="text-slate-700 font-semibold text-xl">
                  Informasi Pasien
                </h1>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">No RM</p>
                    <p className="text-sm text-slate-700 font-normal">{noRM}</p>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">Nama</p>
                    <p className="text-sm text-slate-700 font-normal">
                      {pasien.user.nama}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">
                      No Telepon
                    </p>
                    <p className="text-sm text-slate-700 font-normal">
                      {"0" + String(pasien.user.nomor).replace(/^0+/, "")}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">Alamat</p>
                    <p className="text-sm text-slate-700 font-normal">
                      {pasien.alamat}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">
                      Tanggal Lahir
                    </p>
                    <p className="text-sm text-slate-700 font-normal">
                      {formatDate(pasien.tanggal_lahir)}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className=" lg:w-1/2 xl:w-2/3">
            <Card radius="sm" shadow="sm">
              <CardBody>
                <h1 className="text-slate-700 font-semibold text-xl">
                  Form Diagnosis
                </h1>
                <div className="mt-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700 font-semibold">
                      Pemeriksaan Awal (Subjektif){" "}
                      <span className="text-red-700">*</span>
                    </p>
                    <ModalHistoryPasien idPasien={pasien.id} />
                  </div>
                  <div className="flex flex-col mt-2 gap-3">
                    <div className="flex flex-row gap-3">
                      <div className="w-full">
                        <label
                          htmlFor="tekanan_darah"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Tekanan Darah <span className="text-red-700">*</span>
                        </label>
                        <Input
                          id="tekanan_darah"
                          value={pemeriksaan.tekanan_darah}
                          type="text"
                          variant="bordered"
                          name="tekanan_darah"
                          size="md"
                          onChange={handlePemeriksaanChange}
                          radius="sm"
                          className="bg-white"
                          classNames={{
                            inputWrapper: "border",
                          }}
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="berat_badan"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Berat Badan <span className="text-red-700">*</span>
                        </label>
                        <Input
                          type="text"
                          value={pemeriksaan.berat_badan}
                          id="berat_badan"
                          onChange={handlePemeriksaanChange}
                          variant="bordered"
                          name="berat_badan"
                          size="md"
                          radius="sm"
                          className="bg-white"
                          classNames={{
                            inputWrapper: "border",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="keluhan"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Keluhan <span className="text-red-700">*</span>
                      </label>
                      <Textarea
                        name="keluhan"
                        value={pemeriksaan.keluhan}
                        id="keluhan"
                        onChange={handlePemeriksaanChange}
                        variant="bordered"
                        disableAutosize
                        disableAnimation
                        className="bg-white"
                        classNames={{
                          input: "resize-y min-h-[100px]",
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-3">
                      <div className="w-full">
                        <label
                          htmlFor="gpa"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          GPA <span className="text-red-700">*</span>
                        </label>
                        <Input
                          type="text"
                          value={pemeriksaan.gpa}
                          id="gpa"
                          variant="bordered"
                          onChange={handlePemeriksaanChange}
                          name="gpa"
                          size="md"
                          radius="sm"
                          className="bg-white"
                          classNames={{
                            inputWrapper: "border",
                          }}
                        />
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="hpm"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          HPM <span className="text-red-700">*</span>
                        </label>
                        <Input
                          type="date"
                          value={pemeriksaan.hpm}
                          id="hpm"
                          variant="bordered"
                          onChange={handlePemeriksaanChange}
                          name="hpm"
                          size="md"
                          radius="sm"
                          className="bg-white"
                          max={new Intl.DateTimeFormat("en-CA", {
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
                    </div>
                    <div>
                      <label
                        htmlFor="objektif"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Objektif <span className="text-red-700">*</span>
                      </label>
                      <Textarea
                        name="objektif"
                        value={pemeriksaan.objektif}
                        id="objektif"
                        onChange={handlePemeriksaanChange}
                        variant="bordered"
                        disableAutosize
                        disableAnimation
                        className="bg-white"
                        classNames={{
                          input: "resize-y min-h-[100px]",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="assessment"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Assessment <span className="text-red-700">*</span>
                      </label>
                      <Textarea
                        name="assessment"
                        value={pemeriksaan.assessment}
                        id="assessment"
                        onChange={handlePemeriksaanChange}
                        variant="bordered"
                        disableAutosize
                        disableAnimation
                        className="bg-white"
                        classNames={{
                          input: "resize-y min-h-[100px]",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="plan"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Plan <span className="text-red-700">*</span>
                      </label>
                      <Textarea
                        name="plan"
                        value={pemeriksaan.plan}
                        id="plan"
                        onChange={handlePemeriksaanChange}
                        variant="bordered"
                        disableAutosize
                        disableAnimation
                        className="bg-white"
                        classNames={{
                          input: "resize-y min-h-[100px]",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="lg:w-1/2 xl:w-1/3">
            <Card radius="sm" shadow="sm" className="hidden lg:block">
              <CardBody>
                <h1 className="text-slate-700 font-semibold text-xl">
                  Informasi Pasien
                </h1>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">No RM</p>
                    <p className="text-sm text-slate-700 font-normal">{noRM}</p>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">Nama</p>
                    <p className="text-sm text-slate-700 font-normal">
                      {pasien.user.nama}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">
                      No Telepon
                    </p>
                    <p className="text-sm text-slate-700 font-normal">
                      {"0" + String(pasien.user.nomor).replace(/^0+/, "")}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">Alamat</p>
                    <p className="text-sm text-slate-700 font-normal">
                      {pasien.alamat}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-sm text-slate-700 font-normal">
                      Tanggal Lahir
                    </p>
                    <p className="text-sm text-slate-700 font-normal">
                      {formatDate(pasien.tanggal_lahir)}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card radius="sm" shadow="sm" className="lg:mt-4">
              <CardBody>
                <div>
                  {layananUsed.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-4 justify-center items-end mb-3"
                    >
                      <div className="w-full">
                        <label
                          htmlFor={`layanan-${index}`}
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Layanan {index + 1}{" "}
                          <span className="text-red-700">*</span>
                        </label>
                        <select
                          id={`layanan-${index}`}
                          name={`layanan-${index}`}
                          value={item.layanan_id}
                          onChange={(e) =>
                            handleLayananChange(index, e.target.value)
                          }
                          className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                        >
                          <option value="" disabled hidden>
                            Pilih Layanan
                          </option>
                          {layanan.map((layananItem) => (
                            <option key={layananItem.id} value={layananItem.id}>
                              {layananItem.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Button
                        radius="sm"
                        className="bg-red-500 text-white disabled:opacity-80"
                        onClick={() => removeLayanan(index)}
                        disabled={layananUsed.length == 1}
                      >
                        Hapus
                      </Button>
                    </div>
                  ))}
                  <div>
                    <Button
                      radius="sm"
                      className="bg-orange-500 text-white mt-3"
                      onClick={addLayanan}
                    >
                      Tambah Layanan
                    </Button>
                  </div>
                </div>
                <div className="mt-5">
                  <RadioGroup
                    orientation="horizontal"
                    size="sm"
                    value={selected}
                    onValueChange={handleSeleted}
                  >
                    <Radio value="Obat">Obat</Radio>
                    <Radio value="Resep">Resep</Radio>
                    <Radio value="Obat+Resep">Obat + Resep</Radio>
                    <Radio value="Tanpa Obat">Tanpa Obat</Radio>
                  </RadioGroup>
                  <div className="mt-3">
                    {selected === "Obat" && (
                      <div className="flex flex-col">
                        {obatUsed.length === 0 ? (
                          <div className="flex flex-row gap-2 items-end mb-3">
                            <div className="w-1/2">
                              <label
                                htmlFor="obat-0"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                Obat 1 <span className="text-red-700">*</span>
                              </label>
                              <select
                                id="obat-0"
                                name="obat-0"
                                value=""
                                onChange={(e) =>
                                  handleObatChange(0, "id", e.target.value)
                                }
                                className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                              >
                                <option value="" disabled hidden>
                                  Pilih Obat
                                </option>
                                {obat
                                  .filter((item) => item.stok != 0)
                                  .map((obatItem) => (
                                    <option
                                      key={obatItem.id}
                                      value={obatItem.id}
                                    >
                                      {obatItem.nama}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="w-1/4">
                              <label
                                htmlFor="jumlah-0"
                                className="block text-sm font-medium text-slate-700 mb-2 whitespace-nowrap"
                              >
                                Jumlah <span className="text-xs"></span>{" "}
                                <span className="text-red-700">*</span>
                              </label>
                              <Input
                                type="number"
                                id="jumlah-0"
                                variant="bordered"
                                name="jumlah-0"
                                size="sm"
                                radius="sm"
                                value=""
                                onChange={(e) =>
                                  handleObatChange(0, "jumlah", e.target.value)
                                }
                                className="bg-white"
                                classNames={{
                                  inputWrapper: "border border-slate-300 h-10",
                                  input: "text-sm",
                                }}
                              />
                            </div>
                            <div>
                              <Button
                                className="text-white bg-red-500 opacity-80"
                                radius="sm"
                                disabled
                              >
                                Hapus
                              </Button>
                            </div>
                          </div>
                        ) : (
                          obatUsed.map((item, index) => {
                            const selectedObatItem = obat.find(
                              (obatItem) => obatItem.id == item.obat_id
                            );
                            return (
                              <div
                                key={index}
                                className="flex flex-row gap-2 items-end mb-3"
                              >
                                <div className="w-1/2">
                                  <label
                                    htmlFor={`obat-${index}`}
                                    className="block text-sm font-medium text-slate-700 mb-2"
                                  >
                                    Obat {index + 1}{" "}
                                    <span className="text-red-700">*</span>
                                  </label>
                                  <select
                                    id={`obat-${index}`}
                                    name={`obat-${index}`}
                                    value={item.obat_id}
                                    onChange={(e) =>
                                      handleObatChange(
                                        index,
                                        "id",
                                        e.target.value
                                      )
                                    }
                                    className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                                  >
                                    <option value="" disabled hidden>
                                      Pilih Obat
                                    </option>
                                    {obat.map((obatItem) => (
                                      <option
                                        key={obatItem.id}
                                        value={obatItem.id}
                                      >
                                        {obatItem.nama}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="w-1/4">
                                  <label
                                    htmlFor={`jumlah-${index}`}
                                    className="block text-sm font-medium text-slate-700 mb-2 whitespace-nowrap"
                                  >
                                    Jumlah{" "}
                                    <span className="text-xs">
                                      {selectedObatItem
                                        ? `(${selectedObatItem.satuan})`
                                        : ""}
                                    </span>{" "}
                                    <span className="text-red-700">*</span>
                                  </label>
                                  <Input
                                    type="number"
                                    id={`jumlah-${index}`}
                                    variant="bordered"
                                    name={`jumlah-${index}`}
                                    size="sm"
                                    radius="sm"
                                    value={item.jumlah}
                                    onChange={(e) =>
                                      handleObatChange(
                                        index,
                                        "jumlah",
                                        e.target.value
                                      )
                                    }
                                    className="bg-white"
                                    classNames={{
                                      inputWrapper:
                                        "border border-slate-300 h-10",
                                      input: "text-sm",
                                    }}
                                  />
                                </div>
                                <div>
                                  <Button
                                    className="text-white bg-red-500 disabled:opacity-80"
                                    radius="sm"
                                    onClick={() => removeObat(index)}
                                    disabled={obatUsed.length == 1}
                                  >
                                    Hapus
                                  </Button>
                                </div>
                              </div>
                            );
                          })
                        )}
                        <div>
                          <Button
                            className="text-white bg-orange-500"
                            radius="sm"
                            onClick={addObat}
                          >
                            Tambah Obat
                          </Button>
                        </div>
                      </div>
                    )}

                    {selected === "Resep" && (
                      <div>
                        <label
                          htmlFor="resep"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Resep <span className="text-red-700">*</span>
                        </label>
                        <Textarea
                          name="resep"
                          id="resep"
                          variant="bordered"
                          disableAutosize
                          disableAnimation
                          onChange={handleResepChange}
                          value={resep}
                          className="bg-white"
                          classNames={{
                            input: "resize-y min-h-[100px]",
                          }}
                        />
                      </div>
                    )}

                    {selected === "Obat+Resep" && (
                      <div>
                        <div className="flex flex-col">
                          {obatUsed.length === 0 ? (
                            <div className="flex flex-row gap-2 items-end mb-3">
                              <div className="w-1/2">
                                <label
                                  htmlFor="obat-0"
                                  className="block text-sm font-medium text-slate-700 mb-2"
                                >
                                  Obat 1 <span className="text-red-700">*</span>
                                </label>
                                <select
                                  id="obat-0"
                                  name="obat-0"
                                  value=""
                                  onChange={(e) =>
                                    handleObatChange(0, "id", e.target.value)
                                  }
                                  className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                                >
                                  <option value="" disabled hidden>
                                    Pilih Obat
                                  </option>
                                  {obat
                                    .filter((item) => item.stok != 0)
                                    .map((obatItem) => (
                                      <option
                                        key={obatItem.id}
                                        value={obatItem.id}
                                      >
                                        {obatItem.nama}
                                      </option>
                                    ))}
                                </select>
                              </div>
                              <div className="w-1/4">
                                <label
                                  htmlFor="jumlah-0"
                                  className="block text-sm font-medium text-slate-700 mb-2 whitespace-nowrap"
                                >
                                  Jumlah <span className="text-xs"></span>{" "}
                                  <span className="text-red-700">*</span>
                                </label>
                                <Input
                                  type="number"
                                  id="jumlah-0"
                                  variant="bordered"
                                  name="jumlah-0"
                                  size="sm"
                                  radius="sm"
                                  value=""
                                  onChange={(e) =>
                                    handleObatChange(
                                      0,
                                      "jumlah",
                                      e.target.value
                                    )
                                  }
                                  className="bg-white"
                                  classNames={{
                                    inputWrapper:
                                      "border border-slate-300 h-10",
                                    input: "text-sm",
                                  }}
                                />
                              </div>
                              <div>
                                <Button
                                  className="text-white bg-red-500 opacity-80"
                                  radius="sm"
                                  disabled
                                >
                                  Hapus
                                </Button>
                              </div>
                            </div>
                          ) : (
                            obatUsed.map((item, index) => {
                              const selectedObatItem = obat.find(
                                (obatItem) => obatItem.id == item.obat_id
                              );
                              return (
                                <div
                                  key={index}
                                  className="flex flex-row gap-2 items-end mb-3"
                                >
                                  <div className="w-1/2">
                                    <label
                                      htmlFor={`obat-${index}`}
                                      className="block text-sm font-medium text-slate-700 mb-2"
                                    >
                                      Obat {index + 1}{" "}
                                      <span className="text-red-700">*</span>
                                    </label>
                                    <select
                                      id={`obat-${index}`}
                                      name={`obat-${index}`}
                                      value={item.obat_id}
                                      onChange={(e) =>
                                        handleObatChange(
                                          index,
                                          "id",
                                          e.target.value
                                        )
                                      }
                                      className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                                    >
                                      <option value="" disabled hidden>
                                        Pilih Obat
                                      </option>
                                      {obat.map((obatItem) => (
                                        <option
                                          key={obatItem.id}
                                          value={obatItem.id}
                                        >
                                          {obatItem.nama}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="w-1/4">
                                    <label
                                      htmlFor={`jumlah-${index}`}
                                      className="block text-sm font-medium text-slate-700 mb-2 whitespace-nowrap"
                                    >
                                      Jumlah{" "}
                                      <span className="text-xs">
                                        {selectedObatItem
                                          ? `(${selectedObatItem.satuan})`
                                          : ""}
                                      </span>{" "}
                                      <span className="text-red-700">*</span>
                                    </label>
                                    <Input
                                      type="number"
                                      id={`jumlah-${index}`}
                                      variant="bordered"
                                      name={`jumlah-${index}`}
                                      size="sm"
                                      radius="sm"
                                      value={item.jumlah}
                                      onChange={(e) =>
                                        handleObatChange(
                                          index,
                                          "jumlah",
                                          e.target.value
                                        )
                                      }
                                      className="bg-white"
                                      classNames={{
                                        inputWrapper:
                                          "border border-slate-300 h-10",
                                        input: "text-sm",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <Button
                                      className="text-white bg-red-500 disabled:opacity-80"
                                      radius="sm"
                                      onClick={() => removeObat(index)}
                                      disabled={obatUsed.length == 1}
                                    >
                                      Hapus
                                    </Button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                          <div>
                            <Button
                              className="text-white bg-orange-500"
                              radius="sm"
                              onClick={addObat}
                            >
                              Tambah Obat
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="resep"
                            className="block text-sm font-medium text-slate-700 mb-2"
                          >
                            Resep <span className="text-red-700">*</span>
                          </label>
                          <Textarea
                            name="resep"
                            id="resep"
                            variant="bordered"
                            onChange={handleResepChange}
                            value={resep}
                            disableAutosize
                            disableAnimation
                            className="bg-white"
                            classNames={{
                              input: "resize-y min-h-[100px]",
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="mt-3">
                      <Checkbox
                        size="sm"
                        radius="sm"
                        isSelected={scheduleVisit}
                        onValueChange={handleScheduleVisitChange}
                      >
                        <span className="text-slate-700 font-medium">
                          Jadwalkan Kunjungan
                        </span>
                      </Checkbox>

                      {scheduleVisit && (
                        <div className="mt-2 flex flex-col gap-4">
                          <div>
                            <label
                              htmlFor="tanggal"
                              className="block text-sm font-medium text-slate-700 mb-2"
                            >
                              Tanggal <span className="text-red-700">*</span>
                            </label>
                            <Input
                              type="date"
                              id="tanggal"
                              onChange={handleJadwalKunjunganChange}
                              variant="bordered"
                              name="tanggal"
                              size="md"
                              radius="sm"
                              className="bg-white"
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
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Button
              color="success"
              className="text-white mt-4 w-full"
              radius="sm"
              onClick={handleSubmit}
              isLoading={loadingButton}
              spinnerPlacement="end"
            >
              Selesai Diagnosis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
