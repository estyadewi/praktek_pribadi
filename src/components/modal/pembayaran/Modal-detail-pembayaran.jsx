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
import { FaCommentDollar } from "react-icons/fa";
import { formatDate, formatRupiah } from "@/lib/constants";
import { konfirmasiPembayaran } from "@/services/pembayaran";
import toast from "react-hot-toast";

export const ModalDetailPembayaran = ({ data, fetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleKonfirmasi = async () => {
    setLoading(true);
    try {
      const res = await konfirmasiPembayaran(data.id);
      toast.success(res.message);
      onOpenChange();
      fetch();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip placement="top" showArrow content={"Konfirmasi Pembayaran"}>
        <button
          onClick={onOpen}
          className="bg-orange-500 p-2 rounded hover:opacity-80"
        >
          <FaCommentDollar className="text-white" />
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
                Struk Pembayaran
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-[#334155]">
                      No RM :
                    </p>
                    <p className="text-sm font-medium text-[#334155]">
                      {data.nomor_rm}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-[#334155]">Nama :</p>
                    <p className="text-sm font-medium text-[#334155]">
                      {data.pasien.user.nama}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-[#334155]">
                      Tanggal :
                    </p>
                    <p className="text-sm font-medium text-[#334155]">
                      {formatDate(data.tanggal_pemeriksaan)}
                    </p>
                  </div>
                  <div className="border border-black"></div>
                  <div>
                    <p className="text-sm font-bold text-[#334155]">
                      Layanan :
                    </p>
                    {data.penggunaan_layanan.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <p className="text-sm font-medium text-[#334155] ml-3">
                          {item.layanan.nama}
                        </p>
                        <p className="text-sm font-medium text-[#334155]">
                          {formatRupiah(item.layanan.harga)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#334155]">Obat :</p>
                    {data.penggunaan_obat.length > 0 ? (
                      data.penggunaan_obat.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <p className="text-sm font-medium text-[#334155] ml-3">
                            {item.obat.nama} x{item.jumlah}
                          </p>
                          <p className="text-sm font-medium text-[#334155]">
                            {formatRupiah(item.sub_total)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm font-medium text-[#334155] ml-3">
                        -
                      </p>
                    )}
                  </div>
                  <div className="border border-black"></div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-[#334155]">Total :</p>
                    <p className="text-sm font-bold text-[#334155]">
                      {formatRupiah(data.total_bayar)}
                    </p>
                  </div>
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
                  onPress={handleKonfirmasi}
                  className="text-white bg-orange-500"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  Konfirmasi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
