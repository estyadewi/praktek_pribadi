import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function getAllHistoryObat() {
  try {
    const token = Cookies.get("auth-token");
    const response = await fetch(`${API_URL}/obat/history`, {
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

export async function getHistoryObatKeluar() {
  try {
    const token = Cookies.get("auth-token");
    const response = await fetch(`${API_URL}/obat/riwayat-keluar`, {
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

export async function getHistoryObatMasuk() {
  try {
    const token = Cookies.get("auth-token");
    const response = await fetch(`${API_URL}/obat/riwayat-masuk`, {
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
