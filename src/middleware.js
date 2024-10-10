import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { cekToken } from "./services/auth";

export async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const auth_token = cookies().get("auth-token")?.value;
  const verify_token = cookies().get("verify-token")?.value;
  const activation_token = cookies().get("activation-token")?.value;

  if (
    (path.startsWith("/masuk") ||
      path.startsWith("/daftar") ||
      path.startsWith("/lupa-password") ||
      path.startsWith("/ganti-password") ||
      path.startsWith("/aktivasi-akun") ||
      path.startsWith("/verifikasi-otp")) &&
    auth_token
  ) {
    const res = await cekToken(auth_token);
    if (res.role === "Pasien") {
      return NextResponse.redirect(new URL("/pasien/dashboard", request.url));
    } else if (res.role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (res.role === "Dokter") {
      return NextResponse.redirect(new URL("/dokter/dashboard", request.url));
    } else if (res.role === "Super User") {
      return NextResponse.redirect(new URL("/super-user/dashboard", request.url));
    }
  }

  if(path.startsWith("/dokter") && auth_token){
    const res = await cekToken(auth_token);
    if(res.role === "Pasien"){
      return NextResponse.redirect(new URL("/pasien/dashboard", request.url));
    } else if (res.role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (res.role === "Super User") {
      return NextResponse.redirect(new URL("/super-user/dashboard", request.url));
    } else if (res.role === "Dokter") {
      return NextResponse.next();
    }
  }

  if(path.startsWith("/admin") && auth_token){
    const res = await cekToken(auth_token);
    if(res.role === "Pasien"){
      return NextResponse.redirect(new URL("/pasien/dashboard", request.url));
    } else if (res.role === "Dokter") {
      return NextResponse.redirect(new URL("/dokter/dashboard", request.url));
    } else if (res.role === "Super User") {
      return NextResponse.redirect(new URL("/super-user/dashboard", request.url));
    } else if (res.role === "Admin") {
      return NextResponse.next();
    }
  }

  if(path.startsWith("/super-user") && auth_token){
    const res = await cekToken(auth_token);
    if(res.role === "Pasien"){
      return NextResponse.redirect(new URL("/pasien/dashboard", request.url));
    } else if (res.role === "Dokter") {
      return NextResponse.redirect(new URL("/dokter/dashboard", request.url));
    } else if (res.role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (res.role === "Super User") {
      return NextResponse.next();
    }
  }

  if(path.startsWith("/pasien") && auth_token){
    const res = await cekToken(auth_token);
    if(res.role === "Dokter"){
      return NextResponse.redirect(new URL("/dokter/dashboard", request.url));
    } else if (res.role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (res.role === "Super User") {
      return NextResponse.redirect(new URL("/super-user/dashboard", request.url));
    } else if (res.role === "Pasien") {
      return NextResponse.next();
    }
  }

  if(path.startsWith("/dokter") ||
    path.startsWith("/admin") ||
    path.startsWith("/super-user") ||
    path.startsWith("/pasien") && !auth_token){
    return NextResponse.redirect(new URL("/masuk", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/aktivasi-akun")) {
    if (!activation_token) {
      return NextResponse.redirect(new URL("/daftar", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/verifikasi-otp") ||
    request.nextUrl.pathname.startsWith("/ganti-password")
  ) {
    if (!verify_token) {
      return NextResponse.redirect(new URL("/lupa-password", request.url));
    }
  }
}

export const config = {
  matcher: ["/:path*", "/super-user/:path*", "/admin/:path*", "/dokter/:path*", "/pasien/:path*"],
};
