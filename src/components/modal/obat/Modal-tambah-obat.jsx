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
import { addObat } from "@/services/obat";
import toast from "react-hot-toast";
import { formatNumber } from "@/lib/constants";

export const ModalTambahObat = ({ fetch }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        nama: "",
        jenis: "",
        harga: null,
        satuan: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "harga") {
            const numericValue = value.replace(/[^0-9]/g, "");
            const rawValue = numericValue.replace(/\./g, "");
            setData({
                ...data,
                [name]: rawValue,
            });
        } else {
            setData({
                ...data,
                [name]: value,
            });
        }
    };

    const handleAddObat = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await addObat(data);
            if (res.status === "success") {
                toast.success(res.message);
                setLoading(false);
                fetch();
                onOpenChange();
                setData({
                    nama: "",
                    jenis: "",
                    harga: null,
                    satuan: "",
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
                jenis: "",
                harga: null,
                satuan: "",
            });
        }
    };

    return (
        <>
            <Button onClick={onOpen} color="success" className="text-[#F8FAFC] font-normal text-sm w-full" radius="sm">
                Tambah Obat
            </Button>

            <Modal isOpen={isOpen} onOpenChange={handleModalClose} isDismissable={false} isKeyboardDismissDisabled={true} placement="center" className="mx-5">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Tambah Obat</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-slate-700 mb-2">
                                    Nama Obat <span className="text-red-700">*</span>
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
                                <label htmlFor="jenis" className="block text-sm font-medium text-slate-700 mb-2">
                                    Jenis Obat <span className="text-red-700">*</span>
                                </label>
                                <select
                                onChange={handleChange}
                                name="jenis"
                                id="jenis"
                                className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                                >
                                    <option value="" selected disabled hidden></option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="Kapsul">Kapsul</option>
                                    <option value="Sirup">Sirup</option>
                                    <option value="Bubuk">Bubuk</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="satuan" className="block text-sm font-medium text-slate-700 mb-2">
                                    Satuan Obat <span className="text-red-700">*</span>
                                </label>
                                <select
                                onChange={handleChange}
                                name="satuan"
                                id="satuan"
                                className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                                >
                                    <option value="" selected disabled hidden></option>
                                    <option value="Strip">Strip</option>
                                    <option value="Botol">Botol</option>
                                    <option value="Sachet">Sachet</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="harga" className="block text-sm font-medium text-slate-700 mb-2">
                                    Harga Obat <span className="text-red-700">*</span>
                                </label>
                                <Input
                                    type="text"
                                    variant="bordered"
                                    name="harga"
                                    size="md"
                                    radius="sm"
                                    className="bg-white"
                                    value={data.harga ? formatNumber(data.harga) : ""}
                                    onChange={handleChange}
                                    classNames={{
                                    inputWrapper: "border",
                                    }}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} className="bg-transparent text-[#DC2626] font-semibold text-sm">
                            Batal
                        </Button>
                        <Button color="success" onClick={handleAddObat} className="text-white" isLoading={loading} spinnerPlacement="end">
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