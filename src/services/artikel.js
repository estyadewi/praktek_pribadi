"use server";

import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export const getAllArtikel = async () => {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/artikel`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export const getArtikelById = async (id) => {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/artikel/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export const getArtikelBySlug = async (slug) => {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/artikel/read/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}

export const insertArtikel = async (formData) => {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/artikel`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export const updateArtikel = async (id, formData) => {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/artikel/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}

export const deleteArtikel = async (id) => {
    try {
        const token = Cookies.get("auth-token");
        const response = await fetch(`${API_URL}/artikel/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}