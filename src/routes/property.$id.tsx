import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Star,
  CheckCircle2,
  Sparkles,
  Shield,
  Lock,
  Wallet,
  ExternalLink,
  Calendar,
  FileCheck2,
  ArrowRight,
  Copy,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { getProperty, formatIDR, shortenAddress, activity } from "@/lib/mock-data";
import { useWallet } from "@/lib/wallet";
import { toast } from "sonner";

export const Route = createFileRoute("/property/$id")({
  loader: ({ params }): { property: NonNullable<ReturnType<typeof getProperty>> } => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.title} — RentSafe` },
          { name: "description", content: loaderData.property.description },
          { property: "og:title", content: loaderData.property.title },
          { property: "og:description", content: loaderData.property.description },
          { property: "og:image", content: loaderData.property.images[0] },
        ]
      : [{ title: "Properti — RentSafe" }],
  }),
  component: PropertyDetail,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">Properti tidak ditemukan</h1>
        <Link to="/search" className="text-primary font-semibold">Kembali ke pencarian →</Link>
      </div>
    </div>
  ),
});

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const { connected, address } = useWallet();
  const [activeImg, setActiveImg] = useState(0);
  const [showRentFlow, setShowRentFlow] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          <Link to="/search" className="hover:text-foreground">Cari Properti</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{property.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{property.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" /> {property.area}, {property.city}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-foreground">{property.rating}</span>
                ({property.reviews} ulasan)
              </span>
              {property.verifiedOnChain && (
                <span className="inline-flex items-center gap-1.5 text-success">
                  <CheckCircle2 className="size-4" /> Verified On-Chain
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-2 mb-10 rounded-2xl overflow-hidden">
          <img
            src={property.images[activeImg]}
            alt={property.title}
            className="w-full aspect-[4/3] md:aspect-auto md:row-span-2 object-cover md:h-full"
            width={1280}
            height={960}
          />
          {property.images.slice(0, 4).map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`hidden md:block aspect-[4/3] overflow-hidden ${activeImg === i ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Main column */}
          <div className="space-y-10 min-w-0">
            {/* Owner */}
            <section className="p-6 rounded-2xl bg-card ring-1 ring-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-primary to-success" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{property.owner.name}</h3>
                      {property.owner.verified && <CheckCircle2 className="size-4 text-success" />}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 font-mono">
                      {shortenAddress(property.owner.wallet, 6, 6)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Reputation</div>
                  <div className="inline-flex items-center gap-1 text-lg font-bold text-primary">
                    <Sparkles className="size-4" /> {property.owner.reputation}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
                <Stat label="Kontrak" value={property.totalContracts.toString()} />
                <Stat label="Anggota sejak" value={property.owner.joined} />
                <Stat label="Verifikasi" value="Lulus" />
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold mb-3">Tentang Properti</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">{property.description}</p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 text-sm">
                    <CheckCircle2 className="size-4 text-success shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </section>

            {/* Smart Contract Summary */}
            <section>
              <h2 className="text-xl font-bold mb-3">Ringkasan Smart Contract</h2>
              <div className="rounded-2xl bg-ink text-ink-foreground p-6 ring-1 ring-white/5">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/20 grid place-items-center">
                      <FileCheck2 className="size-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">Contract Address</div>
                      <div className="font-mono text-sm">{shortenAddress(property.contractAddress, 8, 8)}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(property.contractAddress);
                      toast.success("Contract address disalin");
                    }}
                    className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-xs font-medium inline-flex items-center gap-1.5"
                  >
                    <Copy className="size-3.5" /> Salin
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <ContractField label="Network" value="Solana Mainnet" />
                  <ContractField label="Program" value="rentsafe_escrow_v2" />
                  <ContractField label="Deposit Required" value={`${(property.priceSol * 2).toFixed(2)} SOL`} />
                  <ContractField label="Pembayaran" value={`${property.priceSol} SOL / bulan`} />
                </div>
              </div>
            </section>

            {/* Map */}
            <section>
              <h2 className="text-xl font-bold mb-3">Lokasi</h2>
              <div className="rounded-2xl overflow-hidden ring-1 ring-border bg-secondary aspect-[16/9] relative">
                <iframe
                  title="Peta Lokasi"
                  src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </section>

            {/* Rental History */}
            <section>
              <h2 className="text-xl font-bold mb-3">Histori Sewa</h2>
              <div className="rounded-2xl bg-card ring-1 ring-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr className="text-left text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      <th className="py-3 px-4">Periode</th>
                      <th className="py-3 px-4">Penyewa</th>
                      <th className="py-3 px-4">Durasi</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { period: "2024", tenant: "7tR2…1pNm", dur: "12 bln", status: "Selesai" },
                      { period: "2023", tenant: "9pK3…b8sQ", dur: "12 bln", status: "Selesai" },
                      { period: "2022", tenant: "2cR4…e91x", dur: "6 bln", status: "Selesai" },
                    ].map((r, i) => (
                      <tr key={i}>
                        <td className="py-3 px-4 font-semibold">{r.period}</td>
                        <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{r.tenant}</td>
                        <td className="py-3 px-4">{r.dur}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1 text-success text-xs font-semibold">
                            <CheckCircle2 className="size-3.5" /> {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Transaction History */}
            <section>
              <h2 className="text-xl font-bold mb-3">Histori Transaksi On-Chain</h2>
              <div className="space-y-2">
                {activity.slice(0, 4).map((a: typeof activity[number]) => (
                  <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl bg-card ring-1 ring-border">
                    <div className="size-9 rounded-lg bg-primary/10 text-primary grid place-items-center">
                      <FileCheck2 className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{a.label}</div>
                      <div className="text-xs text-muted-foreground truncate">{a.detail}</div>
                    </div>
                    {a.txHash && (
                      <a href="#" className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-primary">
                        {shortenAddress(a.txHash, 6, 6)} <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky booking card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-card ring-1 ring-border p-6 shadow-card">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold">{formatIDR(property.pricePerMonth)}</div>
                  <div className="text-xs text-muted-foreground">per bulan · ≈ {property.priceSol} SOL</div>
                </div>
                {property.available ? (
                  <span className="text-[10px] font-mono font-bold text-success bg-success/10 px-2 py-1 rounded">
                    TERSEDIA
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-muted-foreground bg-secondary px-2 py-1 rounded">
                    FULL
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-5 text-sm">
                <Row icon={Lock} label="Deposit (escrow)" value={`${(property.priceSol * 2).toFixed(2)} SOL`} />
                <Row icon={Calendar} label="Durasi minimum" value="6 bulan" />
                <Row icon={Shield} label="Smart contract" value="rentsafe_escrow_v2" />
              </div>

              <button
                disabled={!property.available}
                onClick={() => setShowRentFlow(true)}
                className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-glow inline-flex items-center justify-center gap-2"
              >
                Sewa Sekarang <ArrowRight className="size-4" />
              </button>

              <p className="text-[11px] text-muted-foreground text-center mt-3">
                Anda akan menandatangani smart contract menggunakan wallet Anda.
              </p>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-success/5 border border-success/20 text-sm">
              <div className="flex items-center gap-2 font-semibold text-success mb-1">
                <Shield className="size-4" /> Deposit Aman
              </div>
              <p className="text-xs text-muted-foreground">
                Dana Anda dikunci di escrow Solana dan hanya dirilis sesuai ketentuan kontrak.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {showRentFlow && (
        <RentFlow
          property={property}
          connected={connected}
          address={address}
          onClose={() => setShowRentFlow(false)}
        />
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-bold">{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Lock; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </span>
      <span className="font-mono text-xs font-semibold">{value}</span>
    </div>
  );
}

function ContractField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">{label}</div>
      <div className="font-mono text-xs">{value}</div>
    </div>
  );
}

function RentFlow({
  property,
  connected,
  address,
  onClose,
}: {
  property: ReturnType<typeof getProperty> & {};
  connected: boolean;
  address: string | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"review" | "sign" | "deposit" | "done">("review");
  const stepIndex = ["review", "sign", "deposit", "done"].indexOf(step);

  const next = () => {
    if (step === "review") setStep("sign");
    else if (step === "sign") {
      toast.success("Smart contract ditandatangani", { description: "Tx 4zP9…9qWj confirmed" });
      setStep("deposit");
    } else if (step === "deposit") {
      toast.success(`Deposit ${(property!.priceSol * 2).toFixed(2)} SOL terkunci di escrow`);
      setStep("done");
    }
  };

  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm grid place-items-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-card overflow-hidden animate-fade-up">
        {/* Stepper */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Sewa {property.title}</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-sm">Tutup</button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {["Review", "Tanda Tangan", "Deposit", "Done"].map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-1 rounded-full ${i <= stepIndex ? "bg-primary" : "bg-secondary"}`} />
                <div className={`text-[10px] font-mono uppercase mt-2 ${i <= stepIndex ? "text-foreground" : "text-muted-foreground"}`}>
                  {i + 1}. {s}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {!connected && step !== "done" && (
            <div className="p-4 mb-4 rounded-xl bg-destructive/5 border border-destructive/20 text-sm flex items-center gap-3">
              <Wallet className="size-5 text-destructive" />
              <div>
                <div className="font-semibold">Wallet belum terhubung</div>
                <div className="text-xs text-muted-foreground">Hubungkan wallet di pojok kanan atas untuk melanjutkan.</div>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-3 text-sm">
              <Detail k="Properti" v={property.title} />
              <Detail k="Durasi" v="12 bulan" />
              <Detail k="Sewa bulanan" v={`${property.priceSol} SOL (${formatIDR(property.pricePerMonth)})`} />
              <Detail k="Deposit" v={`${(property.priceSol * 2).toFixed(2)} SOL`} />
              <Detail k="Wallet Anda" v={address ? shortenAddress(address, 6, 6) : "Belum terhubung"} mono />
              <Detail k="Wallet Pemilik" v={shortenAddress(property.owner.wallet, 6, 6)} mono />
            </div>
          )}

          {step === "sign" && (
            <div className="text-center py-6">
              <div className="size-14 rounded-2xl bg-primary/10 grid place-items-center mx-auto mb-4">
                <FileCheck2 className="size-7 text-primary" />
              </div>
              <h4 className="font-bold mb-1">Tandatangani Smart Contract</h4>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Buka wallet Anda dan konfirmasi transaksi untuk men-deploy kontrak sewa ke Solana.
              </p>
            </div>
          )}

          {step === "deposit" && (
            <div className="text-center py-6">
              <div className="size-14 rounded-2xl bg-success/10 grid place-items-center mx-auto mb-4">
                <Lock className="size-7 text-success" />
              </div>
              <h4 className="font-bold mb-1">Kunci Deposit di Escrow</h4>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {(property.priceSol * 2).toFixed(2)} SOL akan dikunci di program escrow on-chain.
              </p>
            </div>
          )}

          {step === "done" && (
            <div className="text-center py-6">
              <div className="size-14 rounded-2xl bg-success/10 grid place-items-center mx-auto mb-4">
                <CheckCircle2 className="size-7 text-success" />
              </div>
              <h4 className="font-bold mb-1">Sewa berhasil!</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Kontrak Anda aktif. Cek di dashboard untuk QR akses dan jadwal pembayaran.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold"
              >
                Buka Dashboard <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </div>

        {step !== "done" && (
          <div className="p-5 border-t border-border flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium">Batal</button>
            <button
              onClick={next}
              disabled={!connected}
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50"
            >
              {step === "review" ? "Lanjut Tanda Tangan" : step === "sign" ? "Tandatangani" : "Kunci Deposit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className={`font-semibold ${mono ? "font-mono text-xs" : ""}`}>{v}</span>
    </div>
  );
}
