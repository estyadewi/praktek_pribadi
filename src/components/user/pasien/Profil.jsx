"use client";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Spinner,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { getProfilePasien, updateProfilPasien } from "@/services/data-pasien";
import { changePassword } from "@/services/auth";
import { ModalOTPPasien } from "@/components/modal/otp/Modal-otp";
import toast from "react-hot-toast";

export const ProfilPasien = () => {
  const [data, setData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingButton1, setLoadingButton1] = useState(false);
  const [loadingButton2, setLoadingButton2] = useState(false);

  const handleChangeData = async (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUpdateData = async () => {
    setLoadingButton1(true);
    try {
      const response = await updateProfilPasien(data);
      if (response.status === "true") {
        fetchData();
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingButton1(false);
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    let formattedValue = numericValue;
    if (numericValue.length > 0 && numericValue[0] !== "8") {
      formattedValue = "8" + numericValue.slice(1);
    }

    formattedValue = formattedValue.slice(0, 13);

    setPhoneNumber(formattedValue);
  };

  const [gantiPassword, setGantiPassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  const handlePassowrdChange = (e) => {
    const { name, value } = e.target;
    setGantiPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPassword = async () => {
    setLoadingButton2(true);
    try {
      const response = await changePassword(gantiPassword);
      if (response.status === "true") {
        toast.success(response.message);
        setGantiPassword({
          new_password: "",
          confirm_password: "",
        });
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingButton2(false);
    }
  };

  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const fetchData = async () => {
    try {
      const data = await getProfilePasien();
      setData(data);
      setPhoneNumber("");
    } catch (error) {
      return error;
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
          item: "text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal",
          separator: "text-slate-700 text-xl",
        }}
      >
        <BreadcrumbItem
          startContent={<FaHome className="text-2xl" />}
          href="/pasien/dashboard"
        >
          Dashboard
        </BreadcrumbItem>
        <BreadcrumbItem className="font-normal">Profil</BreadcrumbItem>
      </Breadcrumbs>

      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <>
          <div className="mt-4">
            <Card radius="sm" className="p-2" shadow="sm">
              <CardHeader>
                <h1 className=" text-gray-600 font-semibold text-xl">Profil</h1>
              </CardHeader>

              <CardBody>
                <div className="grid grid-flow-row lg:grid-rows-3 gap-4">
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="nama"
                        className="block text-sm font-medium text-[#374151] mb-2"
                      >
                        Nama Lengkap
                      </label>
                      <Input
                        type="text"
                        id="nama"
                        variant="bordered"
                        name="nama"
                        size="md"
                        radius="sm"
                        className="bg-white"
                        onChange={handleChangeData}
                        value={data.user.nama}
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#374151] mb-2"
                      >
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        variant="bordered"
                        name="email"
                        onChange={handleChangeData}
                        size="md"
                        radius="sm"
                        className="bg-white"
                        value={data.email}
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tanggal_lahir"
                        className="block text-sm font-medium text-[#374151] mb-2"
                      >
                        Tanggal Lahir
                      </label>
                      <Input
                        type="date"
                        id="tanggal_lahir"
                        variant="bordered"
                        name="tanggal_lahir"
                        onChange={handleChangeData}
                        size="md"
                        radius="sm"
                        className="bg-white"
                        value={data.tanggal_lahir}
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-3 gap-4">
                  <div>
                      <label
                        htmlFor="alamat"
                        className="block text-sm font-medium text-[#374151] mb-2"
                      >
                        Alamat
                      </label>
                      <Input
                        type="text"
                        variant="bordered"
                        onChange={handleChangeData}
                        name="alamat"
                        id="alamat"
                        size="md"
                        radius="sm"
                        className="bg-white"
                        value={data.alamat}
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tinggi_badan"
                        className="block text-sm font-medium text-[#374151] mb-2"
                      >
                        Tinggi Badan
                      </label>
                      <Input
                        type="number"
                        id="tinggi_badan"
                        onChange={handleChangeData}
                        variant="bordered"
                        name="tinggi_badan"
                        size="md"
                        radius="sm"
                        className="bg-white"
                        value={data.tinggi_badan}
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="resiko_kehamilan"
                        className="block text-sm font-medium text-[#374151] mb-2"
                      >
                        Resiko Kehamilan
                      </label>
                      <select
                        name="status_kehamilan"
                        id="resiko_kehamilan"
                        onChange={handleChangeData}
                        value={data.status_kehamilan || ""}
                        className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                      >
                        <option value="" disabled hidden>Pilih Resiko Kehamilan</option>
                        <option value="Ya">Ya</option>
                        <option value="Tidak">Tidak</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="golongan_darah"
                        className="block text-sm font-medium text-[#374151] mb-2"
                      >
                        Golongan Darah
                      </label>
                      <select
                        name="golongan_darah"
                        id="golongan_darah"
                        onChange={handleChangeData}
                        value={data.golongan_darah || ""}
                        className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                      >
                        <option value="" disabled hidden>Pilih Golongan Darah</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center mt-4">
                  <Button className="text-white bg-indigo-500" radius="sm" onClick={handleSubmitUpdateData} isLoading={loadingButton1} spinnerPlacement="end">
                    Simpan
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="mt-4 flex flex-col lg:flex-row justify-center gap-4">
            <div className="lg:w-1/2">
              <Card radius="sm" className="p-2" shadow="sm">
                <CardHeader>
                  <h1 className=" text-gray-600 font-semibold text-xl">
                    Ubah Kata Sandi
                  </h1>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-rows-2 gap-4">
                    <div>
                      <label
                        htmlFor="new_password"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Kata Sandi Baru <span className="text-red-700">*</span>
                      </label>
                      <Input
                        variant="bordered"
                        name="new_password"
                        id="new_password"
                        onChange={handlePassowrdChange}
                        size="md"
                        value={gantiPassword.new_password}
                        radius="sm"
                        className="bg-white"
                        classNames={{
                          inputWrapper: "border",
                        }}
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility1}
                          >
                            {isVisible1 ? (
                              <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible1 ? "text" : "password"}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm_password"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Konfirmasi Kata Sandi{" "}
                        <span className="text-red-700">*</span>
                      </label>
                      <Input
                        variant="bordered"
                        name="confirm_password"
                        id="confirm_password"
                        size="md"
                        radius="sm"
                        value={gantiPassword.confirm_password}
                        onChange={handlePassowrdChange}
                        className="bg-white"
                        classNames={{
                          inputWrapper: "border",
                        }}
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility2}
                          >
                            {isVisible2 ? (
                              <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible2 ? "text" : "password"}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center mt-4">
                    <Button
                      className="text-white bg-indigo-500 disabled:opacity-50 disabled:hover:opacity-50"
                      radius="sm"
                      onClick={handleSubmitPassword}
                      isLoading={loadingButton2}
                      spinnerPlacement="end"
                      disabled={
                        gantiPassword.new_password === '' ||
                        gantiPassword.confirm_password === ''
                      }
                    >
                      Simpan
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="lg:w-1/2">
              <Card radius="sm" className="p-2" shadow="sm">
                <CardHeader>
                  <h1 className=" text-gray-600 font-semibold text-xl">
                    Ubah Nomor Telepon
                  </h1>
                </CardHeader>

                <CardBody>
                  <div className="grid grid-rows-1 gap-4">
                    <div>
                      <label
                        htmlFor="nomor"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Nomor Telepon <span className="text-red-700">*</span>
                      </label>
                      <Input
                        type="tel"
                        id="nomor"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        variant="bordered"
                        name="nomor"
                        size="md"
                        radius="sm"
                        className="bg-white"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        startContent={
                          <span className="text-slate-700 text-sm">+62</span>
                        }
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center mt-4">
                    <ModalOTPPasien nomorBaru={phoneNumber} fetch={fetchData} />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
