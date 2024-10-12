import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function getAllObat() {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/obat`, {
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

export async function addObat(data) {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/obat`, {
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

export async function addStokObat(stok, id) {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/obat/stok/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(stok),
        });
    
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export async function deleteObat(id) {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/obat/${id}`, {
        method: "DELETE",
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

export async function updateObat(data, id) {
    try{
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/obat/${id}`, {
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

export async function getObatById(id) {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/obat/${id}`, {
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