"use client";

import React, { useState } from "react";
import { Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useRouter } from "next/navigation";
import { changePassword } from "@/services/auth";
import Cookies from "js-cookie";

export const GantiPasswordForm = () => {
  const router = useRouter();
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const gantiPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await changePassword(form);
      if (res.status === "true") {
        toast.success(res.message);
        Cookies.remove("verify-token");
        router.push("/masuk");
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
                  htmlFor="new_password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Kata Sandi Baru<span className="text-red-700">*</span>
                </label>
                <Input
                  variant="bordered"
                  name="new_password"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handleChange}
                  classNames={{
                    inputWrapper: "border",
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility1}
                    >
                      {isVisible1 ? (
                        <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible1 ? "text" : "password"}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Konfirmasi Kata Sandi<span className="text-red-700">*</span>
                </label>
                <Input
                  variant="bordered"
                  name="confirm_password"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handleChange}
                  classNames={{
                    inputWrapper: "border",
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility2}
                    >
                      {isVisible2 ? (
                        <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible2 ? "text" : "password"}
                />
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={gantiPassword}
                  className="group inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Spinner size="sm" className="mr-2 text-white group-hover:text-blue-600" />{" "}
                      Memproses...
                    </div>
                  ) : (
                    "Ganti Kata Sandi"
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
