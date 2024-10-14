"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Link from "next/link";
import { TermsOfServices } from "@/components/modal/syarat-dan-ketentuan/Modal-terms-of-services";
import { ModalPilihKirimOTP } from "@/components/modal/otp/Modal-pilih-kirim-otp";

export const RegisterForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [form, setForm] = useState({
    nama: "",
    email : "",
    alamat: "",
    tanggal_lahir: "",
    nomor: "",
    jenis_kelamin: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
 
    let formattedValue = numericValue;
    if (numericValue.length > 0 && numericValue[0] !== '8') {
      formattedValue = '8' + numericValue.slice(1);
    }
    formattedValue = formattedValue.slice(0, 13);
    
    setForm((prevForm) => ({
      ...prevForm,
      nomor: formattedValue,
    }));
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
              Daftar ke <br />
              <Link href="/" className="font-bold text-blue-700 ">
                Praktek Pribadi
              </Link>{" "}
              🩺
            </h1>

            <div className="mt-8 grid grid-cols-7 gap-3 h-full">
              <div className="col-span-6">
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Nama<span className="text-red-700">*</span>
                </label>
                <Input
                  type="text"
                  variant="bordered"
                  name="nama"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handleChange}
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email<span className="text-red-700">*</span>
                </label>
                <Input
                  type="email"
                  variant="bordered"
                  name="email"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handleChange}
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="alamat"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Alamat<span className="text-red-700">*</span>
                </label>
                <Input
                  type="text"
                  variant="bordered"
                  name="alamat"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handleChange}
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="tanggal_lahir"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Tanggal Lahir<span className="text-red-700">*</span>
                </label>
                <Input
                  type="date"
                  variant="bordered"
                  name="tanggal_lahir"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handleChange}
                  max={
                    new Intl.DateTimeFormat('en-CA', { 
                      timeZone: 'Asia/Jakarta', 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit' 
                    }).format(new Date())
                  }
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="nomor"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Nomor<span className="text-red-700">*</span>
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

              <div className="col-span-6">
                <label
                  htmlFor="jenis_kelamin"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Jenis Kelamin<span className="text-red-700">*</span>
                </label>
                <select
                  onChange={handleChange}
                  name="jenis_kelamin"
                  id="jenis_kelamin"
                  className="h-10 w-full rounded-md border-r-8 border-transparent px-3 text-sm outline-1 outline outline-slate-200 shadow-sm hover:outline-slate-400 focus:outline-slate-400 focus:shadow-outline-slate-200"
                >
                  <option value="" selected disabled hidden></option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Kata Sandi<span className="text-red-700">*</span>
                </label>
                <Input
                  variant="bordered"
                  name="password"
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
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
              </div>

              <div className="col-span-6">
                <TermsOfServices isAgree={isAgree} setIsAgree={setIsAgree} />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <ModalPilihKirimOTP isAgree={isAgree} form={form} />
              </div>
            </div>

            <div className="text-slate-500 text-sm mt-2">
              <p>
                Sudah memiliki akun?
                <Link
                  href="/masuk"
                  className="text-indigo-500 hover:underline font-bold"
                >
                  {" "}
                  Masuk disini!
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
