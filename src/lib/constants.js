export const API_URL = "https://api.klinik-drestya.com/api";
export const API_IMG = "https://api.klinik-drestya.com/storage/";

export const createSlug = (str) => {
  return str.toLowerCase().trim().replace(/[\s_-]+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
};

export const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export const formatDateWithDayName = (tanggal) => {
  const date = new Date(tanggal);
  const hari = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
  const tanggalLengkap = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta'
  }).format(date);

  return `${hari}, ${tanggalLengkap}`;
};

export const calculateTotalKuota = (item) => {
  return item.sesi.reduce((total, sesi) => total + sesi.kuota, 0);
};

export const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatNumberDesimal = (value) => {
  const formattedValue = parseFloat(value).toString();
  return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const spesialisasiDokter = [
  "Umum",
  "Anak",
  "Gigi",
  "Bedah",
  "Jantung",
  "Penyakit Dalam",
  "Mata",
  "Saraf",
  "Kandungan",
  "Kulit dan Kelamin",
  "THT",
];
