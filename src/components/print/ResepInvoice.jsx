import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { IoReceipt } from "react-icons/io5";
import { Tooltip } from "@nextui-org/react";

export const ResepInvoice = ({ data }) => {
  const componentRef = useRef();
  const printButtonRef = useRef();
  const today = new Date();

  const formatDate = today.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

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

  const handlePrint = () => {
    if (printButtonRef.current) {
      printButtonRef.current.click();
    }
  };

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button ref={printButtonRef} style={{ display: "none" }}>
            Print
          </button>
        )}
        content={() => componentRef.current}
        documentTitle="Invoice Praktek dr. Estya Dewi W. ,SpOG"
        pageStyle="@page { size: 148mm 210mm; margin: 2.54cm; }"
      />
      <Tooltip placement="top" showArrow content={"Cetak Resep"}>
        <button
          onClick={handlePrint}
          className="bg-orange-500 p-2 rounded hover:opacity-80 flex items-center"
        >
          <IoReceipt className="text-white" />
        </button>
      </Tooltip>
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

          <div className="flex justify-end items-center mt-2">
            <p className="text-sm font-normal">Yogyakarta, {formatDate}</p>
          </div>

          <div className="mt-4 flex flex-col justify-center items-start">
            <div className="flex justify-center items-center">
              <p className="text-sm">Nama</p>
              <p className="text-sm ml-4">: {data.pasien.user.nama}</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-sm">Umur</p>
              <p className="text-sm ml-5">
                : {calculateAge(data.pasien.tanggal_lahir)} tahun
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-sm">Alamat</p>
              <p className="text-sm ml-3">: {data.pasien.alamat}</p>
            </div>
          </div>

          <div className="mt-3 flex justify-center items-center">
            <p className="text-md font-semibold underline">Resep Obat</p>
          </div>

          <div className="mt-2 flex justify-start items-center">
            <pre className="text-sm font-normal whitespace-pre-wrap">
              {data.resep}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
