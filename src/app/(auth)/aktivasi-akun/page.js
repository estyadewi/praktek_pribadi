import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const AktivasiAkun = dynamic(
  () => import("@/components/auth/aktivasi-akun/AktivasiAkun").then((mod) => mod.AktivasiAkun),
  { ssr: false, loading: () => <p>Loading...</p> }
);

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AktivasiAkun />
    </Suspense>
  );
}