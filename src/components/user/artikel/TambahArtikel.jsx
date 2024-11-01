"use client";

import React, { useState } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  Input,
  Image,
  Button,
} from "@nextui-org/react";
import { FaHome, FaImage } from "react-icons/fa";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { insertArtikel } from "@/services/artikel";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const TambahArtikel = () => {
  const path = usePathname();
  const router = useRouter();
  const formData = new FormData();
  const [data, setData] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const modules =  {
    toolbar: [
        [{font:[]}],
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{align:[]}],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        ['link'],
    ]
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setData({
        ...data,
        image_url: file,
      });  
    }
  };

  const handleInsertArtikel = async () => {
    setLoading(true);
    try {
      for(let key in data){
        formData.append(key, data[key]);
      }
      const res = await insertArtikel(formData);
      if(res.status === "success"){
        toast.success(res.message);
        router.replace(path.startsWith("/dokter") ? "/dokter/artikel" : "/admin/artikel");
      } else {
        if(res.error instanceof Object){
          for(const key in res.error){
            toast.error(res.error[key]);
          }
        } else throw new Error(res.error);
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <Breadcrumbs
        size="lg"
        itemClasses={{
          item: "text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal",
          separator: "text-slate-700 text-xl",
        }}
      >
        <BreadcrumbItem
          startContent={<FaHome className="text-2xl" />}
          href={path.startsWith("/dokter") ? "/dokter/dashboard" : "/admin/dashboard"}
        >
          Dashboard
        </BreadcrumbItem>
        <BreadcrumbItem href={path.startsWith("/dokter") ? "/dokter/artikel" : "/admin/artikel"}>Artikel</BreadcrumbItem>
        <BreadcrumbItem className="font-normal">Tambah Artikel</BreadcrumbItem>
      </Breadcrumbs>

      <div>
        <Card className="w-full mt-8 overflow-hidden" radius="sm" shadow="sm">
          <CardBody>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="judul"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Judul <span className="text-red-700">*</span>
                </label>
                <Input
                  type="text"
                  variant="bordered"
                  name="judul"
                  id="judul"
                  size="md"
                  radius="sm"
                  className="bg-white"
                  onChange={handleChange}
                  classNames={{
                    inputWrapper: "border",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="gambar"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Gambar <span className="text-red-700">*</span>
                </label>

                <label className="border-[2px] border-dashed flex justify-center items-center w-full h-40 rounded-2xl max-w-full">
                  <input
                    className="sr-only"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {preview ? (
                    <Image
                      isZoomed
                      src={preview}
                      alt="preview"
                      className="object-cover max-h-40 w-full max-w-full rounded-lg"
                    />
                  ) : (
                    <>
                      <div className="flex flex-col justify-center items-center">
                        <FaImage size={32} className="text-gray-400" />
                        <p className="text-[14px] text-gray-400">
                          Unggah Thumbnail (Maksimal 2MB, Format: JPG, JPEG, PNG. Minimal Ukuran: 1280 x 720 piksel)
                        </p>
                      </div>
                    </>
                  )}
                </label>
              </div>
              <div className="h-64">
                <label
                  htmlFor="isi"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Konten <span className="text-red-700">*</span>
                </label>
                <ReactQuill
                  theme="snow"
                  name="konten"
                  onChange={(value) => setData({ ...data, konten: value })}
                  key={"konten"}
                  modules={modules}
                  className="lg:h-[70%] sm:h-[70%] h-[50%]"
                />
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="mt-4 flex justify-center items-center">
          <Button radius="sm" color="success" className="w-full text-white" isLoading={loading} spinnerPlacement="end" onClick={handleInsertArtikel}>
            Tambah Artikel
          </Button>
        </div>
      </div>
    </div>
  );
};
