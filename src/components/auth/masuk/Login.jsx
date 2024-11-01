"use client";

import React, { useState, useCallback } from "react";
import { Input, Spinner } from "@nextui-org/react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { login, cekToken, regenerateOTP } from "@/services/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ nomor: "", password: "" });
  const [isNavigating, setIsNavigating] = useState(false);

  const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);

  const handleChange = useCallback((e) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePhoneChange = useCallback((e) => {
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, 13);
    setForm((prev) => ({ ...prev, nomor: numericValue }));
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setIsNavigating(true);
      try {
        await toast.promise(
          login(form.nomor, form.password).then(async (res) => {
            if (res.status === "true") {
              return Promise.resolve(res)
            } else {
              return Promise.reject(res)
            }
          }),
          {
            loading: "Melakukan login...",
            success: async (res) => {
              if (res.message === "Akun belum aktif") {
                toast.error(res.message);
                Cookies.set("activation-token", res.token);
                await regenerateOTP("all");
                router.push("/aktivasi-akun?otp=all");
                return "OTP telah dikirim";
              } else {
                const existingToken = Cookies.get("auth-token");
                if (existingToken) {
                  Cookies.remove("auth-token");
                }
                Cookies.set("auth-token", res.token);
                const data = await cekToken(res.token);
                router.replace(
                  `/${data.role.toLowerCase().replace(" ", "-")}/dashboard`
                );
                return res.message;
              }
            },
            error: (err) => err.error,
          }
        );
      } finally {
        setIsNavigating(false);
      }
    },
    [form, router]
  );

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
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Selamat datang di <br />
              <Link href="/" className="font-bold text-blue-700">
                Klinik dr. Estya
              </Link>{" "}
              🩺
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 text-sm md:text-base">
              Untuk melanjutkan menikmati dan mengakses semua layanan yang ada,
              silakan masuk dengan memasukkan akun Anda di bawah ini.
            </p>

            <form
              onSubmit={handleLogin}
              className="mt-8 grid grid-cols-6 gap-6 h-full"
            >
              <div className="col-span-6">
                <label
                  htmlFor="nomor"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Nomor Telepon
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
                  autoComplete="tel"
                  startContent={
                    <span className="text-slate-700 text-sm">+62</span>
                  }
                  classNames={{ inputWrapper: "border" }}
                  disabled={isNavigating}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Kata Sandi
                </label>
                <Input
                  variant="bordered"
                  name="password"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handleChange}
                  value={form.password}
                  classNames={{ inputWrapper: "border" }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      disabled={isNavigating}
                    >
                      {isVisible ? (
                        <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  disabled={isNavigating}
                />
              </div>

              <div className="col-span-6 flex justify-end">
                <Link 
                  href="/lupa-password"
                  className={`hover:underline text-slate-500 text-sm ${isNavigating ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={(e) => isNavigating && e.preventDefault()}
                >
                  Lupa Kata Sandi?
                </Link>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="group inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isNavigating}
                >
                  {isNavigating ? (
                    <div className="flex items-center">
                      <Spinner size="sm" className="mr-2 text-white group-hover:text-blue-600" />
                      Memproses...
                    </div>
                  ) : (
                    "Masuk"
                  )}
                </button>
              </div>
            </form>
            <div className="text-slate-500 text-sm mt-2">
              <p>
                Belum memiliki akun?
                <Link
                  href="/daftar"
                  className={`text-indigo-500 hover:underline font-bold ${isNavigating ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={(e) => isNavigating && e.preventDefault()}
                >
                  {" "}
                  Daftar
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};