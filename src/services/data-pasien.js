import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function getDataPasien() {
    try{
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pasien`, {
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
        return error
    }
}

export async function addDataPasien(data) {
    try{
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pasien`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error){
        return error;
    }
}

export async function updateDataPasien(data, noRM){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pasien/${noRM}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function getPasienByNoRM(noRM){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pasien/${noRM}`, {
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
        
    }
}

export async function getHistoryPasien(idPasien){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pemeriksaan/histori/${idPasien}`, {
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

export async function getProfilePasien(){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pasien/profile`, {
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

export async function changeNomorOTP(nomor){
    try {
        nomor = nomor.padStart(3, "62");
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/auth/ubah-nomor-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nomor }),
        });
    
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function verifyOTPChangeNomor(data){
    try {
        const token = Cookies.get("verify-token");
        const response = await fetch(`${API_URL}/auth/verify-otp-nomor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function updateProfilPasien(data){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/pasien/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function insertBookingDadakanPasien(data){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/admin/pemeriksaan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}