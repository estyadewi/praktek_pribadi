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
import { API_IMG } from "@/lib/constants";

export const ModalHistoryPasienManual = ({ rekam_medis }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isPDF = rekam_medis?.toLowerCase().endsWith(".pdf");
  return (
    <>
      <button
        onClick={onOpen}
        className="text-indigo-500 hover:underline font-semibold text-sm"
      >
        History Pasien Manual
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Riwayat Pasien
              </ModalHeader>
              <ModalBody className="h-screen p-0">
                {isPDF ? (
                  <iframe
                    src={API_IMG + rekam_medis}
                    className="w-full h-full border-none"
                    title="Rekam Medis"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={`${API_IMG}${rekam_medis}`}
                      alt="Rekam Medis"
                      className="max-h-[85vh] w-auto shadow-lg rounded-lg"
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} className="text-white bg-indigo-500">
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
