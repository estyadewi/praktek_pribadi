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
import { FaWalking } from "react-icons/fa";
import { berikanAntrian } from "@/services/antrian";

export const ModalBeriAntrian = ({ idPemeriksaan, fetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const handleBeriAntrian = async () => {
    try {
      setLoading(true);
      const res = await berikanAntrian(idPemeriksaan);
      if (res.status === "true") {
        toast.success("Berhasil memberikan antrian");
        setLoading(false);
        onOpenChange();
        fetch();
      } else {
        if (res.error instanceof Object) {
          for (const key in res.error) {
            toast.error(res.error[key]);
          }
        } else throw new Error(res.error);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <Tooltip placement="top" showArrow content={"Beri Nomor Antrian"}>
        <button
          onClick={onOpen}
          className="bg-orange-500 p-2 rounded hover:opacity-80"
        >
          <FaWalking className="text-white" />
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
                Berikan Antrian
              </ModalHeader>
              <ModalBody>
                <p>Berikan nomor antrian pada pasien ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="bg-transparent text-[#DC2626] font-semibold text-sm"
                >
                  Batal
                </Button>
                <Button
                  onPress={handleBeriAntrian}
                  className="text-white bg-[#F97316]"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  Berikan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
