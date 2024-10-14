import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MdOutlineVisibility } from "react-icons/md";
import { formatDate } from "@/lib/constants";

export const ModalDetailRiwayatPasien = ({data}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <button onClick={onOpen} className="bg-red-600 p-2 rounded hover:opacity-80"><MdOutlineVisibility className="text-white" /></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} placement="center" className="mx-5">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Detail Riwayat</ModalHeader>
              <ModalBody>
                <div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Tekanan Darah</p>
                            <p className="text-slate-700 text-sm font-normal">{data.pemeriksaan_awal.tekanan_darah}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Berat Badan</p>
                            <p className="text-slate-700 text-sm font-normal">{data.pemeriksaan_awal.berat_badan} Kg</p>
                        </div>
                        <div>
                            <p className="font-semibold">GPA</p>
                            <p className="text-slate-700 text-sm font-normal">{data.pemeriksaan_awal.gpa || "-"}</p>
                        </div>
                        <div>
                            <p className="font-semibold">HPM</p>
                            <p className="text-slate-700 text-sm font-normal">{data.pemeriksaan_awal.hpm ? formatDate(data.pemeriksaan_awal.hpm) : "-"}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-4">
                        <div>
                            <p className="font-semibold">Keluhan</p>
                            <p className="break-words text-slate-700 text-sm font-normal">{data.pemeriksaan_awal.keluhan}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Objektif</p>
                            <p className="break-words text-slate-700 text-sm font-normal">{data.objective}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Assessment</p>
                            <p className="break-words text-slate-700 text-sm font-normal">{data.assessment}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Plan</p>
                            <p className="break-words text-slate-700 text-sm font-normal">{data.plan}</p>
                        </div>
                        <div>
                          {data.penggunaan_obat.length > 0 ? (
                            <div>
                              <p className="font-semibold">Obat</p>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  {data.penggunaan_obat.map((item) => (
                                    <p key={item.obat.id} className="text-slate-700 text-sm font-normal">{item.obat.nama}</p>
                                  ))}
                                </div>
                                <div className="space-y-2">
                                  {data.penggunaan_obat.map((item) => (
                                    <p key={item.id} className="text-slate-700 text-sm font-normal">{item.jumlah} {item.obat.satuan}</p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="font-semibold">Obat</p>
                              <p className="text-slate-700 text-sm font-normal">-</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">Resep</p>
                          <p className="break-words text-slate-700 text-sm font-normal">{data.resep || "-"}</p>
                        </div>
                    </div>
                </div>

              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} className="text-white bg-red-600">
                  Tutup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};