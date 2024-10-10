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
import { FaShare } from "react-icons/fa";
import { pindahAntrian } from "@/services/antrian";
import toast from "react-hot-toast";

export const ModalPindahAntrian = ({ idPemeriksaan, fetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handlePindahAntrian = async () => {
    setLoading(true);
    try {
      const res = await pindahAntrian(idPemeriksaan);
      if (res.status === "true") {
        toast.success(res.message);
        onOpenChange();
        fetch();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(res.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Tooltip placement="top" showArrow content={"Pindahkan Antrian"}>
        <button
          onClick={onOpen}
          className="bg-red-600 p-2 rounded hover:opacity-80"
        >
          <FaShare className="text-white" />
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
                Pindahkan Antrian
              </ModalHeader>
              <ModalBody>
                <p>Apakah kamu yakin memindahkan antrian ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="bg-transparent text-[#DC2626] font-semibold text-sm"
                >
                  Batal
                </Button>
                <Button
                  onPress={handlePindahAntrian}
                  className="text-white bg-red-600"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  Pindahkan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
