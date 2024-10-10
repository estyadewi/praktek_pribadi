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
  Textarea
} from "@nextui-org/react";
import { addLayanan } from "@/services/layanan";
import toast from "react-hot-toast";
import { formatNumber } from "@/lib/constants";

export const ModalTambahLayanan = ({ fetch }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        nama: "",
        harga: null,
        deskripsi: "",
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
    
    

    const handleAddLayanan = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await addLayanan(data);
            if (res.status === "success") {
                toast.success(res.message);
                setLoading(false);
                fetch();
                onOpenChange();
                setData({
                    nama: "",
                    harga: null,
                    deskripsi: "",
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
                harga: null,
                deskripsi: "",
            });
        }
    };

    return (
        <>
            <Button onClick={onOpen} color="success" className="text-[#F8FAFC] font-normal text-sm w-full" radius="sm">
                Tambah Layanan
            </Button>

            <Modal isOpen={isOpen} onOpenChange={handleModalClose} isDismissable={false} isKeyboardDismissDisabled={true} placement="center" className="mx-5">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Tambah Layanan</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-slate-700 mb-2">
                                    Nama Layanan <span className="text-red-700">*</span>
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
                                <label htmlFor="harga" className="block text-sm font-medium text-slate-700 mb-2">
                                    Harga Layanan <span className="text-red-700">*</span>
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
                            <div>
                                <label htmlFor="deskripsi" className="block text-sm font-medium text-slate-700 mb-2">
                                    Deskripsi Layanan <span className="text-red-700">*</span>
                                </label>
                                <Textarea
                                    name="deskripsi"
                                    variant="bordered"
                                    onChange={handleChange}
                                    disableAutosize
                                    disableAnimation
                                    className="bg-white"
                                    classNames={{
                                        input: "resize-y min-h-[100px]",
                                    }}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} className="bg-transparent text-[#DC2626] font-semibold text-sm">
                            Batal
                        </Button>
                        <Button color="success" onClick={handleAddLayanan} className="text-white" isLoading={loading} spinnerPlacement="end">
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