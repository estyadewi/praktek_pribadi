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
  Input,
  Tooltip,
} from "@nextui-org/react";
import { FaFileInvoice } from "react-icons/fa";
import { SuratKeteranganSakit } from "@/components/print/SuratKeteranganSakit";

export const ModalSuratKeteranganSakit = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tanggal, setTanggal] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTanggal({
      ...tanggal,
      [name]: value,
    });
  };

  const handleModalClose = (openStatus) => {
    onOpenChange(openStatus);
    if (!openStatus) {
      setTanggal({});
    }
  };

  return (
    <>
      <Tooltip placement="top" showArrow content={"Surat Keterangan Sakit"}>
        <button
          onClick={onOpen}
          className="bg-red-500 p-2 rounded hover:opacity-80"
        >
          <FaFileInvoice className="text-white" />
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
                Surat Keterangan Sakit
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Tanggal Mulai <span className="text-red-700">*</span>
                    </label>
                    <Input
                      type="date"
                      variant="bordered"
                      name="tanggal_mulai"
                      size="md"
                      radius="sm"
                      className="bg-white"
                      onChange={handleChange}
                      min={new Intl.DateTimeFormat("en-CA", {
                        timeZone: "Asia/Jakarta",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(new Date())}
                      classNames={{
                        inputWrapper: "border",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Tanggal Selesai <span className="text-red-700">*</span>
                    </label>
                    <Input
                      type="date"
                      variant="bordered"
                      name="tanggal_selesai"
                      size="md"
                      radius="sm"
                      className="bg-white"
                      onChange={handleChange}
                      min={new Intl.DateTimeFormat("en-CA", {
                        timeZone: "Asia/Jakarta",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(new Date())}
                      classNames={{
                        inputWrapper: "border",
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="bg-transparent text-[#DC2626] font-semibold text-sm"
                >
                  Tutup
                </Button>
                <SuratKeteranganSakit
                  data={data}
                  tanggal={tanggal}
                  onClose={onClose}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
