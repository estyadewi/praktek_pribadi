import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { IoMdPrint } from "react-icons/io";
import { formatDate, formatRupiah } from "@/lib/constants";
import { Tooltip } from "@nextui-org/react";

export const PembayaranInvoice = ({ data }) => {
  const componentRef = useRef();
  const printButtonRef = useRef();
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const queueNumber = String(data.nomor_antrian).padStart(4, "0");

  const invoiceNo = `${day}${month}${year}${queueNumber}`;

  const handlePrint = () => {
    if (printButtonRef.current) {
      printButtonRef.current.click();
    }
  };

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button ref={printButtonRef} style={{ display: 'none' }}>
            Print
          </button>
        )}
        content={() => componentRef.current}
        documentTitle="Invoice Praktek dr. Estya Dewi W. ,SpOG"
        pageStyle="@page { size: 148mm 210mm; margin: 2.54cm; }"
      />
      <Tooltip 
        content="Cetak Invoice" 
        placement="top" 
        showArrow
      >
        <button 
          onClick={handlePrint}
          className="bg-red-500 p-2 rounded hover:bg-red-600 flex items-center"
        >
          <IoMdPrint className="text-white" />
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

          <div className="flex flex-col justify-center items-center">
            <p className="text-md underline font-semibold">BUKTI PEMBAYARAN</p>
            <p className="text-md underline font-semibold">NO:{invoiceNo}</p>
          </div>

          <div className="mt-5 flex flex-col justify-center items-start">
            <div className="flex justify-center items-center">
              <p className="text-sm">Nomor RM</p>
              <p className="text-sm ml-4">: {data.nomor_rm}</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-sm">Nama</p>
              <p className="text-sm ml-12">: {data.pasien.user.nama}</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-sm">Alamat</p>
              <p className="text-sm ml-10"> : {data.pasien.alamat}</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-sm">Tanggal</p>
              <p className="text-sm ml-9">
                : {formatDate(data.tanggal_pemeriksaan)}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <div>
              <p className="text-sm font-bold">Layanan :</p>
              {data.penggunaan_layanan.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm font-medium ml-3">
                    {item.layanan.nama}
                  </p>
                  <p className="text-sm font-medium">
                    {formatRupiah(item.layanan.harga)}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold">Obat :</p>
              {data.penggunaan_obat.length > 0 ? (
                data.penggunaan_obat.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <p className="text-sm font-medium ml-3">
                      {item.obat.nama} x{item.jumlah}
                    </p>
                    <p className="text-sm font-medium">
                      {formatRupiah(item.sub_total)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm font-medium text-[#334155] ml-3">-</p>
              )}
            </div>
            <div className="border border-black"></div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold">Total :</p>
              <p className="text-sm font-bold">
                {formatRupiah(data.total_bayar)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
