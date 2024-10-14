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
      } else if (
        res.status === "false" &&
        res.data.status === "Janji Temu Dijadwalkan"
      ) {
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
        className="mx-5 sm:mx-auto w-full max-w-lg p-4"
      >
        <ModalContent className="rounded-lg shadow-lg bg-white dark:bg-gray-800">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-2 text-center p-4 text-xl font-semibold text-gray-900 dark:text-white">
                Daftar Jadwal Pemeriksaan
              </ModalHeader>

              <ModalBody className="modal-body overflow-y-auto max-h-80 p-6 space-y-6 text-slate-700 dark:text-slate-300">
                <div className="text-start space-y-6">
                  <h2 className="font-semibold text-xl text-slate-800">
                    Syarat dan Ketentuan Pendaftaran Sesi Pasien
                  </h2>
                  <p>
                    Dengan melakukan pendaftaran sesi konsultasi atau perawatan
                    di praktek dokter spesialis melalui platform ini, Anda
                    setuju untuk mematuhi dan terikat oleh syarat dan ketentuan
                    berikut:
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-medium text-lg text-slate-700">
                      1. Pendaftaran Sesi
                    </h3>
                    <ul className="list-disc list-outside pl-6 space-y-2">
                      <li>
                        Pendaftaran dilakukan secara online melalui platform
                        ini. Anda hanya dapat memiliki{" "}
                        <strong>1 pendaftaran aktif</strong>; harap batalkan
                        pendaftaran aktif sebelum membuat pendaftaran baru.
                      </li>
                      <li>
                        Jika Anda telah melakukan pendaftaran tetapi tidak hadir
                        pada jadwal yang telah ditentukan, pendaftaran tersebut
                        akan otomatis dibatalkan pada hari berikutnya.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-lg text-slate-700">
                      2. Konfirmasi dan Kedatangan
                    </h3>
                    <ul className="list-disc list-outside pl-6 space-y-2">
                      <li>
                        Pasien yang akan pasang/lepas IUD wajib konfirmasi
                        <strong> 6 jam sebelum kedatangan </strong> melalui
                        WhatsApp di 082137049037.
                      </li>
                      <li>
                        Nomor antrian pemeriksaan/konsultasi akan diberikan
                        berdasarkan
                        <strong> urutan kedatangan </strong> saat daftar ulang
                        di tempat.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-lg text-slate-700">
                      3. Antrian Pasien
                    </h3>
                    <p>
                      Setelah mendapatkan nomor antrian dan selesai pemeriksaan
                      awal, ketika sisa antrian tinggal{" "}
                      <strong>kurang dari 2 pasien di depan Anda</strong>,
                      notifikasi akan dikirim melalui <em>SMS dan email</em>.
                    </p>
                    <p>
                      Pada bagian <strong>Jadwal Saya</strong> di platform,
                      akan muncul pemberitahuan sisa antrian sebelum Anda
                      dipanggil masuk ke ruangan dokter.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-lg text-slate-700">
                      4. Perubahan Jadwal
                    </h3>
                    <ul className="list-disc list-outside pl-6 space-y-2">
                      <li>
                        Jam pemeriksaan/konsultasi dapat berubah sewaktu-waktu
                        jika dokter memiliki{" "}
                        <strong>tindakan operasi darurat</strong> di RS.
                      </li>
                      <li>
                        Jika ada perubahan jadwal, pendaftaran sesi yang ada
                        pada jadwal tersebut akan otomatis dibatalkan, dan Anda
                        harus melakukan pendaftaran sesi baru sesuai dengan sesi
                        yang tersedia.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-lg text-slate-700">
                      5. Kesehatan Pasien
                    </h3>
                    <p>
                      Jika Anda mengalami{" "}
                      <strong>demam, batuk, atau pilek berat</strong>, harap
                      bersedia menjadwalkan ulang demi kenyamanan pasien lain,
                      terutama yang sedang hamil.
                    </p>
                  </div>
                </div>

                <Checkbox
                  size="sm"
                  onChange={handleCheckboxChange}
                  className="mt-4"
                >
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Saya setuju dengan Syarat dan Ketentuan yang ada
                  </p>
                </Checkbox>
              </ModalBody>

              <ModalFooter className="flex justify-end gap-4 p-4 border-t border-gray-300 dark:border-gray-700">
                <Button
                  onClick={onClose}
                  className="bg-transparent text-red-500 font-semibold text-sm hover:underline"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleBookingJadwal}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
