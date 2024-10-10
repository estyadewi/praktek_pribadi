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
  Textarea,
  Checkbox,
  Tooltip,
} from "@nextui-org/react";
import { FaClipboardList } from "react-icons/fa";
import toast from "react-hot-toast";
import { pemeriksaanSubjektif } from "@/services/pemeriksaan";

export const ModalPemeriksaanSubjektif = ({ idPemeriksaan, fetch }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [cek, setCek] = useState(false);
  const [data, setData] = useState({
    tekanan_darah: "",
    berat_badan: "",
    keluhan: "",
    gpa: "",
    hpm: "",
  });

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setCek(true);
    } else {
      setCek(false);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlePemeriksaanSubjektif = async () => {
    setLoading(true);
    try {
      if (cek === false) {
        delete data.gpa;
        delete data.hpm;
      }
      const res = await pemeriksaanSubjektif(data, idPemeriksaan);
      if (res.status === "true") {
        onOpenChange();
        toast.success("Pemeriksaan Subjektif Selesai");
        fetch();
      } else {
        if (res.error instanceof Object) {
          for (const key in res.error) {
            toast.error(res.error[key]);
          }
        } else throw new Error(res.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = (openStatus) => {
    onOpenChange(openStatus);
    if (!openStatus) {
      setData({
        tekanan_darah: "",
        berat_badan: "",
        keluhan: "",
        gpa: "",
        hpm: "",
      });
      setCek(false);
    }
  };

  return (
    <>
      <Tooltip placement="top" showArrow content={"Pemeriksaan Awal"}>
        <button
          onClick={onOpen}
          className="bg-orange-500 p-2 rounded hover:opacity-80"
        >
          <FaClipboardList className="text-white" />
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
                Pemeriksaan Awal (Subjektif)
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-row gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="tekanan_darah"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Tekanan Darah <span className="text-red-700">*</span>
                      </label>
                      <Input
                        type="text"
                        variant="bordered"
                        name="tekanan_darah"
                        size="md"
                        radius="sm"
                        className="bg-white"
                        onChange={handleChange}
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="berat_badan"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Berat Badan <span className="text-red-700">*</span>
                      </label>
                      <Input
                        type="text"
                        variant="bordered"
                        name="berat_badan"
                        size="md"
                        radius="sm"
                        className="bg-white"
                        onChange={handleChange}
                        classNames={{
                          inputWrapper: "border",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="keluhan"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Keluhan <span className="text-red-700">*</span>
                    </label>
                    <Textarea
                      name="keluhan"
                      variant="bordered"
                      onChange={handleChange}
                      disableAutosize
                      disableAnimation
                      className="bg-white"
                      classNames={{
                        input: "resize-y min-h-[100px]",
                      }}
                    />
                  </div>

                  <div>
                    <Checkbox
                      size="sm"
                      className="text-slate-700 text-sm font-medium"
                      isSelected={cek}
                      onChange={handleCheckboxChange}
                    >
                      Hamil
                    </Checkbox>
                  </div>

                  {cek && (
                    <>
                      <div>
                        <label
                          htmlFor="gpa"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          GPA <span className="text-red-700">*</span>
                        </label>
                        <Input
                          type="text"
                          variant="bordered"
                          name="gpa"
                          size="md"
                          radius="sm"
                          className="bg-white"
                          onChange={handleChange}
                          classNames={{
                            inputWrapper: "border",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="hpm"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          HPM <span className="text-red-700">*</span>
                        </label>
                        <Input
                          type="date"
                          variant="bordered"
                          name="hpm"
                          size="md"
                          radius="sm"
                          className="bg-white"
                          onChange={handleChange}
                          max={new Date().toISOString().split("T")[0]}
                          classNames={{
                            inputWrapper: "border",
                          }}
                        />
                      </div>
                    </>
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
                  onClick={handlePemeriksaanSubjektif}
                  className="text-white bg-orange-500"
                  isLoading={loading}
                  spinnerPlacement="end"
                >
                  Selesai
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
