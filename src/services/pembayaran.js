import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function getPembayaranPasien () {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/admin/pembayaran`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export async function konfirmasiPembayaran(idPemeriksaan){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/bayar/${idPemeriksaan}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}