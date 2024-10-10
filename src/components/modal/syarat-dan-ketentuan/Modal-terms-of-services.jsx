import React from "react";
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

export const TermsOfServices = ({ isAgree, setIsAgree }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAgree = () => {
    setIsAgree(true);
    onClose();
  };

  const handleDisagree = () => {
    setIsAgree(false);
    onClose();
  };

  return (
    <>
      <Checkbox isSelected={isAgree} onChange={onOpen}>
        <p className="text-sm text-slate-700 font-medium">
          Saya setuju dengan Syarat dan Ketentuan yang ada
        </p>
      </Checkbox>

      <Modal radius="sm" isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true} placement="center" className="mx-5">
        <ModalContent>
          <ModalHeader>Syarat dan Ketentuan</ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button className="bg-red-500 text-white" onClick={handleDisagree}>
              Tidak Setuju
            </Button>
            <Button color="primary" onClick={handleAgree}>
              Setuju
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
