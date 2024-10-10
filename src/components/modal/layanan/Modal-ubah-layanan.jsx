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
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { updateLayanan, getLayananById } from "@/services/layanan";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";
import { formatNumberDesimal } from "@/lib/constants";

export const ModalUbahLayanan = ({ id, fetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  const fetchData = async () => {
    try {
      const res = await getLayananById(id);
      setData(res);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateLayanan = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateLayanan(data, id);
      if (res.status === "success") {
        setLoading(false);
        fetch();
        onOpenChange();
        toast.success(res.message);
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

  const handleClick = async () => {
    await fetchData();
    onOpen();
  };

  return (
    <>
      <Tooltip placement="top" showArrow content={"Ubah Layanan"}>
        <button
          onClick={handleClick}
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
              <ModalHeader className="flex flex-col gap-5">
                Ubah Layanan
              </ModalHeader>
              <ModalBody>
                <div>
                  <label
                    htmlFor="nama"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Nama Layanan <span className="text-red-700">*</span>
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
                    htmlFor="harga"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Harga Layanan <span className="text-red-700">*</span>
                  </label>

                  <Input
                    type="text"
                    value={data.harga ? formatNumberDesimal(data.harga) : ""}
                    variant="bordered"
                    name="harga"
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
                    htmlFor="deskripsi"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Deskripsi Layanan <span className="text-red-700">*</span>
                  </label>
                  <Textarea
                    name="deskripsi"
                    variant="bordered"
                    value={data.deskripsi}
                    onChange={handleChange}
                    disableAutosize
                    disableAnimation
                    className="bg-white"
                    classNames={{
                      input: "resize-y min-h-[100px]",
                    }}
                  />
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
                  onClick={handleUpdateLayanan}
                  className="text-white bg-[#F97316]"
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
