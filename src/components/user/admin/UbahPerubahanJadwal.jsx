"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardBody, Breadcrumbs, BreadcrumbItem, Input, Button, Checkbox, Spinner } from '@nextui-org/react';
import { FaHome } from 'react-icons/fa';
import { updateJadwalDadakan, getJadwalByTanggal } from '@/services/jadwal-praktek';
import toast from 'react-hot-toast';
import { useSearchParams, useRouter } from 'next/navigation';

export const UbahSesiJadwalDadakan = ({tanggal}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [tanggalData, setTanggalData] = useState(tanggal);
    const dokterId = searchParams.get('idDokter');
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [id, setId] = useState(null);
    const [sesi, setSesi] = useState([
        {
            waktu_mulai: '',
            waktu_selesai: '',
            kuota: 0
        }
    ]);
    const [originalSesi, setOriginalSesi] = useState([]);

    const handleSesiChange = useCallback((e, index) => {
        const { name, value } = e.target;
        setSesi(prevSesi => {
            const newSesi = [...prevSesi];
            newSesi[index] = { ...newSesi[index], [name]: value };
            return newSesi;
        });
    }, []);

    const handleAddSesi = useCallback(() => {
        setSesi(prevSesi => [...prevSesi, { waktu_mulai: '', waktu_selesai: '', kuota: 0 }]);
    }, []);

    const handleRemoveSesi = useCallback((index) => {
        setSesi(prevSesi => prevSesi.filter((_, i) => i !== index));
    }, []);

    const handleCheckboxChange = useCallback((e) => {
        const checked = e.target.checked;
        setIsDisabled(checked);
        if (checked) {
            setOriginalSesi(prevOriginalSesi => sesi);
            setSesi([]);
        } else {
            setSesi(prevSesi => originalSesi);
        }
    }, [sesi, originalSesi]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const updatedSesi = sesi.map(item => ({
                ...item,
                waktu_mulai: item.waktu_mulai.slice(0, 5),
                waktu_selesai: item.waktu_selesai.slice(0, 5),
            }));
            const data = { tanggal: tanggalData, sesi: updatedSesi };
            await toast.promise(updateJadwalDadakan(data, id).then(
                async (res) => {
                    if (res.status === 'success') {
                        return Promise.resolve(res);
                    } else {
                        return Promise.reject(res.error);
                    }
                }
            ),{
                loading: 'Menyimpan...',
                success: async (res) => {
                    if (res.status === 'success') {
                        toast.success(res.message);
                        router.replace('/admin/jadwal-praktek');
                    } 
                },
                error: (err) => err.error,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchJadwal = useCallback(async () => {
        setLoadingPage(true);
        try {
            const res = await getJadwalByTanggal(dokterId, tanggal);
            if (res.sesi.length === 0) {
                setId(res.id);
                setIsDisabled(true);
                handleCheckboxChange({ target: { checked: true } });
            } else {
                setId(res.id);
                setSesi(res.sesi);
                setOriginalSesi(res.sesi);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingPage(false);
        }
    }, [dokterId, tanggal]);

    useEffect(() => {
        fetchJadwal();
    }, [fetchJadwal]);

    const handleTanggalChange = useCallback((e) => {
        setTanggalData(e.target.value);
    }, []);

    return (
        <div className="p-6">
            <Breadcrumbs size="lg" itemClasses={{ item:"text-slate-700 font-semibold data-[current=true]:text-slate-400 data-[current=true]:font-normal", separator:"text-slate-700 text-xl" }}>
                <BreadcrumbItem startContent={<FaHome className="text-2xl"/>} href="/admin/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem href='/admin/jadwal-praktek'>Jadwal Praktek</BreadcrumbItem>
                <BreadcrumbItem className="font-normal">Ubah Jadwal</BreadcrumbItem>
            </Breadcrumbs>

            <Card radius='sm' className='mt-4'>
                <CardBody>
                    <h1 className="text-xl font-semibold text-slate-700">Form Ubah Jadwal Praktek</h1>
                    {loadingPage ? (
                        <div className='flex justify-center items-center h-40'>
                            <Spinner color='primary'/>
                        </div>
                    ) : (
                        <div className='mt-3 grid grid-rows-2 gap-3'>
                            <div className='grid grid-cols-2 lg:grid-cols-3 items-center gap-4'>
                                <div>
                                    <label htmlFor="tanggal" className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                                        Tanggal <span className="text-red-700">*</span>
                                    </label>
                                    <Input
                                        value={tanggalData}
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
                                <Checkbox className='mt-2' onChange={handleCheckboxChange} isSelected={isDisabled} isDisabled={loading}>
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
                                        value={isDisabled ? 0 : sesi.length}
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
                                    <Button className='bg-orange-500 text-white w-full disabled:opacity-80 disabled:cursor-not-allowed' onClick={handleAddSesi} disabled={isDisabled || loading}>
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
                                        <label htmlFor={`waktu_mulai_${index}`} className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                                            Waktu Mulai <span className="text-red-700">*</span>
                                        </label>
                                        <Input
                                            id={`waktu_mulai_${index}`}
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
                                        <label htmlFor={`waktu_selesai_${index}`} className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                                            Waktu Selesai <span className="text-red-700">*</span>
                                        </label>
                                        <Input
                                            id={`waktu_selesai_${index}`}
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
                                        <label htmlFor={`kuota_${index}`} className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                                            Kuota <span className="text-red-700">*</span>
                                        </label>
                                        <Input
                                            id={`kuota_${index}`}
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
                                        <Button className='text-white bg-[#EF4444] w-full disabled:opacity-80 disabled:cursor-not-allowed' onClick={() => handleRemoveSesi(index)} disabled={sesi.length === 1 || loading}>
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}