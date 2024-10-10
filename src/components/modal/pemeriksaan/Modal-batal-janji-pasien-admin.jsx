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
import { MdCancel } from "react-icons/md";
import { adminBatalkanJanjiPasien } from "@/services/pemeriksaan";

export const ModalAdminBatalJanjiPasien = ({ fetch, idPemeriksaan }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleBatalkan = async () => {
    setLoading(true);
    try {
      const res = await adminBatalkanJanjiPasien(idPemeriksaan);
      if (res.status === "true") {
        toast.success(res.message);
        fetch();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip placement="top" showArrow content={"Batalkan Booking"}>
        <button
          onClick={onOpen}
          className="bg-red-600 p-2 rounded hover:opacity-80"
        >
          <MdCancel className="text-white" />
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
                Batalkan Janji Temu
              </ModalHeader>
              <ModalBody>
                <p>Apakah kamu yakin membatalkan janji temu ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="bg-transparent text-[#DC2626] font-semibold text-sm"
                >
                  Tidak
                </Button>
                <Button
                  onPress={handleBatalkan}
                  className="text-white bg-red-600"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  Iya
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
