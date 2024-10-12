import React, { use } from "react";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { register, validateRegister } from "@/services/auth";
import Cookies from "js-cookie";

export const ModalPilihKirimOTP = ({ isAgree, form }) => {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const validateForm = async () => {
    try {
      const res = await validateRegister(form);
      if (res.status === "true") {
        onOpen();
      } else {
        if (res.error instanceof Object) {
          for (const key in res.error) {
            toast.error(res.error[key]);
          }
        } else throw new Error(res.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlRegister = async (sendBy) => {
    try {
      const res = await register(form, sendBy);
      if (res.status === "true") {
        toast.success(res.message);
        Cookies.set("activation-token", res.token);
        router.push(`/aktivasi-akun?otp=${sendBy}`);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button
        onClick={validateForm}
        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        isDisabled={!isAgree}
      >
        Daftar
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
                  onClick={() => handlRegister("sms")}
                >
                  Kirim OTP via SMS ke{" "}
                  <span className="font-bold">+62{form.nomor}</span>
                </button>
                <button
                  className="w-full border p-2 rounded-md border-slate-400 text-slate-700 transition-all hover:shadow-md"
                  onClick={() => handlRegister("email")}
                >
                  Kirim OTP via Email ke{" "}
                  <span className="font-bold">{form.email}</span>
                </button>
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
