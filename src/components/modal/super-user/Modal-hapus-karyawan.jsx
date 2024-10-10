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
  Tooltip,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { DeleteKaryawan } from "@/services/super-user";
import { usePathname } from "next/navigation";

export const ModalHapusKaryawan = ({ id, fetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await DeleteKaryawan(id);
      if (res.status === "true") {
        setLoading(false);
        fetch();
        onOpenChange();
        toast.success(res.message);
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Tooltip placement="top" showArrow content={"Hapus Karyawan"}>
        <button
          onClick={onOpen}
          className="bg-red-600 p-2 rounded hover:opacity-80"
        >
          <FaTrashAlt className="text-white" />
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
                {path === "/super-user/dokter" ? "Hapus Dokter" : "Hapus Admin"}
              </ModalHeader>
              <ModalBody>
                <p>
                  Apakah kamu yakin menghapus{" "}
                  {path === "/super-user/dokter" ? "dokter" : "admin"} ini?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="bg-transparent text-[#DC2626] font-semibold text-sm"
                >
                  Batal
                </Button>
                <Button
                  onPress={handleDelete}
                  className="text-white bg-[#EF4444]"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
