import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function getAllLayanan() {
  try {
    const token = Cookies.get("auth-token");
    const response = await fetch(`${API_URL}/layanan`, {
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

export async function addLayanan(data) {
  try {
    const token = Cookies.get("auth-token");
    const response = await fetch(`${API_URL}/layanan`, {
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

export async function deleteLayanan(id) {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/layanan/${id}`, {
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

export async function updateLayanan(data, id) {
    try{
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/layanan/${id}`, {
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

export async function getLayananById(id) {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/layanan/${id}`, {
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

export async function getLayananByDokter() {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/dokter/layanan`, {
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