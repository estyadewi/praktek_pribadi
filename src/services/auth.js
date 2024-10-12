import { API_URL } from "@/lib/constants";
import Cookies from "js-cookie";

export async function login(nomor, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ nomor, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function register(data, sendBy) {
  try {
    if (data.nomor != undefined) data.nomor = data.nomor.padStart(3, "62");
    const response = await fetch(`${API_URL}/auth/register?otp=${sendBy}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}

export async function aktivasiAkun(otp) {
  const token = Cookies.get("activation-token");
  try {
    const response = await fetch(`${API_URL}/auth/activate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ otp }),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}

export async function regenerateOTP(sendBy) {
  const activationToken = Cookies.get("activation-token");
  const verifyToken = Cookies.get("verify-token");
  const token = activationToken || verifyToken;
  try {
    const response = await fetch(`${API_URL}/auth/regenerate-otp?otp=${sendBy}`, {
      method: "GET",
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

export async function requestOTP(nomor) {
  try {
    nomor = nomor.padStart(3, "62");
    const response = await fetch(`${API_URL}/auth/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ nomor }),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}

export async function verifyOTP(otp) {
  const token = Cookies.get("verify-token");
  try {
    const response = await fetch(`${API_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ otp }),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}

export async function changePassword(data) {
  const verifyToken = Cookies.get("verify-token");
  const authToken = Cookies.get("auth-token");
  const token = verifyToken || authToken;
  try {
    const response = await fetch(`${API_URL}/auth/change-password`, {
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

export async function cekToken(token){
  try {
    const response = await fetch(`${API_URL}/auth/check-token`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const res = await response.json();
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function logout(token) {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}

export async function validateRegister(data){
  try {
    const response = await fetch(`${API_URL}/auth/validasi-register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}