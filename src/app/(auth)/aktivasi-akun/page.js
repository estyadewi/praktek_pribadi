import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/react"; // Import Spinner dari NextUI

const AktivasiAkun = dynamic(
  () =>
    import("@/components/auth/aktivasi-akun/AktivasiAkun").then(
      (mod) => mod.AktivasiAkun
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    ),
  }
);

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="lg" color="primary" />
        </div>
      }
    >
      <AktivasiAkun />
    </Suspense>
  );
}
