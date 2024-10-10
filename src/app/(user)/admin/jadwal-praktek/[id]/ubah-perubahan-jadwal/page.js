import React from 'react'
import { UbahSesiJadwalDadakan } from "@/components/user/admin/UbahPerubahanJadwal"

export default function Page({params}) {
    return (
        <UbahSesiJadwalDadakan tanggal={params.id} />
    )
}