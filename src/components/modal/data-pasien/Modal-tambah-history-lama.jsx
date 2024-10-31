import React, { useState } from "react";
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
import { FaHistory } from "react-icons/fa";
import { addHistoryManual } from "@/services/data-pasien";
import { toast } from "react-hot-toast";

export const ModalTambahHistoryLama = ({idPasien}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const formData = new FormData();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview({ type: file.type, url: fileURL });
      setSelectedFile(file);
    }
  };

  const handleCloseModal = () => {
    setPreview(null);
    setSelectedFile(null);
    onOpenChange();
  };

  const handleFileClick = () => {
    if (preview?.url) {
      window.open(preview.url, "_blank");
    }
  };

  const handleAddHistory = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      formData.append("rekam_medis", selectedFile);
      const res = await addHistoryManual(idPasien, formData);
      if (res.status === "true") {
        toast.success(res.message);
        handleCloseModal();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Tooltip showArrow content="Tambah History lama" placement="top">
        <button
          onClick={onOpen}
          className="bg-orange-500 p-2 rounded hover:opacity-80"
        >
          <FaHistory className="text-white" />
        </button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
        className="mx-5"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambah History Lama
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <label
                    htmlFor="gambar"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    File <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="gambar"
                      className="bg-gray-100 px-4 py-2 rounded cursor-pointer hover:bg-gray-200"
                    >
                      Choose File
                    </label>
                    {selectedFile && (
                      <span
                        className="cursor-pointer hover:underline text-slate-700"
                        onClick={handleFileClick}
                      >
                        {selectedFile.name}
                      </span>
                    )}
                    <input
                      type="file"
                      id="gambar"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleImageChange}
                    />
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
                <Button onClick={handleAddHistory} className="text-white bg-orange-500" isLoading={loading} spinnerPlacement="end" isDisabled={selectedFile == null}>
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
