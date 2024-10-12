import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { FaCalendarAlt } from "react-icons/fa";
import { getJadwalByTanggal } from "@/services/jadwal-praktek";
import { insertBookingDadakanPasien } from "@/services/data-pasien";

export const ModalBookingJadwalMendadakPasien = ({ fetch, idPasien, dokter }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [loadingSesi, setLoadingSesi] = useState(false);
  const [state, setState] = useState({
    tanggal_pemeriksaan: '',
    dokter_id: dokter[0]?.id || '',
    sesi_id: '',
  });
  const [sesi, setSesi] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingDadakanPasien = async (e) => {
    e.preventDefault();
    const { tanggal_pemeriksaan, dokter_id } = state;
    const dataBooking = {
      tanggal_pemeriksaan,
      pasien_id: idPasien,
      dokter_id,
      sesi_id: state.sesi_id,
    };

    setLoading(true);
    try {
      const res = await insertBookingDadakanPasien(dataBooking);
      if (res.status === "true") {
        toast.success(res.message);
        fetch();
        onOpenChange();
        setState({ tanggal_pemeriksaan: '', dokter_id: dokter[0]?.id || '', sesi_id: '' });
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      if (error instanceof Object) {
        for (const key in error) {
          toast.error(error[key]);
        }
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSesi = useCallback(async () => {
    if (state.dokter_id && state.tanggal_pemeriksaan) {
      setLoadingSesi(true);
      try {
        const res = await getJadwalByTanggal(state.dokter_id, state.tanggal_pemeriksaan);
        setSesi(res.sesi);
      } catch (error) {
        toast.error("Error fetching sesi: " + error.message);
      } finally {
        setLoadingSesi(false);
      }
    }
  }, [state.dokter_id, state.tanggal_pemeriksaan]);

  useEffect(() => {
    fetchSesi();
  }, [fetchSesi]);

  const handleModalClose = (openStatus) => {
    if (!openStatus) {
      onOpenChange();
      setState({ tanggal_pemeriksaan: '', dokter_id: dokter[0]?.id || '', sesi_id: '' });
    }
  };

  return (
    <>
      <Tooltip showArrow content="Booking Jadwal Mendadak" placement="top">
        <button onClick={onOpen} className="bg-red-600 p-2 rounded hover:opacity-80">
          <FaCalendarAlt className="text-white" />
        </button>
      </Tooltip>
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
              <ModalHeader className="flex flex-col gap-1">Daftar Booking Pasien</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="dokter" className="block text-sm font-medium text-slate-700 mb-2">
                      Pilih Dokter <span className="text-red-700">*</span>
                    </label>
                    <select
                      onChange={handleChange}
                      value={state.dokter_id}
                      name="dokter_id"
                      id="dokter"
                      className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                    >
                      {dokter.map((dok) => (
                        <option key={dok.id} value={dok.id}>
                          dr. {dok.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tanggal" className="block text-sm font-medium text-slate-700 mb-2">
                      Tanggal Booking <span className="text-red-700">*</span>
                    </label>
                    <Input
                      type="date"
                      variant="bordered"
                      name="tanggal_pemeriksaan"
                      size="md"
                      radius="sm"
                      className="bg-white"
                      onChange={handleChange}
                      classNames={{
                        inputWrapper: "border",
                      }}
                    />
                  </div>

                  {state.tanggal_pemeriksaan && (
                    <div>
                      {loadingSesi ? (
                        <div className="flex justify-center items-center">
                          <Spinner size="md" />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="sesi" className="block text-sm font-medium text-slate-700 mb-2">
                            Pilih Sesi <span className="text-red-700">*</span>
                          </label>
                          <select
                            onChange={handleChange}
                            name="sesi_id"
                            id="sesi"
                            className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                          >
                            {sesi.filter((item) => item.sisa_kuota !== 0).length > 0 ? (
                              <>
                                <option value="" disabled hidden>
                                  Pilih Sesi
                                </option>
                                {sesi.filter((item) => item.sisa_kuota !== 0).map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.waktu_mulai.slice(0, 5)} - {item.waktu_selesai.slice(0, 5)}
                                  </option>
                                ))}
                              </>
                            ) : (
                              <option disabled>Tidak ada sesi tersedia</option>
                            )}
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} className="bg-transparent text-[#DC2626] font-semibold text-sm">
                  Batal
                </Button>
                <Button onClick={handleBookingDadakanPasien} className="text-white bg-red-600" isLoading={loading} spinnerPlacement="end">
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
