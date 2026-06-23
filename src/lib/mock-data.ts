import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export type PropertyType = "kos" | "kontrakan" | "apartemen";

export interface PropertyOwner {
  name: string;
  wallet: string;
  reputation: number;
  verified: boolean;
  joined: string;
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  city: string;
  area: string;
  pricePerMonth: number; // IDR
  priceSol: number;
  rating: number;
  reviews: number;
  available: boolean;
  verifiedOnChain: boolean;
  amenities: string[];
  description: string;
  images: string[];
  contractAddress: string;
  totalContracts: number;
  owner: PropertyOwner;
  lat: number;
  lng: number;
}

const owners: PropertyOwner[] = [
  { name: "Reza Wibowo", wallet: "4zP9qK8XmnRtVbHcL2sNwDfYj7gQpA9xZbVuYhJk9qWj", reputation: 98, verified: true, joined: "2024-03" },
  { name: "Putri Maharani", wallet: "2cR4eK9xBnMpVqZyHj7Lk3WdFsAyDvGcXt8RbNm9e91x", reputation: 92, verified: true, joined: "2024-06" },
  { name: "Bayu Saputra", wallet: "91xK3b8sQpRtUvLcXfHj2WdYnNkAyDmZbVgYhJk1pNm9", reputation: 95, verified: true, joined: "2023-11" },
  { name: "Sinta Wijaya", wallet: "7tR2pNmKjB8sUqVcLfXyHd3WnAyDvGcZbVgYhJk1mEfG", reputation: 88, verified: true, joined: "2024-09" },
];

export const properties: Property[] = [
  {
    id: "urban-studio-gading",
    title: "Urban Studio Gading",
    type: "apartemen",
    city: "Jakarta Selatan",
    area: "Kebayoran Baru",
    pricePerMonth: 4_500_000,
    priceSol: 0.35,
    rating: 4.9,
    reviews: 124,
    available: true,
    verifiedOnChain: true,
    amenities: ["WiFi 1Gbps", "AC", "Cleaning Svc", "Security 24/7", "Parking"],
    description:
      "Studio modern di pusat Jakarta dengan akses MRT 150m. Cocok untuk profesional muda yang mengutamakan kenyamanan dan keamanan.",
    images: [property1, property2, property3],
    contractAddress: "RSafe7TVcL2sNwDfYj7gQpA9xZbVuYhJk9qWj4zP9qK8X",
    totalContracts: 12,
    owner: owners[0],
    lat: -6.2441,
    lng: 106.7997,
  },
  {
    id: "komorebi-kost",
    title: "Komorebi Kost Putri",
    type: "kos",
    city: "Yogyakarta",
    area: "Sleman",
    pricePerMonth: 1_800_000,
    priceSol: 0.14,
    rating: 4.7,
    reviews: 86,
    available: true,
    verifiedOnChain: true,
    amenities: ["WiFi", "AC", "Kamar Mandi Dalam", "Dapur Bersama"],
    description:
      "Kost putri minimalis ala Jepang, 5 menit dari UGM. Lingkungan tenang dan ibu kost yang ramah.",
    images: [property2, property4, property1],
    contractAddress: "RSafe2cR4eK9xBnMpVqZyHj7Lk3WdFsAyDvGcXt8RbNm9",
    totalContracts: 8,
    owner: owners[1],
    lat: -7.7715,
    lng: 110.3776,
  },
  {
    id: "loft-21-kuningan",
    title: "Loft 21 Kuningan",
    type: "apartemen",
    city: "Jakarta Selatan",
    area: "Setiabudi",
    pricePerMonth: 8_200_000,
    priceSol: 0.62,
    rating: 5.0,
    reviews: 58,
    available: false,
    verifiedOnChain: true,
    amenities: ["Gym Access", "Rooftop", "WiFi 1Gbps", "Parking", "Concierge"],
    description:
      "Loft mewah dengan view skyline Jakarta. Fasilitas gym, kolam renang, dan concierge 24 jam.",
    images: [property3, property1, property5],
    contractAddress: "RSafe91xK3b8sQpRtUvLcXfHj2WdYnNkAyDmZbVgYhJk1",
    totalContracts: 4,
    owner: owners[2],
    lat: -6.2297,
    lng: 106.8261,
  },
  {
    id: "griya-mentari",
    title: "Griya Mentari Family",
    type: "kontrakan",
    city: "Tangerang Selatan",
    area: "Bintaro",
    pricePerMonth: 5_500_000,
    priceSol: 0.42,
    rating: 4.6,
    reviews: 41,
    available: true,
    verifiedOnChain: true,
    amenities: ["3 Kamar", "Garasi", "Halaman", "AC", "Air PAM"],
    description:
      "Rumah kontrakan 2 lantai untuk keluarga muda. Kawasan asri dan dekat sekolah internasional.",
    images: [property5, property3, property1],
    contractAddress: "RSafe7tR2pNmKjB8sUqVcLfXyHd3WnAyDvGcZbVgYhJk1",
    totalContracts: 6,
    owner: owners[3],
    lat: -6.2655,
    lng: 106.7363,
  },
  {
    id: "brick-loft-dago",
    title: "Brick Loft Dago",
    type: "apartemen",
    city: "Bandung",
    area: "Coblong",
    pricePerMonth: 3_200_000,
    priceSol: 0.25,
    rating: 4.8,
    reviews: 72,
    available: true,
    verifiedOnChain: true,
    amenities: ["WiFi", "AC", "Rooftop", "Cleaning Svc"],
    description:
      "Loft industrial dengan dinding bata ekspos di kawasan Dago. Spot kafe dan coworking di sekitarnya.",
    images: [property6, property2, property3],
    contractAddress: "RSafeBR1cKLftD9SoLnHmKqVpWdAyDvGcZbVgYhJk1mEfG",
    totalContracts: 9,
    owner: owners[0],
    lat: -6.8728,
    lng: 107.6107,
  },
  {
    id: "rumah-asri-depok",
    title: "Rumah Asri Margonda",
    type: "kontrakan",
    city: "Depok",
    area: "Beji",
    pricePerMonth: 4_000_000,
    priceSol: 0.31,
    rating: 4.5,
    reviews: 33,
    available: true,
    verifiedOnChain: false,
    amenities: ["2 Kamar", "Carport", "Halaman", "Dekat UI"],
    description:
      "Rumah kontrakan dekat kampus UI. Cocok untuk mahasiswa atau keluarga kecil.",
    images: [property5, property4, property2],
    contractAddress: "RSafeRMSDPKxBnMpVqZyHj7Lk3WdFsAyDvGcXt8RbNm9e",
    totalContracts: 3,
    owner: owners[1],
    lat: -6.367,
    lng: 106.8324,
  },
];

export const cities = Array.from(new Set(properties.map((p) => p.city))).sort();
export const allAmenities = Array.from(
  new Set(properties.flatMap((p) => p.amenities)),
).sort();

export interface ContractRecord {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantWallet: string;
  ownerWallet: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  monthlySol: number;
  depositSol: number;
  status: "active" | "ending" | "ended" | "review" | "pending_signature";
  txHash: string;
  signedAt: string | null;
}

export const tenantContracts: ContractRecord[] = [
  {
    id: "RS-2024-8821",
    propertyId: "urban-studio-gading",
    propertyTitle: "Urban Studio Gading",
    tenantWallet: "MyWalletPlaceholderTenant",
    ownerWallet: owners[0].wallet,
    startDate: "2024-08-01",
    endDate: "2025-08-01",
    monthlyRent: 4_500_000,
    monthlySol: 0.35,
    depositSol: 0.7,
    status: "active",
    txHash: "4zP9qK8XmnRtVbHcL2sNwDfYj7gQpA9xZbVuYhJk9qWj1mEfG7sUqVcLfXyHd3W",
    signedAt: "2024-07-28T10:22:00Z",
  },
  {
    id: "RS-2024-8902",
    propertyId: "brick-loft-dago",
    propertyTitle: "Brick Loft Dago",
    tenantWallet: "MyWalletPlaceholderTenant",
    ownerWallet: owners[0].wallet,
    startDate: "2024-11-15",
    endDate: "2025-02-15",
    monthlyRent: 3_200_000,
    monthlySol: 0.25,
    depositSol: 0.5,
    status: "ending",
    txHash: "BR1cKLftD9SoLnHmKqVpWdAyDvGcZbVgYhJk1mEfG7sUqVcLfXyHd3W2cR4eK9x",
    signedAt: "2024-11-10T08:15:00Z",
  },
];

export const ownerContracts: ContractRecord[] = [
  ...tenantContracts,
  {
    id: "RS-2024-8765",
    propertyId: "griya-mentari",
    propertyTitle: "Griya Mentari Family",
    tenantWallet: "9pK3xLmRtZbVuYhJk2sNwDfYj7gQpA8xZb",
    ownerWallet: owners[3].wallet,
    startDate: "2024-06-01",
    endDate: "2025-06-01",
    monthlyRent: 5_500_000,
    monthlySol: 0.42,
    depositSol: 0.84,
    status: "active",
    txHash: "7tR2pNmKjB8sUqVcLfXyHd3WnAyDvGcZbVgYhJk1mEfG4zP9qK8XmnRtVbHcL2s",
    signedAt: "2024-05-28T14:30:00Z",
  },
];

export interface ActivityEvent {
  id: string;
  kind: "deposit" | "rent" | "signature" | "review" | "refund" | "verification";
  label: string;
  detail: string;
  txHash: string | null;
  timestamp: string;
  amountSol?: number;
}

export const activity: ActivityEvent[] = [
  {
    id: "a1",
    kind: "rent",
    label: "Pembayaran sewa bulanan",
    detail: "Urban Studio Gading · Bulan 5",
    txHash: "4zP9qK8XmnRtVbHcL2sNwDfYj7gQpA9xZbVuYhJk9qWj",
    timestamp: "2025-01-01T09:12:00Z",
    amountSol: 0.35,
  },
  {
    id: "a2",
    kind: "signature",
    label: "Smart contract ditandatangani",
    detail: "Brick Loft Dago · 3 bulan",
    txHash: "BR1cKLftD9SoLnHmKqVpWdAyDvGcZbVgYhJk1mEfG",
    timestamp: "2024-11-10T08:15:00Z",
  },
  {
    id: "a3",
    kind: "deposit",
    label: "Deposit escrow terkunci",
    detail: "Brick Loft Dago",
    txHash: "BR1cKLftD9SoLnHmKqVpWdAyDvGcZb",
    timestamp: "2024-11-10T08:14:00Z",
    amountSol: 0.5,
  },
  {
    id: "a4",
    kind: "verification",
    label: "Identitas wallet diverifikasi",
    detail: "RentSafe Identity v2",
    txHash: null,
    timestamp: "2024-08-01T12:00:00Z",
  },
  {
    id: "a5",
    kind: "review",
    label: "Smart contract direview",
    detail: "Urban Studio Gading",
    txHash: null,
    timestamp: "2024-07-27T10:00:00Z",
  },
];

export function formatIDR(n: number): string {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")} jt`;
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`;
  return `Rp ${n}`;
}

export function shortenAddress(addr: string, head = 4, tail = 4): string {
  if (addr.length <= head + tail + 1) return addr;
  return `${addr.slice(0, head)}…${addr.slice(-tail)}`;
}

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}
