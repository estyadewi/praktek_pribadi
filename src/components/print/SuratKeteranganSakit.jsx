import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "@nextui-org/react";

export const SuratKeteranganSakit = ({ data, tanggal, onClose }) => {
  const componentRef = useRef();
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const queueNumber = String(data.nomor_antrian).padStart(4, '0');

  const invoiceNo = `${day}${month}${year}${queueNumber}`;

  function formatDate(tanggal) {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    });
  }

  function calculateDays(tanggalMulai, tanggalSelesai) {
    const start = new Date(tanggalMulai);
    const end = new Date(tanggalSelesai);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1;
  }

  function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <Button
            radius="sm"
            className="text-white bg-red-500 disabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80"
            disabled={!tanggal.tanggal_mulai || !tanggal.tanggal_selesai}
          >
            Cetak
          </Button>
        )}
        content={() => componentRef.current}
        documentTitle="Invoice Praktek dr. Estya Dewi W. ,SpOG"
        pageStyle="@page { size: 210mm 297mm; margin: 2.54cm; }"
        onAfterPrint={onClose}
      />
      <div className="overflow-hidden h-0 w-0">
        <div ref={componentRef}>
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-bold">
              Praktek dr. Estya Dewi W., SpOG
            </h1>
            <p className="text-xs">
              Jl. HOS Cokroaminoto No.32, Pakuncen, Wirobrajan, Kota Yogyakarta,
              Daerah Istimewa Yogyakarta 55253
            </p>
            <p className="text-xs">Telp: 0818-0950-7311</p>
          </div>

          <div className="border border-black my-2"></div>

          <div className="flex flex-col justify-center items-center text-md font-semibold underline gap-2">
            <span>SURAT KETERANGAN SAKIT</span>
            <span>No. {invoiceNo}</span>
          </div>

          <div className="mt-5 flex flex-col justify-start items-start">
            <p className="text-sm">Yang bertanda tangan dibawah ini,</p>
            <p className="text-sm">dokter {data.dokter.user.nama}</p>
            <p className="text-sm">menerangkan bahwa:</p>
          </div>

          <div className="mt-5 flex flex-col justify-start items-start">
            <p className="text-sm">
              Nama<span className="ml-10">: {data.pasien.user.nama}</span>
            </p>
            <p className="text-sm">
              Umur
              <span className="ml-11">
                : {calculateAge(data.pasien.tanggal_lahir)} tahun
              </span>
            </p>
            <p className="text-sm">
              Alamat<span className="ml-9">: {data.pasien.alamat}</span>
            </p>
          </div>
          <div className="mt-5 flex justify-start items-start">
            <p className="text-sm break-words text-justify">
              Dikarenakan sakit, perlu istirahat selama {calculateDays(tanggal.tanggal_mulai, tanggal.tanggal_selesai)} hari, terhitung mulai
              tanggal {formatDate(tanggal.tanggal_mulai)} sampai dengan tanggal{" "}
              {formatDate(tanggal.tanggal_selesai)}. Demikian surat keterangan
              ini diberikan dengan sebenarnya, Untuk Diketahui dan diperlukan
              sebagaimana mestinya.
            </p>
          </div>
            <div className="mt-10 flex justify-end items-end">
                <p className="text-sm">Yogyakarta, {formatDate(new Date())}</p>
            </div>
            <div className="mt-20 flex justify-end items-end">
                <p className="text-sm">dr. {data.dokter.user.nama}</p>
            </div>
        </div>
      </div>
    </div>
  );
};
