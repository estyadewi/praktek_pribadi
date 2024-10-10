import React from "react";
import { UbahArtikel } from "@/components/user/artikel/UbahArtikel";

export default function Page({params}) {
    return <UbahArtikel id={params.id}/>;
}