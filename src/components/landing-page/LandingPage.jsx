"use client";

import React from "react";
import { FaHeartbeat, FaCommentMedical, FaDna, FaStethoscope } from "react-icons/fa";
import { LayananCard } from "../Card/LayananCard";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export const LandingPage = () => {
  return (
    <>
      <div className="bg-[#E1EEFF] h-[90vh] content-center">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-between py-8 lg:py-20 ">
            <div className="w-full flex flex-col md:flex-row items-center md:gap-10">
              <motion.div
                className="w-full lg:w-1/2 md:order-2 lg:mb-0 flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="image1.jpg"
                  className="rounded-xl object-cover w-full lg:w-4/5 h-auto"
                  alt="Doctor's image"
                />
              </motion.div>
              <motion.div
                className="w-full lg:w-1/2 md:order-1 lg:pr-12 mt-8 lg:mt-0"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-[#021526] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-left">
                  Prakter Dokter
                  <br />
                  <span className="text-indigo-500">dr Estya Dewi, SpOG</span>
                </h1>
                <p className="text-sm lg:text-md text-slate-600 mb-6 text-justify">
                  Kami menyediakan layanan pemeriksaan dan konsultasi
                  komprehensif di bidang kandungan dan kebidanan untuk mendukung
                  kesehatan dan kenyamanan Anda selama perjalanan kehamilan.
                </p>
                <div className="flex justify-start space-x-4 sm:space-x-0">
                  <Link href="/masuk">
                    <motion.button
                      className="font-medium bg-indigo-500 text-white px-6 py-2 rounded-xl hover:opacity-80 transition-all sm:hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Masuk
                    </motion.button>
                  </Link>
                  <Link href="/daftar">
                    <motion.button
                      className="font-medium border border-indigo-500 text-indigo-500 px-6 py-2 rounded-xl hover:text-white hover:bg-indigo-500 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Daftar Sekarang
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AnimatedSection>
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          <h1 className="font-bold text-3xl sm:text-4xl text-slate-700 mb-6">
            Layanan Kami
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <LayananCard
              icon={FaHeartbeat}
              title="USG Kandungan"
              description="USG transabdominal untuk memeriksa kesehatan organ reproduksi dan perkembangan janin, serta USG transvaginal untuk analisis detail pada usia kehamilan muda."
              isBlue={false}
            />
            <LayananCard
              icon={FaCommentMedical}
              title="Konsultasi"
              description="Kami menyediakan konsultasi untuk skrining kesehatan organ reproduksi, perencanaan kehamilan, dan pemilihan alat KB yang tepat."
              isBlue={true}
            />
            <LayananCard
              icon={FaDna}
              title="Skrining DNA HPV"
              description="Prosedur ini bertujuan untuk mendeteksi virus HPV, penyebab kanker serviks dan mulut rahim."
              isBlue={false}
            />
            <LayananCard
              icon={FaStethoscope}
              title="Papsmear"
              description="Kami menawarkan Papsmear untuk deteksi dini kanker serviks dengan menggunakan metode liquid-based cytology, yang memberikan hasil lebih teliti."
              isBlue={true}
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          <h1 className="font-bold text-3xl sm:text-4xl text-slate-700 mb-6">
            Tentang Dokter
          </h1>
          <div className="flex flex-col md:flex-row items-center md:gap-5">
            <div className="w-full lg:w-1/2 lg:mb-0 flex justify-center lg:justify-start">
              <img
                src="image1.jpg"
                className="rounded-xl object-cover w-full lg:w-4/5 h-auto"
                alt="Doctor's profile"
              />
            </div>
            <div className="w-full lg:w-1/2 lg:pr-12 mt-8 lg:mt-0">
              <h1 className="text-slate-700 font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 text-left">
                dr Estya Dewi, SpOG
              </h1>
              <p className="text-sm lg:text-medium text-slate-700 mb-6 text-justify">
                Dokter spesialis Obstetri dan Ginekologi yang menamatkan
                pendidikan di Universitas Gadjah Mada pada tahun 2013. Saat ini
                bekerja di RS Siloam dan RS Panti Rapih Yogyakarta, dengan
                pengalaman luas dalam menangani kesehatan reproduksi, kehamilan,
                dan kesuburan.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};
