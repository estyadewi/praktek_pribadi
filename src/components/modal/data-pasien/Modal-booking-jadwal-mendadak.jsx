import React from "react";
import { useState, useEffect } from "react";
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
import {
  getDokterTersedia,
  getJadwalByTanggal,
} from "@/services/jadwal-praktek";
import { insertBookingDadakanPasien } from "@/services/data-pasien";

export const ModalBookingJadwalMendadakPasien = ({ fetch, idPasien }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [dokter, setDokter] = useState([]);
  const [selectedDokter, setSelectedDokter] = useState(1);
  const [sesi, setSesi] = useState([]);
  const [loadingSesi, setLoadingSesi] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleBookingDadakanPasien = async (e) => {
    e.preventDefault();
    const dataBooking = {
      ...data,
      pasien_id: idPasien,
    };
    try {
      setLoading(true);
      const res = await insertBookingDadakanPasien(dataBooking);
      if (res.status === "true") {
        toast.success(res.message);
        setLoading(false);
        fetch();
        onOpenChange();
        setData({});
      } else {
        setLoading(false);
        if (res.error instanceof Object) {
          for (const key in res.error) {
            toast.error(res.error[key]);
          }
        } else throw new Error(res.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchDokter = async () => {
    try {
      const res = await getDokterTersedia();
      setDokter(res);
      setSelectedDokter(res[0].id);
      setData({
        ...data,
        dokter_id: res[0].id,
      });
    } catch (error) {
      return error;
    }
  };

  const fetchSesi = async () => {
    setLoadingSesi(true);
    try {
      const res = await getJadwalByTanggal(
        selectedDokter,
        data.tanggal_pemeriksaan
      );
      setSesi(res.sesi);
    } catch (error) {
      return error;
    } finally {
      setLoadingSesi(false);
    }
  };

  useEffect(() => {
    fetchDokter();
  }, []);

  useEffect(() => {
    if (selectedDokter && data.tanggal_pemeriksaan) {
        fetchSesi();
    }
}, [selectedDokter, data.tanggal_pemeriksaan]);


  const handleModalClose = (openStatus) => {
    if (openStatus === false) {
      onOpenChange();
      setData({});
    }
  };

  return (
    <>
      <Tooltip showArrow content="Booking Jadwal Mendadak" placement="top">
        <button
          onClick={onOpen}
          className="bg-red-600 p-2 rounded hover:opacity-80"
        >
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
              <ModalHeader className="flex flex-col gap-1">
                Daftar Booking Pasien
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div>
                    <label
                      htmlFor="dokter"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Pilih Dokter <span className="text-red-700">*</span>
                    </label>
                    <select
                      onChange={handleChange}
                      value={selectedDokter}
                      name="dokter_id"
                      id="dokter"
                      className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                    >
                      {dokter.map((dokter) => (
                        <option key={dokter.id} value={dokter.id}>
                          dr. {dokter.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="tanggal"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
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
                  {data.tanggal_pemeriksaan && (
                    <div>
                      {loadingSesi ? (
                        <div className="flex justify-center items-center">
                          <Spinner size="md" />
                        </div>
                      ) : (
                        <div>
                          <label
                            htmlFor="sesi"
                            className="block text-sm font-medium text-slate-700 mb-2"
                          >
                            Pilih Sesi <span className="text-red-700">*</span>
                          </label>
                          <select
                            onChange={handleChange}
                            name="sesi_id"
                            id="sesi"
                            className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                          >
                            {sesi.filter((item) => item.sisa_kuota !== 0)
                              .length > 0 && (
                              <option value="" selected disabled hidden>
                                Pilih Sesi
                              </option>
                            )}
                            {sesi
                              .filter((item) => item.sisa_kuota !== 0)
                              .map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.waktu_mulai.slice(0, 5)} -{" "}
                                  {item.waktu_selesai.slice(0, 5)}
                                </option>
                              ))}
                            {sesi.filter((item) => item.sisa_kuota !== 0)
                              .length === 0 && (
                              <option selected disabled>
                                Tidak ada sesi tersedia
                              </option>
                            )}
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="bg-transparent text-[#DC2626] font-semibold text-sm"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleBookingDadakanPasien}
                  className="text-white bg-red-600"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
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
