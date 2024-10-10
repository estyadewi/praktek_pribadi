"use client"

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter, useSearchParams} from "next/navigation";
import { aktivasiAkun, regenerateOTP } from "@/services/auth";

export const AktivasiAkun = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    otp: "",
  });

  const params = useSearchParams();
  const sendBy = params.get("otp");

  const handleOTPChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const formattedValue = numericValue.slice(0, 4);
    
    setForm((prevForm) => ({
      ...prevForm,
      otp: formattedValue,
    }));
  };

  const verfikasiOTP = async (e) => {
    e.preventDefault();
    if (form.otp.length !== 4) {
      toast.error("OTP harus terdiri dari 4 digit");
      return;
    }
    try {
      const res = await aktivasiAkun(form.otp);
      if (res.status === "true") {
        toast.success(res.message);
        Cookies.remove("activation-token");
        Cookies.set("auth-token", res.token);
        router.push("/pasien/dashboard");
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await regenerateOTP(sendBy);
      if (res.status === "true") {
        toast.success(res.message);
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

  return (
    <section className="bg-slate-50 min-h-dvh">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="background"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-12 py-12 sm:px-12 lg:col-span-7 lg:px-36 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl w-full">
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Verifikasi OTP <br />
              <Link href="/" className="font-bold text-blue-700 ">
                Praktek Pribadi
              </Link>{" "}
              🩺
            </h1>

            <div className="mt-8 grid grid-cols-6 gap-6 h-full">
              <div className="col-span-6">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Kode OTP
                </label>
                <Input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  variant="bordered"
                  name="otp"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handleOTPChange}
                  value={form.otp}
                  placeholder="Masukkan 4 digit OTP"
                  maxLength={6}
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>

              <div className="col-span-6 text-slate-500 text-sm">
                <p>
                  Kode OTP Belum Masuk?{" "}
                  <button
                    onClick={resendOTP}
                    className="text-indigo-500 hover:underline font-bold"
                  >
                    {" "}
                    Kirim Ulang!
                  </button>
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={verfikasiOTP}
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Verifikasi
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};