import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { updateDataPasien } from "@/services/data-pasien";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";

export const ModalUbahPasien = ({ fetch, pasien }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    nama: pasien.user.nama,
    email: pasien.email,
    alamat: pasien.alamat,
    tanggal_lahir: pasien.tanggal_lahir,
    nomor: pasien.user.nomor,
    jenis_kelamin: pasien.jenis_kelamin,
    golongan_darah: pasien.golongan_darah,
    tinggi_badan: pasien.tinggi_badan,
    status_kehamilan: pasien.status_kehamilan,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    let formattedValue = numericValue;
    if (numericValue.length > 0 && numericValue[0] !== "8") {
      formattedValue = "8" + numericValue.slice(1);
    }

    formattedValue = formattedValue.slice(0, 13);

    setData((prevData) => ({
      ...prevData,
      nomor: formattedValue,
    }));
  };

  const handleUbahDataPasien = async (e) => {
    for (const key in data) {
      if (data[key] === "" || data[key] === null) {
        delete data[key];
      }
    }
    console.log(data)
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateDataPasien(data, pasien.id);
      if (res.status === "true") {
        toast.success(res.message);
        setLoading(false);
        fetch();
        onOpenChange();
        setData({
          nama: "",
          email: "",
          alamat: "",
          tanggal_lahir: "",
          nomor: "",
          jenis_kelamin: "",
          golongan_darah: "",
          tinggi_badan: "",
          status_kehamilan: "",
        });
      } else {
        setLoading(false);
        if (res.error instanceof Object) {
          for (const key in res.error) {
            toast.error(res.error[key]);
          }
        } else throw new Error(res.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Tooltip placement="top" showArrow content={"Ubah Data Pasien"}>
        <button
          onClick={onOpen}
          className="bg-orange-500 p-2 rounded hover:opacity-80"
        >
          <FaPencilAlt className="text-white" />
        </button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
        className="mx-5"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ubah Data Pasien
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Nama <span className="text-red-700">*</span>
                    </label>
                    <Input
                      type="text"
                      value={data.nama}
                      variant="bordered"
                      name="nama"
                      size="md"
                      radius="sm"
                      className="bg-white"
                      onChange={handleChange}
                      classNames={{
                        inputWrapper: "border",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email <span className="text-red-700">*</span>
                    </label>
                    <Input
                      type="email"
                      value={data.email}
                      variant="bordered"
                      name="email"
                      size="md"
                      radius="sm"
                      className="bg-white"
                      onChange={handleChange}
                      classNames={{
                        inputWrapper: "border",
                      }}
                    />
                  </div>

                  <div className="flex flex-row gap-5">
                    <div className="w-full">
                      <label
                        htmlFor="nomor"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Nomor <span className="text-red-700">*</span>
                      </label>
                      <Input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        variant="bordered"
                        name="nomor"
                        size="md"
                        radius="sm"
                        className="bg-white"
                        onChange={handlePhoneChange}
                        value={data.nomor}
                        startContent={
                          <span className="text-slate-700 text-sm">+62</span>
                        }
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="tanggal_lahir"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Tanggal Lahir <span className="text-red-700">*</span>
                      </label>
                      <Input
                        type="date"
                        value={data.tanggal_lahir}
                        variant="bordered"
                        name="tanggal_lahir"
                        size="md"
                        radius="sm"
                        className="bg-white"
                        onChange={handleChange}
                        max={new Date().toISOString().split("T")[0]}
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="alamat"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Alamat <span className="text-red-700">*</span>
                    </label>
                    <Input
                      type="text"
                      value={data.alamat}
                      variant="bordered"
                      name="alamat"
                      size="md"
                      radius="sm"
                      className="bg-white"
                      onChange={handleChange}
                      classNames={{
                        inputWrapper: "border",
                      }}
                    />
                  </div>

                  <div className="flex flex-row gap-5">
                    <div className="w-full">
                      <label
                        htmlFor="golongan_darah"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Golongan Darah <span className="text-red-700">*</span>
                      </label>
                      <select
                        onChange={handleChange}
                        value={data.golongan_darah}
                        name="golongan_darah"
                        id="golongan_darah"
                        className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                      >
                        <option value="" selected disabled hidden></option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="tinggi_badan"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Tinggi Badan <span className="text-red-700">*</span>
                      </label>
                      <Input
                        type="number"
                        value={data.tinggi_badan}
                        variant="bordered"
                        name="tinggi_badan"
                        size="md"
                        radius="sm"
                        className="bg-white"
                        onChange={handleChange}
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-5">
                    <div className="w-full">
                      <label
                        htmlFor="jenis"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Jenis Kelamin <span className="text-red-700">*</span>
                      </label>

                      <select
                        onChange={handleChange}
                        value={data.jenis_kelamin}
                        name="jenis_kelamin"
                        id="jenis_kelamin"
                        className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                      >
                        <option value="" selected disabled hidden></option>
                        <option value="Laki-Laki">Laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="resiko_kehamilan"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Resiko Kehamilan <span className="text-red-700">*</span>
                      </label>

                      <select
                        onChange={handleChange}
                        value={data.status_kehamilan}
                        name="status_kehamilan"
                        id="resiko_kehamilan"
                        className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                      >
                        <option value="" selected disabled hidden></option>
                        <option value="Ya">Ya</option>
                        <option value="Tidak">Tidak</option>
                      </select>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="bg-transparent text-[#DC2626] font-semibold text-sm"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleUbahDataPasien}
                  className="text-white bg-orange-500"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  Ubah
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
