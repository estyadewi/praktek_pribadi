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
} from "@nextui-org/react";
import { batalkanJanjiPasien } from "@/services/pemeriksaan";
import toast from "react-hot-toast";

export const ModalBatalJanjiPasien = ({ fetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleBatalkanJanji = async () => {
    setLoading(true);
    try {
      const res = await batalkanJanjiPasien();
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      fetch();
    }
  };
  return (
    <>
      <Button
        radius="sm"
        size="sm"
        className="bg-red-500 text-white"
        onClick={onOpen}
      >
        Batalkan Janji
      </Button>
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
                  onPress={handleBatalkanJanji}
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
