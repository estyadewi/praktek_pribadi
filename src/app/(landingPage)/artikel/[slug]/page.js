import { DetailArtikelPage } from "@/components/user/artikel/DetailArtikel";

export default function Page({params}) {
    const { slug } = params;
    return <DetailArtikelPage slug={slug}/>
}