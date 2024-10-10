import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function berikanAntrian(idPemeriksaan){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/nomor-antrian/${idPemeriksaan}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function pindahAntrian(idPemeriksaan){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/pindah/${idPemeriksaan}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function getPasienReadyToDokter(idDokter){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/admin/pemeriksaan-awal/${idDokter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export async function panggilKeRuanganDokter(idPemeriksaan){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/panggilan-dokter/${idPemeriksaan}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}