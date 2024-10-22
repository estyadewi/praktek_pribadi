import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";

const pjs = Plus_Jakarta_Sans({
  weights: [200, 300, 400, 500, 600, 700, 800],
  subsets: ["vietnamese"],
  style: "normal",
});

export const metadata = {
  title: "Klinik dr. Estya Dewi Widyasari, Sp.OG",
  description: "Klinik dr. Estya Dewi Widyasari, Sp.OG adalah klinik kandungan dan klinik obgyn di Yogyakarta, Indonesia.",
  keywords: [
    "klinik",
    "dokter",
    "spesialis",
    "kandungan",
    "obgyn",
    "jogja",
    "yogyakarta",
    "indonesia",
    "klinik dr. estya",
    "dr. estya",
    "dr. estya dewi",
    "dr. estya dewi widyasari",
    "dr. estya dewi widyasari, sp.og",
    "dr. estya dewi widyasari, spog",
    "dokter estya",
    "dokter estya dewi",
    "dokter estya dewi widyasari",
    "dokter estya dewi widyasari, sp.og",
    "dokter estya dewi widyasari, spog",
    "dokter kandungan",
    "dokter obgyn",
    "dokter spesialis kandungan",
    "dokter spesialis obgyn",
    "klinik kandungan",
    "klinik obgyn",
    "klinik spesialis kandungan",
    "klinik spesialis obgyn",
    "klinik dr. estya dewi",
    "klinik dr. estya dewi widyasari",
    "klinik dr. estya dewi widyasari, sp.og",
    "klinik dr. estya dewi widyasari, spog",
    "klinik dokter estya",
    "klinik dokter estya dewi",
    "klinik dokter estya dewi widyasari",
    "klinik dokter estya dewi widyasari, sp.og",
    "klinik dokter estya dewi widyasari, spog",
    "klinik dokter kandungan",
    "klinik dokter obgyn",
    "klinik dokter spesialis kandungan",
    "klinik dokter spesialis obgyn",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pjs.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
