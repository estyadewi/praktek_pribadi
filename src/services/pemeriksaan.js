"use server";

import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function bookJadwal(data){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}


export async function rescheduleBookJadwal(data){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/reschedule`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function getJadwalBookingPasien(){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pasien/booking`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export async function getJadwalTemuDokter(idDokter){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/jadwal-temu/${idDokter}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export async function getPasienHaveNoAntrian(idDokter){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/admin/antrian/${idDokter}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export async function pemeriksaanSubjektif(data, idPemeriksaan){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/awal/${idPemeriksaan}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function getPasienDashboardDokter(){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/dokter/dashboard`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function getDashboardAdmin(idDokter){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/admin/dashboard/${idDokter}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function getPasienPemeriksaanDokter(){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/dokter/pemeriksaan`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export async function getPemeriksaanByIdPemeriksaan(idPemeriksaan){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/${idPemeriksaan}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export async function insertPemeriksaanDokter(data, idPemeriksaan){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/dokter/${idPemeriksaan}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function getJadwalByDokterByToken(tanggal){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/dokter/jadwal/${tanggal}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export async function batalkanJanjiPasien(){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pasien/batal`, {
            method: "PUT",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function adminBatalkanJanjiPasien(idPemeriksaan){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/admin/cancel-booking/${idPemeriksaan}`, {
            method: "PUT",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}