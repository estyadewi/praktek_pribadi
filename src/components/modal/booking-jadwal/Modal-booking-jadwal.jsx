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
  Checkbox,
} from "@nextui-org/react";
import { bookJadwal } from "@/services/pemeriksaan";
import toast from "react-hot-toast";
import { ModalRescheduleBookingJadwal } from "./Modal-reschedule-booking-jadwal";

export const ModalBookingJadwal = ({
  idJadwal,
  tanggal,
  sisa_kuota,
  fetch,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isReschedule, setIsReschedule] = useState(false);
  const [data, setData] = useState({});

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleBookingJadwal = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        sesi_id: idJadwal,
        tanggal_pemeriksaan: tanggal,
      };
      const res = await bookJadwal(data);
      setData(res.data);  
      if (res.status === "true") {
        toast.success(res.message);
        setLoading(false);
        onOpenChange(false);
        fetch();
      } else if(res.status === "false" && res.data.status === "Janji Temu Dijadwalkan"){
        setIsReschedule(true);
        onOpenChange(false);
        setLoading(false);
      } else {
        if (res.error instanceof Object) {
          for (const key in res.error) {
            toast.error(res.error[key]);
          }
        } else throw new Error(res.message);
        setLoading(false);
        onOpenChange(false);
        fetch();
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleModalClose = (openStatus) => {
    onOpenChange(openStatus);
    if (!openStatus) {
      setIsChecked(false);
    }
  };

  const handleRescheduleModalClose = () => {
    setIsReschedule(false);
    fetch();
  };

  return (
    <>
      {sisa_kuota > 0 ? (
        <button
          onClick={onOpen}
          className="bg-indigo-500 text-white p-2 flex justify-center items-center rounded hover:opacity-80"
        >
          Daftar
        </button>
      ) : (
        <p className="text-sm text-slate-700 font-medium">Kuota sudah habis</p>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
        className="mx-5"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Daftar Jadwal Pemeriksaan
              </ModalHeader>
              <ModalBody>
                <div className="text-slate-700 overflow-y-auto max-h-80">
                  <p className="text-justify mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p className="text-justify mb-4">
                    Magna exercitation reprehenderit magna aute tempor cupidatat
                    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt
                    ex incididunt cillum quis. Velit duis sit officia eiusmod
                    Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
                </div>
                <Checkbox size="sm" onChange={handleCheckboxChange}>
                  <p className="text-sm text-slate-700 font-medium">
                    Saya setuju dengan Syarat dan Ketentuan yang ada
                  </p>
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="bg-transparent text-[#DC2626] font-semibold text-sm"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleBookingJadwal}
                  className="text-white bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
                  isLoading={loading}
                  spinnerPlacement="end"
                  disabled={!isChecked}
                >
                  Daftar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ModalRescheduleBookingJadwal 
        fetch={fetch} 
        idJadwal={idJadwal} 
        tanggal={tanggal} 
        isOpen={isReschedule} 
        dataPemeriksaan={data} 
        onClose={handleRescheduleModalClose}
      />
    </>
  );
};