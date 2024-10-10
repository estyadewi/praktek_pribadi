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
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { changeNomorOTP, verifyOTPChangeNomor } from "@/services/data-pasien";
import { regenerateOTP } from "@/services/auth";
import Cookies from "js-cookie";

export const ModalOTPPasien = ({nomorBaru, fetch}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [otp, setOTP] = useState("");
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const handleChangeOTP = (e) => {
        setOTP(e.target.value);
    };
    
    const handleRequestOTP = async () => {
        onOpen();
        setLoading1(true);
        try {
            const res = await changeNomorOTP(nomorBaru);
            if(res.status === "true"){
                setLoading1(false);
                Cookies.set("verify-token", res.token);
                toast.success(res.message);
            } else {
                setLoading1(false);
                toast.error(res.error);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleVerifyOTP = async () => {
        setLoading2(true);
        try {
            const data = {
              otp: otp,
              nomor: nomorBaru
            }
            const res = await verifyOTPChangeNomor(data);
            if(res.status === "true"){
                setLoading2(false);
                toast.success(res.message);
                onOpenChange();
                fetch();
            } else {
                setLoading2(false);
                toast.error(res.error);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading2(false);
            setOTP("");
        }
    }

    const handleRegenerateOTP = async (e) => {
      e.preventDefault();
        try {
            const res = await regenerateOTP('all');
            if(res.status === "true"){
                toast.success(res.message);
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    
  return (
    <>
      <Button onClick={handleRequestOTP} className="text-white bg-indigo-500 disabled:opacity-50 disabled:hover:opacity-50" radius="sm" isLoading={loading1} spinnerPlacement="end" disabled={nomorBaru.length < 10}>Kirim OTP</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} placement="center" className="mx-5">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Masukkan Kode OTP</ModalHeader>
              <ModalBody>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-[#374151] mb-2"
                  >
                    Kode OTP
                  </label>
                  <Input
                    type="text"
                    onChange={handleChangeOTP}
                    id="otp"
                    variant="bordered"
                    name="otp"
                    size="md"
                    radius="sm"
                    className="bg-white"
                    value={otp}
                    classNames={{
                      inputWrapper: "border",
                    }}
                  />
                </div>
                <div>
                  <button className="text-indigo-500 text-sm font-medium hover:underline" onClick={handleRegenerateOTP}>Kirim Ulang Kode OTP</button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button  onClick={onClose} className="bg-transparent text-[#DC2626] font-semibold text-sm">
                  Batal
                </Button>
                <Button onPress={handleVerifyOTP} className="text-white bg-orange-500" isLoading={loading2} spinnerPlacement="end">
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