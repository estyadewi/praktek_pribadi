"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { getArtikelBySlug } from "@/services/artikel";
import { API_IMG } from "@/lib/constants";
import DOMPurify from "dompurify";

export const DetailArtikelPage = ({ slug }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtikel = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getArtikelBySlug(slug);
      setData(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  }, [slug]);

  useEffect(() => {
    fetchArtikel();
  }, [fetchArtikel]);

  const SkeletonLoader = () => (
    <div className="flex flex-col space-y-4 animate-pulse w-full">
      <div className="w-full h-8 bg-gray-300 rounded"></div>
      <div className="w-full h-56 bg-gray-300 rounded-md"></div>
      <div className="w-full h-40 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-7xl mx-auto px-7 lg:px-6 w-full">
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
            <BreadcrumbItem href="/artikel">Artikel</BreadcrumbItem>
            <BreadcrumbItem className="font-normal">
              Detail Artikel
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <div className="mt-5 flex flex-col justify-center items-center space-y-4">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <h1 className="text-slate-700 font-semibold text-2xl sm:text-3xl">
                {data.judul}
              </h1>
              <div className="overflow-hidden w-full flex justify-center">
                <img
                  src={API_IMG + data.image_url}
                  alt="Foto Artikel"
                  className="sm:h-full rounded-md w-full lg:w-3/4 aspect-video sm:aspect-[16/6] object-cover transition-transform"
                />
              </div>
              <div className="flex justify-center items-center">
                <p
                  className="text-slate-700 text-medium text-justify lg:w-3/4 w-full"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data.konten),
                  }}
                ></p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
