import { FaHome, FaClipboardList, FaUserMd, FaUserTie, FaBriefcaseMedical, FaPills, FaCashRegister, FaBusinessTime, FaUserInjured, FaNotesMedical, FaCalendarAlt, FaBookMedical, FaHistory, FaUserAlt } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";

export const sidebarItems = {
    Super_User: [
        {
            label: "Dashboard",
            href: "/super-user/dashboard",
            icon: FaHome,
        },
        {
            label: "Dokter",
            href: "/super-user/dokter",
            icon: FaUserMd,
        },
        {
            label: "Admin",
            href: "/super-user/admin",
            icon: FaUserTie,
        },
    ],

    Dokter: [
        {
            label: "Dashboard",
            href: "/dokter/dashboard",
            icon: FaHome,
        },
        {
            label: "Pemeriksaan",
            href: "/dokter/pemeriksaan",
            icon: FaClipboardList,
        },
        {
            label: "Layanan",
            href: "/dokter/layanan",
            icon: FaBriefcaseMedical,
        },
        {
            label: "Obat",
            href: "/dokter/obat",
            icon: FaPills,
        },
        {
            label: "Artikel",
            href: "/dokter/artikel",
            icon: GrArticle,
        },

    ],

    Admin: [
        {
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: FaHome,
        },
        {
            label: "Pemeriksaan Awal",
            href: "/admin/pemeriksaan",
            icon: FaClipboardList,
        },
        {
            label: "Antrian Pemeriksaan Dokter",
            href: "/admin/antrian-dokter",
            icon: FaUserMd,
        },
        {
            label: "Pembayaran",
            href: "/admin/pembayaran",
            icon: FaCashRegister,
        },
        {
            label: "Jadwal Praktek",
            href: "/admin/jadwal-praktek",
            icon: FaBusinessTime,
        },
        {
            label: "Data Pasien",
            href: "/admin/data-pasien",
            icon: FaUserInjured,
        },
        {
            label: "Obat",
            href: "/admin/obat",
            icon: FaPills,
        },
        {
            label: "Riwayat Obat",
            href: "/admin/riwayat-obat",
            icon: FaNotesMedical,
        },
        {
            label: "Artikel",
            href: "/admin/artikel",
            icon: GrArticle,
        },
    ],

    Pasien: [
        {
            label: "Dashboard",
            href: "/pasien/dashboard",
            icon: FaHome,
        },
        {
            label: "Jadwal Praktek",
            href: "/pasien/jadwal-praktek",
            icon: FaCalendarAlt,
        },
        {
            label: "Jadwal Saya",
            href: "/pasien/jadwal-saya",
            icon: FaBookMedical,
        },
        {
            label: "Riwayat Periksa",
            href: "/pasien/riwayat-periksa",
            icon: FaHistory,
        },
        {
            label: "Profil",
            href: "/pasien/profil",
            icon: FaUserAlt,
        },
    ],
}