import React, { useState } from "react";
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
import { addStokObat } from "@/services/obat";
import toast from "react-hot-toast";

export const ModalTambahStokObat = ({ fetch, obat }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null);
    const [data, setData] = useState({
        stok: 0,
        tanggal: ""
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handleAddStokObat = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await addStokObat(data, id);
            if (res.status === "success") {
                toast.success(res.message);
                setLoading(false);
                fetch();
                onOpenChange();
                setId(null);
                setData({
                    stok: 0,
                    tanggal: ""
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
                stok: 0,
                tanggal: ""
            });
            setId(null);
        }
    };

    return (
        <>
            <Button onClick={onOpen} className="text-[#F8FAFC] bg-[#F97316] font-normal text-sm w-full" radius="sm">
                Tambah Stok Obat
            </Button>

            <Modal isOpen={isOpen} onOpenChange={handleModalClose} isDismissable={false} isKeyboardDismissDisabled={true} placement="center" className="mx-5">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Tambah Stok Obat</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="tanggal" className="block text-sm font-medium text-slate-700 mb-2">
                                    Tanggal <span className="text-red-700">*</span>
                                </label>
                                <Input
                                    type="date"
                                    variant="bordered"
                                    name="tanggal"
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

                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-slate-700 mb-2">
                                    Nama Obat <span className="text-red-700">*</span>
                                </label>
                                <select
                                onChange={handleId}
                                name="id"
                                id="nama"
                                className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                                >
                                    <option value="" selected disabled hidden></option>
                                    {obat.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nama}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="jumlah" className="block text-sm font-medium text-slate-700 mb-2">
                                    Jumlah Obat <span className="text-red-700">*</span>
                                </label>
                                <Input
                                    type="number"
                                    variant="bordered"
                                    name="stok"
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
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} className="bg-transparent text-[#DC2626] font-semibold text-sm">
                            Batal
                        </Button>
                        <Button onClick={handleAddStokObat} className="text-white bg-[#F97316]" isLoading={loading} spinnerPlacement="end">
                            Tambah
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
};
