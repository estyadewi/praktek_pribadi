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
import { deleteLayanan } from "@/services/layanan";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

export const ModalHapusLayanan = ({ id, fetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteLayanan(id);
      if (res.status === "success") {
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
      <Tooltip placement="top" showArrow content={"Hapus Layanan"}>
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
                Hapus Layanan
              </ModalHeader>
              <ModalBody>
                <p>Apakah kamu yakin menghapus layanan ini?</p>
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
