import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Spinner,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { register, validateRegister } from "@/services/auth";
import Cookies from "js-cookie";

export const ModalPilihKirimOTP = ({ isAgree, form }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = async () => {
    setIsLoading(true);
    try {
      await toast.promise(validateRegister(form).then(
        async (res) => {
          if (res.status === "true") {
            return Promise.resolve(res);
          } else {
            return Promise.reject(res);
          }
        }
      ), {
        loading: "Memvalidasi data...",
        success: async (res) => {
          if (res.status === "true") {
            onOpen();
            return "Pilih metode pengiriman OTP";
          }
        },
        error: (err) => err.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (sendBy) => {
    setIsLoading(true);
    try {
      await toast.promise(register(form, sendBy).then(
        async (res) => {
          if (res.status === "true") {
            return Promise.resolve(res);
          } else {
            return Promise.reject(res);
          }
        }
      ), {
        loading: "Mendaftar...",
        success: async (res) => {
          if (res.status === "true") {
            Cookies.set("activation-token", res.token);
            router.push(`/aktivasi-akun?otp=${sendBy}`);
            return res.message;
          }
        },
        error: (err) => err.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={validateForm}
        className="group inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        isDisabled={!isAgree || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <Spinner size="sm" className="mr-2 group-hover:text-blue-600 text-white"/>
            Mendaftar...
          </div>
        ) : (
          "Daftar"
        )}{" "}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
        className="mx-5"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Pilih Metode Pengiriman OTP
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <button
                  className="w-full border p-2 rounded-md border-slate-400 text-slate-700 transition-all hover:shadow-md"
                  onClick={() => handleRegister("sms")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    `Kirim OTP via SMS ke +62${form.nomor}`
                  )}
                </button>
                <button
                  className="w-full border p-2 rounded-md border-slate-400 text-slate-700 transition-all hover:shadow-md"
                  onClick={() => handleRegister("email")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    `Kirim OTP via Email ke ${form.email}`
                  )}
                </button>
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
