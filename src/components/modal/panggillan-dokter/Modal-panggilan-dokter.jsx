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
import { FaBell } from "react-icons/fa";
import { panggilKeRuanganDokter } from "@/services/antrian";
import toast from "react-hot-toast";

export const ModalPanggilanDokter = ({ idPemeriksaan, fetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const handlePanggilPasien = async () => {
    setLoading(true);
    try {
      const res = await panggilKeRuanganDokter(idPemeriksaan);
      if (res.status === "true") {
        toast.success("Pasien berhasil dipanggil");
        onOpenChange();
        fetch();
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip placement="top" showArrow content={"Panggil Pasien"}>
        <button
          onClick={onOpen}
          className="bg-orange-500 p-2 rounded hover:opacity-80"
        >
          <FaBell className="text-white" />
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
                Panggilan Dokter
              </ModalHeader>
              <ModalBody>
                <p>Apakah kamu yakin memanggil pasien ini ke ruangan dokter?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="bg-transparent text-[#DC2626] font-semibold text-sm"
                >
                  Batal
                </Button>
                <Button
                  onPress={handlePanggilPasien}
                  className="text-white bg-orange-500"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  Panggil
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
