"use client";

import React from 'react';
import { useState } from 'react';
import { Card, CardBody, Breadcrumbs, BreadcrumbItem, Input, Button, Checkbox } from '@nextui-org/react';
import { FaHome } from 'react-icons/fa';
import { addJadwalDadakan } from '@/services/jadwal-praktek';
import toast from 'react-hot-toast';
import { useSearchParams, useRouter } from 'next/navigation';

export const TambahPerubahanJadwal = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idDokter = searchParams.get('idDokter');
    const [loading, setLoading] = useState(false);
    const [tanggal, setTanggal] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [sesi, setSesi] = useState([
        {
            waktu_mulai: '',
            waktu_selesai: '',
            kuota: 0
        }
    ]);
    const [tempData, setTempData] = useState([]);

    const handleTanggalChange = (e) => {
        setTanggal(e.target.value);
    }

    const handleSesiChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...sesi];
        list[index][name] = value;
        setSesi(list);
    }

    const handleAddSesi = (e) => {
        e.preventDefault();
        setSesi([...sesi, { waktuMulai: '', waktuSelesai: '', kuota: 0 }]);
    }

    const handleRemoveSesi = (index) => {
        const list = [...sesi];
        list.splice(index, 1);
        setSesi(list);
    }

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setDisabled(checked);
        if (checked) {
            setTempData(sesi);
            setSesi([]);
        } else {
            setSesi(tempData);
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = {
                tanggal: tanggal,
                sesi: sesi,
                dokter_id: idDokter
            };
            await toast.promise(addJadwalDadakan(data).then(
                async (res) => {
                    if (res.status === 'success') {
                        return Promise.resolve(res);
                    } else {
                        return Promise.reject(res);
                    }
                }
            ), {
                loading: 'Menyimpan...',
                success: (res) => {
                    if (res.status === 'success') {
                        router.replace('/admin/jadwal-praktek');
                        return res.message;
                    } 
                },
                error: (err) => err.error,
            });
        } finally {
            setTanggal('');
            setSesi([
                {
                    waktu_mulai: '',
                    waktu_selesai: '',
                    kuota: 0
                }
            ]);
            setDisabled(false);
            setLoading(false);
        }
    }

    return (
        <div className="p-6">
            <Breadcrumbs size="lg" itemClasses={{ item:"text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal", separator:"text-slate-700 text-xl" }}>
                <BreadcrumbItem startContent={<FaHome className="text-2xl"/>} href="/admin/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem href='/admin/jadwal-praktek'>Jadwal Praktek</BreadcrumbItem>
                <BreadcrumbItem className="font-normal">Perubahan Jadwal</BreadcrumbItem>
            </Breadcrumbs>

            <div className='mt-4'>
                <Card radius='sm'>
                    <CardBody>
                        <h1 className="text-xl font-semibold text-slate-700">Form Jadwal Praktek Tanggal Tertentu</h1>
                        <div className='mt-3 grid grid-rows-2 gap-3'>
                            <div className='grid grid-cols-3 items-center gap-4'>
                                <div>
                                    <label htmlFor="tanggal" className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                                        Tanggal <span className="text-red-700">*</span>
                                    </label>
                                    <Input
                                        value={tanggal}
                                        disabled={loading}
                                        type="date"
                                        id='tanggal'
                                        variant="bordered"
                                        name="tanggal"
                                        size="md"
                                        radius="sm"
                                        className="bg-white"
                                        onChange={handleTanggalChange}
                                        min={
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
                                <Checkbox className='mt-2' onChange={handleCheckboxChange} isDisabled={loading}>
                                    <span className='text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap'>Tidak Ada Praktek</span>
                                </Checkbox>
                            </div>
                            <div className='grid grid-cols-3 items-end gap-4'>
                                <div>
                                    <label htmlFor="jumlah_slot" className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                                        Jumlah Slot <span className="text-red-700">*</span>
                                    </label>
                                    <Input
                                        disabled
                                        id='jumlah_slot'
                                        type="number"
                                        value={disabled == true ? 0 : sesi.length}
                                        variant="bordered"
                                        name="jumlah_slot"
                                        size="md"
                                        radius="sm"
                                        className="bg-white"
                                        classNames={{
                                        inputWrapper: "border",
                                        }}
                                    />
                                </div>

                                <div>
                                    <Button className='bg-orange-500 text-white w-full disabled:opacity-80 disabled:cursor-not-allowed' onClick={handleAddSesi} disabled={disabled || loading}>
                                        Tambah Slot
                                    </Button>
                                </div>
                                <div>
                                    <Button color='success' className='text-white w-full' onClick={handleSubmit} isLoading={loading} spinnerPlacement='end'>
                                        Simpan
                                    </Button>
                                </div>
                            </div>

                            {sesi.map((item, index) => (
                                <div key={index} className='grid grid-cols-2 sm:grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor="waktu_mulai" className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                                            Waktu Mulai <span className="text-red-700">*</span>
                                        </label>
                                        <Input
                                            id='waktu_mulai'
                                            type="time"
                                            disabled={loading}
                                            variant="bordered"
                                            name="waktu_mulai"
                                            size="md"
                                            radius="sm"
                                            className="bg-white"
                                            value={item.waktu_mulai}
                                            onChange={(e) => handleSesiChange(e, index)}
                                            classNames={{
                                                inputWrapper: "border",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="waktu_selesai" className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                                            Waktu Selesai <span className="text-red-700">*</span>
                                        </label>
                                        <Input
                                            id='waktu_selesai'
                                            type="time"
                                            disabled={loading}
                                            variant="bordered"
                                            name="waktu_selesai"
                                            size="md"
                                            radius="sm"
                                            className="bg-white"
                                            value={item.waktu_selesai}
                                            onChange={(e) => handleSesiChange(e, index)}
                                            classNames={{
                                                inputWrapper: "border",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="kuota" className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                                            Kuota <span className="text-red-700">*</span>
                                        </label>
                                        <Input
                                            id='kuota'
                                            type="number"
                                            disabled={loading}
                                            variant="bordered"
                                            name="kuota"
                                            size="md"
                                            radius="sm"
                                            className="bg-white"
                                            value={item.kuota}
                                            onChange={(e) => handleSesiChange(e, index)}
                                            classNames={{
                                                inputWrapper: "border",
                                            }}
                                        />
                                    </div>
                                    <div className='grid grid-cols-3 mt-6 sm:mt-7'>
                                        <Button className='text-white bg-[#EF4444] w-full disabled:opacity-80 disabled:cursor-not-allowed' onClick={() => handleRemoveSesi(index)} disabled={sesi.length == 1 || loading}>
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}