import { DiagnosaPasienPage } from "@/components/user/dokter/Diagnosa";

export default function Page({params}) {
    return <DiagnosaPasienPage noRM={params.noRM}/>;
}