"use client";

import { Breadcrumbs, BreadcrumbItem, Input } from "@nextui-org/react";
import { FaHome, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllArtikel } from "@/services/artikel";
import { API_IMG } from "@/lib/constants";
import DOMPurify from "dompurify";
import { SkeletonArtikel } from "@/components/Card/SkeletonArtikel";

export const ArtikelLandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchArtikel = async () => {
    try {
      setIsLoading(true);
      const res = await getAllArtikel();
      setData(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-7xl mt-5 mx-auto px-7 lg:px-6 w-full">
        <div className="w-full border border-indigo-500 px-5 py-3 rounded-md bg-[#E1EEFF]">
          <Breadcrumbs
            size="md"
            itemClasses={{
              item: "text-indigo-500 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal",
              separator: "text-indigo-500 text-xl",
            }}
          >
            <BreadcrumbItem
              startContent={<FaHome className="text-xl" />}
              href="/"
            >
              Home
            </BreadcrumbItem>
            <BreadcrumbItem className="font-normal">Artikel</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <div className="border-b border-b-indigo-700 mb-6 w-full mt-5">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Artikel</h1>
            <div className="w-1/2 md:w-1/4">
              <Input
                type="text"
                startContent={<FaSearch className="text-slate-500" />}
                radius="sm"
                placeholder="Cari artikel...."
                className="bg-white hover:bg-white focus:bg-white"
                classNames={{
                  input: "text-slate-700",
                  inputWrapper: "border border-indigo-500 rounded-md bg-white",
                }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="bg-indigo-500 h-1 w-32"></div>
        </div>

        <div className="flex-grow flex flex-col">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 rounded-lg my-6">
              <SkeletonArtikel />
              <SkeletonArtikel />
              <SkeletonArtikel />
            </div>
          ) : filteredData.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 rounded-lg my-6">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="w-full rounded-lg hover:shadow-2xl sm:hover:shadow-lg group transition-all flex flex-col justify-between sm:h-52"
                >
                  <div className="sm:flex sm:h-full">
                    <div className="overflow-hidden sm:w-36">
                      <img
                        src={API_IMG + item.image_url}
                        className="sm:h-full rounded-l-md w-full aspect-[12/4] object-cover group-hover:scale-110 group-hover:rotate-2 sm:group-hover:rotate-0 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col sm:w-full">
                      <div className="px-2 py-4 sm:h-full sm:p-6">
                        <Link href={`/artikel/${item.slug}`}>
                          <p className="text-lg font-semibold text-slate-700 uppercase">
                            {item.judul}
                          </p>
                        </Link>
                        <p
                          className="text-md text-gray-700 mt-1 line-clamp-2 font-normal"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.konten),
                          }}
                        ></p>
                      </div>
                      <div className="w-full flex justify-end">
                        <Link
                          href={`/artikel/${item.slug}`}
                          className="p-2 w-full sm:w-44 text-sm bg-indigo-500 hover:bg-indigo-700 rounded-b-lg sm:rounded-b-none sm:rounded-ee-large text-white flex items-center justify-center"
                        >
                          Baca Selengkapnya
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center text-gray-500 font-semibold">
                Artikel tidak ditemukan
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
