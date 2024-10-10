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
import { rescheduleBookJadwal } from "@/services/pemeriksaan";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/constants";

export const ModalRescheduleBookingJadwal = ({
  idJadwal,
  tanggal,
  fetch,
  isOpen,
  dataPemeriksaan,
  onClose,
}) => {
  const { onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleRescheduleBookingJadwal = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        sesi_id: idJadwal,
        tanggal_pemeriksaan: tanggal,
      };
      const res = await rescheduleBookJadwal(data);
      if (res.status === "true") {
        toast.success(res.message);
        onClose();
      } else {
        if (res.error instanceof Object) {
          for (const key in res.error) {
            toast.error(res.error[key]);
          }
        } else throw new Error(res.error);
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
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          onClose();
        }}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
        className="mx-5"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Mengganti Jadwal Booking
            </ModalHeader>
            <ModalBody>
              <p className="text-slate-700">
                Apakah kamu yakin ingin mengganti jadwal tanggal{" "}
                <span className="font-semibold">
                  {formatDate(dataPemeriksaan.tanggal_pemeriksaan)}
                </span>{" "}
                dengan tanggal{" "}
                <span className="font-semibold">{formatDate(tanggal)}</span>?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button className="bg-transparent text-[#DC2626] font-semibold text-sm" onClick={onClose}>
                Batal
              </Button>
              <Button
                onClick={handleRescheduleBookingJadwal}
                className="text-white bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
                isLoading={loading}
                spinnerPlacement="end"
              >
                Daftar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
