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
} from "@nextui-org/react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { addDataPasien } from "@/services/data-pasien";
import toast from "react-hot-toast";

export const ModalTambahPasien = ({ fetch }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [data, setData] = useState({
        nama: "",
        email: "",
        alamat: "",
        tanggal_lahir: "",
        nomor: "",
        jenis_kelamin: "",
        password: "",
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
        const numericValue = inputValue.replace(/\D/g, '');
        
        let formattedValue = numericValue;
        if (numericValue.length > 0 && numericValue[0] !== '8') {
          formattedValue = '8' + numericValue.slice(1);
        }
        
        formattedValue = formattedValue.slice(0, 13);
        
        setData((prevData) => ({
          ...prevData,
          nomor: formattedValue,
        }));
      };
      

    const handleAddPasien = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await addDataPasien(data);
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
                    password: "",
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

    const handleModalClose = (openStatus) => {
        onOpenChange(openStatus);
        if (!openStatus) {
            setData({
                nama: "",
                email: "",
                alamat: "",
                tanggal_lahir: "",
                nomor: "",
                jenis_kelamin: "",
                password: "",
            });
        }
    };

    return (
        <>
            <Button onClick={onOpen} color="success" className="text-[#F8FAFC] font-normal text-sm w-full" radius="sm">
                Tambah Pasien
            </Button>

            <Modal isOpen={isOpen} onOpenChange={handleModalClose} isDismissable={false} isKeyboardDismissDisabled={true} placement="center" className="mx-5">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Tambah Pasien</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-slate-700 mb-2">
                                    Nama <span className="text-red-700">*</span>
                                </label>
                                <Input
                                    type="text"
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
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                    Email <span className="text-red-700">*</span>
                                </label>
                                <Input
                                    type="email"
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

                            <div>
                                <label htmlFor="alamat" className="block text-sm font-medium text-slate-700 mb-2">
                                    Alamat <span className="text-red-700">*</span>
                                </label>
                                <Input
                                    type="text"
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
                            <div className="flex justify-between items-center gap-3">
                                <div className="w-full">
                                    <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-slate-700 mb-2">
                                        Tanggal Lahir <span className="text-red-700">*</span>
                                    </label>
                                    <Input
                                        type="date"
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

                                <div className="w-full">
                                    <label htmlFor="nomor" className="block text-sm font-medium text-slate-700 mb-2">
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
                            </div>
                            
                            <div>
                                <label htmlFor="jenis" className="block text-sm font-medium text-slate-700 mb-2">
                                    Jenis Kelamin <span className="text-red-700">*</span>
                                </label>
                                <select
                                onChange={handleChange}
                                name="jenis_kelamin"
                                id="jenis_kelamin"
                                className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                                >
                                    <option value="" selected disabled hidden></option>
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                    Password <span className="text-red-700">*</span>
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
                        <Button onClick={onClose} className="bg-transparent text-[#DC2626] font-semibold text-sm">
                            Batal
                        </Button>
                        <Button color="success" onClick={handleAddPasien} className="text-white" isLoading={loading} spinnerPlacement="end">
                            Tambah
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}