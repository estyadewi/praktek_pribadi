import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function getAllArtikel() {
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

export async function getArtikelById(id) {
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

export async function getArtikelBySlug(slug) {
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

export async function insertArtikel(formData) {
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

export async function updateArtikel(id, formData) {
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

export async function deleteArtikel(id) {
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
