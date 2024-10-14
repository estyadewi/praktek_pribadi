"use client";

import React, { useState } from "react";
import { Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { requestOTP } from "@/services/auth";

export const LupaPasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nomor: "",
  });

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    let formattedValue = numericValue;
    if (numericValue.length > 0 && numericValue[0] !== "8") {
      formattedValue = "8" + numericValue.slice(1);
    }
    formattedValue = formattedValue.slice(0, 13);

    setForm((prevForm) => ({
      ...prevForm,
      nomor: formattedValue,
    }));
  };

  const sendNomor = async (e) => {
    e.preventDefault();
    if (form.nomor.length < 10 || form.nomor.length > 13) {
      toast.error("Nomor telepon harus terdiri dari 10-13 digit");
      return;
    }

    setLoading(true);
    try {
      await toast.promise(requestOTP(form.nomor).then(
        async (res) => {
          if (res.status === "true") {
            return Promise.resolve(res);
          } else {
            return Promise.reject(res);
          }
        }
      ), {
        loading: "Memproses...",
        success: async (res) => {
          if (res.status === "true") {
            Cookies.set("verify-token", res.token);
            router.push("/verifikasi-otp");
            return res.message;
          }
        },
        error: (err) => err.message,
      });
    } finally {
      setLoading(false);
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
              Lupa Password <br />
              <Link href="/" className="font-bold text-blue-700 ">
                Praktek Pribadi
              </Link>{" "}
              🩺
            </h1>

            <div className="mt-8 grid grid-cols-6 gap-6 h-full">
              <div className="col-span-6">
                <label
                  htmlFor="nomor"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Nomor
                </label>
                <Input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  variant="bordered"
                  name="nomor"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handlePhoneChange}
                  value={form.nomor}
                  startContent={
                    <span className="text-slate-700 text-sm">+62</span>
                  }
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={sendNomor}
                  className="group inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Spinner size="sm" className="mr-2 text-white group-hover:text-blue-600" />{" "}
                      Memproses...
                    </div>
                  ) : (
                    "Lupa Kata Sandi"
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
