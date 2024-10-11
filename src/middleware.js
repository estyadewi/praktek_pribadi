import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cekToken } from "./services/auth";

export async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.startsWith("/_next") || path.startsWith("/static")) {
    return NextResponse.next();
  }

  const auth_token = cookies().get("auth-token")?.value;
  const verify_token = cookies().get("verify-token")?.value;
  const activation_token = cookies().get("activation-token")?.value;

  if (path.startsWith("/masuk")) {
    return NextResponse.next();
  }

  if (auth_token) {
    const res = await cekToken(auth_token);

    if (!res) {
      return NextResponse.redirect(new URL("/masuk", request.url));
    }

    const roleRedirects = {
      Pasien: "/pasien/dashboard",
      Admin: "/admin/dashboard",
      Dokter: "/dokter/dashboard",
      "Super User": "/super-user/dashboard",
    };

    if (
      ["/masuk", "/daftar", "/lupa-password", "/ganti-password", "/aktivasi-akun", "/verifikasi-otp"].some(p => path.startsWith(p))
    ) {
      return NextResponse.redirect(new URL(roleRedirects[res.role], request.url));
    }

    const roleAccess = {
      "/dokter": "Dokter",
      "/admin": "Admin",
      "/super-user": "Super User",
      "/pasien": "Pasien",
    };

    for (const [route, role] of Object.entries(roleAccess)) {
      if (path.startsWith(route)) {
        if (res.role !== role) {
          return NextResponse.redirect(new URL(roleRedirects[res.role], request.url));
        }
        return NextResponse.next();
      }
    }
  }

  if (path.startsWith("/aktivasi-akun") && !activation_token) {
    return NextResponse.redirect(new URL("/daftar", request.url));
  }

  if (
    ["/verifikasi-otp", "/ganti-password"].some(p => path.startsWith(p)) && !verify_token
  ) {
    return NextResponse.redirect(new URL("/lupa-password", request.url));
  }

  if (
    ["/dokter", "/admin", "/super-user", "/pasien"].some(p => path.startsWith(p)) &&
    !auth_token
  ) {
    return NextResponse.redirect(new URL("/masuk", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/super-user/:path*", "/admin/:path*", "/dokter/:path*", "/pasien/:path*"],
};

