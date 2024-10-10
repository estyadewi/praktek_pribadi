import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function AddKaryawan(data){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/super-user/register-karyawan`, {
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
        return error
    }
}

export async function GetKaryawan(role){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/super-user/karyawan/${role}`, {
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

export async function DeleteKaryawan(id){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/super-user/delete-karyawan/${id}`, {
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
        return error
    }
}

export async function UpdateKaryawan(data, id){
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/super-user/update-karyawan/${id}`, {
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
        return error
    }
}