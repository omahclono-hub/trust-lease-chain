import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield,
  Wallet,
  Search,
  FileCheck2,
  QrCode,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lock,
  Activity,
  Star,
  MapPin,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-property.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RentSafe — Sewa Properti Lebih Aman dengan Blockchain" },
      {
        name: "description",
        content:
          "Sewa kos & kontrakan di Indonesia dengan jaminan smart contract Solana. Deposit terlindungi escrow on-chain, transparan, dan anti-penipuan.",
      },
      { property: "og:title", content: "RentSafe — Sewa Properti Aman dengan Blockchain" },
      {
        property: "og:description",
        content:
          "Platform Web3 pertama di Indonesia untuk sewa kos & kontrakan dengan smart contract Solana.",
      },
      { property: "og:image", content: heroImage },
    ],
  }),
  component: Landing,
});

const tickerItems = [
  "TX 4zP9…9qWj — Deposit escrow 4.50 SOL terkunci",
  "Kontrak #8821 — Kos Andalan, Jakarta Selatan • aktif",
  "Refund 2.10 SOL dirilis ke 7tR2…1pNm",
  "Properti baru terverifikasi: Griya Mentari, Sleman",
  "Kontrak #8822 — Paviliun Gading, Depok • aktif",
  "TX 91xK…3b8s — Pembayaran sewa bulanan dikonfirmasi",
];

const stats = [
  { label: "Properti Terverifikasi", value: "1,248" },
  { label: "Penyewa Aktif", value: "3,892" },
  { label: "Smart Contracts", value: "8,421" },
  { label: "Transaksi On-Chain", value: "12.5K" },
];

const features = [
  {
    icon: FileCheck2,
    title: "Smart Contract Rental",
    body: "Perjanjian sewa otomatis di Solana. Tidak bisa diubah sepihak.",
  },
  {
    icon: Lock,
    title: "Deposit Escrow",
    body: "Deposit terkunci on-chain dan dirilis sesuai kesepakatan kontrak.",
  },
  {
    icon: Shield,
    title: "Verified Owner",
    body: "Pemilik properti diverifikasi identitas & kepemilikan aset.",
  },
  {
    icon: Activity,
    title: "Riwayat Transparan",
    body: "Semua pembayaran tercatat permanen di blockchain Solana.",
  },
  {
    icon: QrCode,
    title: "QR Verification",
    body: "Validasi status sewa & kontrak hanya dengan satu pemindaian.",
  },
  {
    icon: Sparkles,
    title: "Reputation Score",
    body: "Skor reputasi berbasis wallet untuk penyewa & pemilik.",
  },
];

const properties = [
  {
    img: property1,
    title: "Urban Studio Gading",
    location: "Kebayoran Baru, Jakarta Selatan",
    price: "4.5 jt",
    sol: "0.35 SOL",
    rating: 4.9,
    tags: ["WiFi 1Gbps", "Cleaning Svc"],
    wallet: "4zP9…9qWj",
  },
  {
    img: property2,
    title: "Komorebi Kost",
    location: "Sleman, Yogyakarta",
    price: "1.8 jt",
    sol: "0.14 SOL",
    rating: 4.7,
    tags: ["Dekat Kampus", "AC Room"],
    wallet: "2cR4…e91x",
  },
  {
    img: property3,
    title: "Loft 21 Kuningan",
    location: "Setiabudi, Jakarta Selatan",
    price: "8.2 jt",
    sol: "0.62 SOL",
    rating: 5.0,
    tags: ["Gym Access", "Parking"],
    wallet: "91xK…3b8s",
  },
];

const steps = [
  { n: "01", title: "Connect Wallet", body: "Hubungkan Phantom, Solflare, Backpack, atau WalletConnect." },
  { n: "02", title: "Cari Properti", body: "Filter kos & kontrakan berstatus Verified On-Chain." },
  { n: "03", title: "Smart Contract", body: "Kontrak digital otomatis dibuat dan ditandatangani di Solana." },
  { n: "04", title: "Bayar Deposit", body: "Dana dikunci escrow Solana, dirilis sesuai kesepakatan." },
  { n: "05", title: "Mulai Menempati", body: "Akses properti via QR Code yang terikat ke kontrak Anda." },
];

const testimonials = [
  {
    name: "Putri Anggraini",
    role: "Mahasiswa UI",
    body: "Akhirnya ada platform yang bikin deposit kos terasa aman. Semua jelas di blockchain, gak ada lagi drama pemilik kabur.",
  },
  {
    name: "Reza Wibowo",
    role: "Pemilik 3 Properti",
    body: "Smart contract bantu saya kelola penyewa tanpa ribet. Pembayaran lancar, riwayat tercatat permanen.",
  },
  {
    name: "Andini Kusuma",
    role: "Software Engineer",
    body: "UX-nya mirip Airbnb tapi dengan transparansi Web3. Refund deposit langsung masuk wallet, instan.",
  },
];

const faqs = [
  {
    q: "Apakah saya butuh SOL untuk menyewa di RentSafe?",
    a: "Ya, Anda butuh sedikit SOL untuk biaya transaksi (gas fee) dan pembayaran deposit. Pembayaran sewa bulanan juga dapat menggunakan stablecoin SPL Token.",
  },
  {
    q: "Bagaimana smart contract melindungi deposit saya?",
    a: "Deposit Anda dikunci dalam program escrow Solana. Dana hanya bisa dirilis sesuai ketentuan kontrak — misalnya saat masa sewa berakhir tanpa sengketa.",
  },
  {
    q: "Apa yang terjadi jika ada sengketa dengan pemilik?",
    a: "Smart contract mencatat semua bukti transaksi dan komunikasi on-chain. Kami menyediakan mekanisme arbitrase berbasis bukti yang tidak bisa dimanipulasi.",
  },
  {
    q: "Wallet apa saja yang didukung?",
    a: "Phantom, Solflare, Backpack, dan WalletConnect. Wallet Anda otomatis tersimpan sebagai identitas Web3 di profil.",
  },
  {
    q: "Apakah pemilik properti diverifikasi?",
    a: "Setiap pemilik wajib melalui verifikasi dokumen dan kepemilikan aset. Listing yang lolos verifikasi mendapat badge Verified On-Chain.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Ticker />
      <Nav />
      <Hero />
      <StatsBar />
      <Featured />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="bg-ink text-ink-foreground border-b border-white/5 overflow-hidden">
      <div className="flex gap-10 py-2 whitespace-nowrap animate-ticker font-mono text-[11px] text-white/60">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-2 shrink-0">
            <span className="size-1.5 rounded-full bg-success" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-7 rounded-md bg-primary grid place-items-center shadow-glow">
        <Shield className="size-4 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <span className="font-bold tracking-tight text-base">RentSafe</span>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            <a href="#properti" className="hover:text-foreground transition-colors">Cari Properti</a>
            <a href="#cara-kerja" className="hover:text-foreground transition-colors">Cara Kerja</a>
            <a href="#kontrak" className="hover:text-foreground transition-colors">Smart Contract</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex text-sm font-medium px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
            Masuk
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity">
            <Wallet className="size-4" />
            Hubungkan Wallet
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/20 mb-6">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[11px] font-mono font-semibold text-success uppercase tracking-wider">
              Solana Mainnet · Live
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.05] text-balance">
            Sewa Properti Lebih <span className="text-primary">Aman</span> dengan Blockchain
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-[52ch] text-pretty">
            Platform pertama di Indonesia yang melindungi deposit sewa Anda dengan smart contract Solana. Tanpa
            listing palsu, tanpa sengketa, semua transaksi tercatat permanen.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-95 transition-opacity shadow-glow"
            >
              <Search className="size-4" /> Cari Properti
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-card text-foreground font-semibold text-base border border-border hover:bg-secondary transition-colors">
              <Wallet className="size-4" /> Hubungkan Wallet
            </button>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="size-7 rounded-full bg-gradient-to-br from-primary to-success border-2 border-background" />
              <div className="size-7 rounded-full bg-gradient-to-br from-success to-primary border-2 border-background" />
              <div className="size-7 rounded-full bg-gradient-to-br from-accent-foreground to-primary border-2 border-background" />
            </div>
            <span>Bergabung dengan <strong className="text-foreground">3,892</strong> penyewa aktif</span>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-border shadow-card">
            <img
              src={heroImage}
              alt="Interior properti modern terverifikasi RentSafe"
              width={1280}
              height={1600}
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-background/90 backdrop-blur flex items-center gap-1.5 ring-1 ring-border">
              <CheckCircle2 className="size-3.5 text-success" />
              <span className="text-[11px] font-semibold">Verified On-Chain</span>
            </div>
          </div>

          {/* Floating contract card */}
          <div className="absolute -bottom-6 -left-6 sm:-left-10 max-w-[280px] p-4 rounded-2xl bg-card ring-1 ring-border shadow-card">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-success/10 grid place-items-center">
                <Lock className="size-5 text-success" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase font-mono text-muted-foreground tracking-wider">
                  Escrow Deposit
                </div>
                <div className="font-semibold tracking-tight">+4.50 SOL</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[11px]">
              <span className="font-mono text-muted-foreground">Tx 4zP9…9qWj</span>
              <span className="text-success font-semibold">Confirmed</span>
            </div>
          </div>

          {/* Floating reputation chip */}
          <div className="hidden sm:flex absolute -top-4 -right-4 items-center gap-2 px-3 py-2 rounded-xl bg-card ring-1 ring-border shadow-card">
            <Sparkles className="size-4 text-primary" />
            <div>
              <div className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Reputation</div>
              <div className="text-sm font-bold">98 / 100</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatsBar() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl md:text-4xl font-bold tracking-tight">{s.value}</div>
            <div className="mt-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section id="properti" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Properti Unggulan</h2>
            <p className="text-muted-foreground text-pretty">
              Semua listing diverifikasi kepemilikannya secara on-chain.
            </p>
          </div>
          <Link to="/search" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Lihat semua <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((p, i) => (
            <Link
              to="/property/$id"
              params={{ id: String(i + 1) }}
              key={p.title}
              className="group cursor-pointer animate-fade-up block"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-border">
                <img
                  src={p.img}
                  alt={p.title}
                  width={800}
                  height={640}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-background/90 backdrop-blur flex items-center gap-1.5 ring-1 ring-border">
                  <span className="size-2 rounded-full bg-success" />
                  <span className="text-[10px] font-mono font-bold tracking-tighter">VERIFIED ON-CHAIN</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-bold">{p.title}</h3>
                    <div className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" /> {p.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{p.rating}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="font-bold">Rp {p.price}</span>
                    <span className="text-muted-foreground text-sm"> /bln</span>
                    <span className="ml-2 text-[11px] font-mono text-muted-foreground">≈ {p.sol}</span>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">{p.wallet}</div>
                </div>
                <div className="mt-3 flex gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="kontrak" className="py-24 bg-secondary/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
            <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
              Built on Solana
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Infrastruktur kepercayaan untuk pasar sewa
          </h2>
          <p className="text-muted-foreground text-pretty">
            Setiap interaksi—mulai dari verifikasi pemilik hingga rilis deposit—diamankan oleh smart contract yang tidak dapat dimanipulasi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-card ring-1 ring-border hover:ring-primary/30 transition-all hover:-translate-y-0.5"
            >
              <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4">
                <f.icon className="size-5" />
              </div>
              <h3 className="font-semibold mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-24 bg-ink text-ink-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Cara Kerja RentSafe</h2>
          <p className="text-white/60">
            Tanpa dokumen fisik. Tanpa tanda tangan basah. Semua langkah otomatis tercatat di Solana.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-3">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`p-6 rounded-2xl ring-1 ${
                i === 4
                  ? "bg-primary text-primary-foreground ring-primary/0 shadow-glow"
                  : "bg-white/[0.03] ring-white/10"
              }`}
            >
              <div className={`font-mono font-bold text-sm mb-6 ${i === 4 ? "text-white/80" : "text-primary"}`}>
                {s.n}
              </div>
              <h4 className="font-semibold mb-2">{s.title}</h4>
              <p className={`text-xs ${i === 4 ? "text-white/80" : "text-white/50"}`}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Dipercaya komunitas urban</h2>
          <p className="text-muted-foreground">Cerita dari penyewa dan pemilik properti yang sudah pindah ke RentSafe.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="p-6 rounded-2xl bg-card ring-1 ring-border">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed text-pretty">"{t.body}"</blockquote>
              <figcaption className="mt-5 pt-5 border-t border-border flex items-center gap-3">
                <div className="size-9 rounded-full bg-gradient-to-br from-primary to-success" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 bg-secondary/40 border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">Pertanyaan Umum</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-xl bg-card ring-1 ring-border overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  {isOpen ? (
                    <Minus className="size-4 text-primary shrink-0" />
                  ) : (
                    <Plus className="size-4 text-primary shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground text-pretty">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink text-ink-foreground p-10 md:p-14 shadow-glow">
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            background: "radial-gradient(circle at 80% 20%, oklch(0.58 0.18 250 / 0.5), transparent 50%)"
          }} />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
              Siap pindah ke sewa yang lebih aman?
            </h2>
            <p className="text-white/70 mb-8 text-pretty">
              Hubungkan wallet Anda dan temukan kos atau kontrakan terverifikasi dalam hitungan menit.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-95">
                <Wallet className="size-4" /> Hubungkan Wallet
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/15">
                <Search className="size-4" /> Cari Properti
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed text-pretty">
              Membangun infrastruktur kepercayaan untuk pasar properti Indonesia melalui Solana.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-success/10 border border-success/20">
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-mono font-semibold text-success uppercase tracking-wider">
                Mainnet Beta
              </span>
            </div>
          </div>
          {[
            { h: "Platform", l: ["Cari Properti", "Smart Contract", "QR Verification", "Dashboard"] },
            { h: "Perusahaan", l: ["Tentang Kami", "Karir", "Kontak", "Blog"] },
            { h: "Legal", l: ["Syarat & Ketentuan", "Kebijakan Privasi", "Bug Bounty", "Audit Report"] },
          ].map((c) => (
            <div key={c.h}>
              <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-5">
                {c.h}
              </h5>
              <ul className="space-y-3 text-sm">
                {c.l.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-foreground/80 hover:text-primary transition-colors">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground">
            © 2025 RENTSAFE — NETWORK: SOLANA_MAINNET_BETA
          </p>
          <div className="text-xs text-muted-foreground">
            Built with ❤ for Indonesia · Powered by Solana
          </div>
        </div>
      </div>
    </footer>
  );
}
