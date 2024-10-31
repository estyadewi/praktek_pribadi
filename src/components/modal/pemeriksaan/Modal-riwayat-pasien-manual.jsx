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

export const ModalHistoryPasienManual = ({idPasien}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
 
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
              <ModalBody>
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
