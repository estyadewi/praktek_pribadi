import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/react"; 

const TambahPerubahanJadwal = dynamic(
  () =>
    import("@/components/user/admin/TambahPerubahanJadwal").then(
      (mod) => mod.TambahPerubahanJadwal
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    ),
  }
);

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="lg" />
        </div>
      }
    >
      <TambahPerubahanJadwal />
    </Suspense>
  );
}
