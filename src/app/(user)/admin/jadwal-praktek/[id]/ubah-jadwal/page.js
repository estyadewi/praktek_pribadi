import React from 'react';
import { UbahSesiJadwalHarian } from '@/components/user/admin/UbahJadwalHarian';

export default function Page({params}) {
    return (
        <UbahSesiJadwalHarian hari={params.id}/>
    );
}