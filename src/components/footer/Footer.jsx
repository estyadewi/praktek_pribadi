"use client";
import Link from "next/link";
import React from "react";
import { FaWhatsapp, FaEnvelope, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8 w-96">
            <div>
              <h2 className="text-2xl font-bold mb-4">Tentang Kami</h2>
              <p className="text-sm">
                Kami berkomitmen memberikan pelayanan terbaik dan personal dalam
                kesehatan reproduksi, kehamilan, dan persalinan.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Hubungi Kami</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Link href={"https://wa.me/6281809507311"} className="flex items-center hover:underline">
                    <FaWhatsapp className="mr-2" />
                    <span>0818-0950-7311</span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link href={"mailto:dr.estyadewiwidyasari@gmail.com"} className="flex items-center hover:underline">
                    <FaEnvelope className="mr-2" />
                    <span>dr.estyadewiwidyasari@gmail.com</span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link href={"https://www.instagram.com/praktek_dr.estya/"} className="flex items-center hover:underline">
                    <FaInstagram className="mr-2" />
                    <span>praktek_dr.estya</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Lokasi</h2>
            <p className="text-sm mb-4">
              Jl. HOS Cokroaminoto No.32, Pakuncen, Wirobrajan, Kota Yogyakarta,
              Daerah Istimewa Yogyakarta 55253, Indonesia
            </p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.926979673227!2d110.34775757742855!3d-7.797555872168957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a577e2ecb75bd%3A0x13ada8e87480cf24!2sPraktek%20dr.%20Estya%20Dewi%20W.%20%2CSpOG!5e0!3m2!1sid!2sid!4v1728056724047!5m2!1sid!2sid"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm">© 2024 All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};
