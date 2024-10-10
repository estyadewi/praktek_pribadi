import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const TambahPerubahanJadwal = dynamic(
  () => import("@/components/user/admin/TambahPerubahanJadwal").then((mod) => mod.TambahPerubahanJadwal),
  { ssr: false, loading: () => <p>Loading...</p> }
);

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TambahPerubahanJadwal />
    </Suspense>
  );
}