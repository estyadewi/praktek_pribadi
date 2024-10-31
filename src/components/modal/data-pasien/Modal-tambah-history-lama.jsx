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
  Image,
  Input,
} from "@nextui-org/react";
import { FaHistory, FaCloudUploadAlt } from "react-icons/fa";

export const ModalTambahHistoryLama = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
                {/* <div>
                  <label
                    htmlFor="gambar"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    File <span className="text-red-700">*</span>
                  </label>

                  <label className="border-[2px] border-dashed flex justify-center items-center w-full h-40 rounded-2xl max-w-full">
                    <input
                      className="sr-only"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleImageChange}
                    />
                    {preview ? (
                      <>
                        {preview.type === "application/pdf" ? (
                          // <embed
                          //   src={preview.url}
                          //   type="application/pdf"
                          //   className="object-cover max-h-40 w-full max-w-full rounded-lg"
                          // />
                          <iframe
                            src={preview.url}
                            className="object-cover max-h-40 w-full max-w-full rounded-lg"
                            title="PDF Preview"
                          ></iframe>
                        ) : (
                          <Image
                            isZoomed
                            src={preview.url}
                            alt="preview"
                            className="object-cover max-h-40 w-full max-w-full rounded-lg"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col justify-center items-center">
                          <FaCloudUploadAlt
                            size={32}
                            className="text-gray-400"
                          />
                          <p className="text-medium text-gray-400 text-center">
                            Unggah File (Maksimal 2MB, Format: JPG, JPEG, PNG,
                            PDF. Minimal Ukuran Jika Gambar: 1280 x 720 piksel)
                          </p>
                        </div>
                      </>
                    )}
                  </label>
                </div> */}
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
                <Button onClick={onClose} className="text-white bg-orange-500">
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
