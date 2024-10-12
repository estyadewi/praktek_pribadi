"use server";

import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function addJadwalDadakan(data) {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/jadwal/dadakan`,{
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

export async function getJadwalHarianByDokter(idDokter) {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/jadwal/harian/${idDokter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

export async function getJadwalDadakanByDokter(idDokter) {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/jadwal/dadakan/${idDokter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

export async function updateSesiHarian(data, id){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/jadwal/harian/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({sesi: data})
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function getJadwalByHari(idDokter, hari){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/jadwal/harian/${idDokter}/${hari}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

export async function getJadwalByTanggal(idDokter, tanggal){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/jadwal/${idDokter}/${tanggal}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

export async function getDokterTersedia(){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/dokter`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

export async function updateJadwalDadakan(data, id){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/jadwal/dadakan/${id}`,{
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

export async function deleteJadwalDadakan(id){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/jadwal/dadakan/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
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