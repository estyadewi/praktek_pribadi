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

  if (path.startsWith("/masuk") && !auth_token) {
    return NextResponse.next();
  }

  if (auth_token) {
    const res = await cekToken(auth_token);

    if (!res) {
      if (!path.startsWith("/masuk")) {
        return NextResponse.redirect(new URL("/masuk", request.url));
      }
      return NextResponse.next();
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
      const rolePath = roleRedirects[res.role];
      if (!path.startsWith(rolePath)) {
        return NextResponse.redirect(new URL(rolePath, request.url));
      }
      return NextResponse.next();
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
    if (!path.startsWith("/daftar")) {
      return NextResponse.redirect(new URL("/daftar", request.url));
    }
  }

  if (
    ["/verifikasi-otp", "/ganti-password"].some(p => path.startsWith(p)) && !verify_token
  ) {
    if (!path.startsWith("/lupa-password")) {
      return NextResponse.redirect(new URL("/lupa-password", request.url));
    }
  }

  if (
    ["/dokter", "/admin", "/super-user", "/pasien"].some(p => path.startsWith(p)) &&
    !auth_token
  ) {
    if (!path.startsWith("/masuk")) {
      return NextResponse.redirect(new URL("/masuk", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/super-user/:path*", "/admin/:path*", "/dokter/:path*", "/pasien/:path*"],
};
