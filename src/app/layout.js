import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";

const pjs = Plus_Jakarta_Sans({
  weights: [200, 300, 400, 500, 600, 700, 800],
  subsets: ["vietnamese"],
  style: "normal",
});

export const metadata = {
  title: "Praktek Pribadi Dr.",
  description: "",
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
