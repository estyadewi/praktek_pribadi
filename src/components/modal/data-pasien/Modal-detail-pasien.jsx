import React from "react";
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
import { FaIdCard } from "react-icons/fa";
import { formatDate } from "@/lib/constants";

export const ModalDetailPasien = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip placement="top" showArrow content={"Detail Pasien"}>
        <button
          onClick={onOpen}
          className="bg-red-600 p-2 rounded hover:opacity-80"
        >
          <FaIdCard className="text-white" />
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
                Data Pasien
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <p className="font-semibold">No RM</p>
                  <p>
                    {": "}
                    {data.nomor_rm}
                  </p>

                  <p className="font-semibold">Nama</p>
                  <p>
                    {": "}
                    {data.user.nama}
                  </p>

                  <p className="font-semibold">Email</p>
                  <p>
                    {": "}
                    {data.email}
                  </p>

                  <p className="font-semibold">No Telepon</p>
                  <p>
                    {": "}
                    {"0" + String(data.user.nomor).replace(/^0+/, "")}
                  </p>

                  <p className="font-semibold">Alamat</p>
                  <p>
                    {": "}
                    {data.alamat}
                  </p>

                  <p className="font-semibold">Tanggal Lahir</p>
                  <p>
                    {": "}
                    {formatDate(data.tanggal_lahir)}
                  </p>

                  <p className="font-semibold">Golongan Darah</p>
                  <p>
                    {": "}
                    {data.golongan_darah ? data.golongan_darah : "-"}
                  </p>

                  <p className="font-semibold">Tinggi Badan</p>
                  <p>
                    {": "}
                    {data.tinggi_badan ? data.tinggi_badan : "-"}
                  </p>

                  <p className="font-semibold">Resiko Kehamilan</p>
                  <p>
                    {": "}
                    {data.status_kehamilan ? data.status_kehamilan : "-"}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} className="text-white bg-[#EF4444]">
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
