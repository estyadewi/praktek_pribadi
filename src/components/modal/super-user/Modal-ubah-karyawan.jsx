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
import { UpdateKaryawan } from "@/services/super-user";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { spesialisasiDokter } from "@/lib/constants";

export const ModalUbahKaryawan = ({ fetch, karyawan }) => {
  const path = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const initialSpesialisasi = karyawan.dokter
    ? karyawan.dokter.spesialisasi
    : "";
  const [data, setData] = useState({
    nama: karyawan.nama,
    spesialisasi: initialSpesialisasi,
    nomor: karyawan.nomor,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    let formattedValue = numericValue;
    formattedValue = formattedValue.slice(0, 13);

    setData((prevData) => ({
      ...prevData,
      nomor: formattedValue,
    }));
  };

  const handleUpdateKaryawan = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (path === "/super-user/admin") {
        delete data.spesialisasi;
      }
      const res = await UpdateKaryawan(data, karyawan.id);
      if (res.status === "true") {
        toast.success(res.message);
        setLoading(false);
        fetch();
        onOpenChange();
        setData({
          nama: "",
          spesialisasi: "",
          nomor: "",
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
      <Tooltip content={"Ubah Karyawan"} placement="top" showArrow>
        <button
          onClick={onOpen}
          className="bg-[#F97316] p-2 rounded hover:opacity-80"
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
                {path === "/super-user/dokter" ? "Ubah Dokter" : "Ubah Admin"}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Nama Lengkap <span className="text-red-700">*</span>
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

                  {path === "/super-user/dokter" && (
                    <div>
                      <label
                        htmlFor="spesialisasi"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Spesialis <span className="text-red-700">*</span>
                      </label>
                      <select
                        name="spesialisasi"
                        id="spesialisasi"
                        className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                        onChange={handleChange}
                        value={data.spesialisasi}
                      >
                        <option value="" hidden>
                          Pilih Spesialis
                        </option>
                        {spesialisasiDokter.map((spesialis) => (
                          <option key={spesialis} value={spesialis}>
                            {spesialis}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="nomor"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Nomor Login <span className="text-red-700">*</span>
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
                      autoComplete="tel"
                      classNames={{
                        inputWrapper: "border",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Kata Sandi Baru<span className="text-red-700">*</span>
                    </label>

                    <Input
                      variant="bordered"
                      name="password"
                      size="md"
                      radius="sm"
                      className="bg-white"
                      onChange={handleChange}
                      classNames={{
                        inputWrapper: "border",
                      }}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                    />
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
                  onClick={handleUpdateKaryawan}
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
