import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  FileCheck2,
  Sparkles,
  Calendar,
  ArrowRight,
  ExternalLink,
  Home,
  Users,
  DollarSign,
  Activity as ActivityIcon,
  QrCode,
  CheckCircle2,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { useWallet } from "@/lib/wallet";
import {
  tenantContracts,
  ownerContracts,
  activity,
  properties,
  formatIDR,
  shortenAddress,
  type ContractRecord,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — RentSafe" },
      { name: "description", content: "Kelola kontrak sewa, deposit, dan aktivitas on-chain Anda." },
    ],
  }),
  component: Dashboard,
});

type Role = "tenant" | "owner";

function Dashboard() {
  const [role, setRole] = useState<Role>("tenant");
  const { connected, address, shortAddress, walletId } = useWallet();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Ringkasan kontrak, transaksi, dan aktivitas on-chain.
            </p>
          </div>
          <div className="inline-flex p-1 rounded-full bg-secondary border border-border">
            {(["tenant", "owner"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  role === r ? "bg-card text-foreground shadow-card" : "text-muted-foreground"
                }`}
              >
                {r === "tenant" ? "Penyewa" : "Pemilik"}
              </button>
            ))}
          </div>
        </div>

        {/* Wallet bar */}
        <div className="mb-8 p-5 rounded-2xl bg-ink text-ink-foreground flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-primary/20 grid place-items-center">
              <Wallet className="size-5 text-primary" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                {connected ? `Connected · ${walletId}` : "Wallet belum terhubung"}
              </div>
              <div className="font-mono text-sm">
                {address ? address : "Hubungkan wallet untuk membaca data on-chain"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">Reputation</div>
              <div className="inline-flex items-center gap-1 font-bold">
                <Sparkles className="size-3.5 text-success" /> 96
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">Saldo (mock)</div>
              <div className="font-bold">2.45 SOL</div>
            </div>
          </div>
        </div>

        {role === "tenant" ? <TenantView /> : <OwnerView />}
      </div>
    </div>
  );
}

function TenantView() {
  const stats = [
    { icon: FileCheck2, label: "Kontrak Aktif", value: "2", hint: "+1 berakhir bulan ini" },
    { icon: DollarSign, label: "Total Dibayar", value: "8.4 SOL", hint: "≈ Rp 108 jt" },
    { icon: Sparkles, label: "Reputation", value: "96", hint: "Tier Trusted" },
    { icon: ActivityIcon, label: "Transaksi", value: "24", hint: "On-chain" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6 min-w-0">
          <ContractsCard contracts={tenantContracts} />
          <TransactionsCard />
        </div>
        <div className="space-y-6">
          <ActivityCard />
          <QrCard />
        </div>
      </div>
    </>
  );
}

function OwnerView() {
  const stats = [
    { icon: Home, label: "Properti Aktif", value: "5", hint: "1 menunggu verifikasi" },
    { icon: Users, label: "Penyewa Aktif", value: "12", hint: "+2 bulan ini" },
    { icon: DollarSign, label: "Pendapatan", value: "24.3 SOL", hint: "Bulan ini" },
    { icon: TrendingUp, label: "Okupansi", value: "92%", hint: "Rata-rata 12 bln" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6 min-w-0">
          <ContractsCard contracts={ownerContracts} ownerView />
          <PropertiesCard />
        </div>
        <div className="space-y-6">
          <ActivityCard />
          <RevenueCard />
        </div>
      </div>
    </>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-card ring-1 ring-border">
      <Icon className="size-4 text-muted-foreground mb-3" />
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
      <div className="text-[11px] text-muted-foreground mt-2">{hint}</div>
    </div>
  );
}

function ContractsCard({ contracts, ownerView }: { contracts: ContractRecord[]; ownerView?: boolean }) {
  return (
    <section className="rounded-2xl bg-card ring-1 ring-border overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="font-bold">Smart Contracts</h2>
        <Link to="/search" className="text-xs font-semibold text-primary inline-flex items-center gap-1">
          Cari properti baru <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <div className="divide-y divide-border">
        {contracts.map((c) => (
          <div key={c.id} className="p-5 flex flex-wrap items-center gap-4">
            <div className="size-11 rounded-xl bg-primary/10 grid place-items-center shrink-0">
              <FileCheck2 className="size-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  to="/property/$id"
                  params={{ id: c.propertyId }}
                  className="font-semibold hover:text-primary"
                >
                  {c.propertyTitle}
                </Link>
                <StatusBadge status={c.status} />
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-3">
                <span className="font-mono">{c.id}</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3" /> {c.startDate} → {c.endDate}
                </span>
                <span className="font-mono hidden sm:inline">
                  {ownerView ? shortenAddress(c.tenantWallet, 4, 4) : shortenAddress(c.ownerWallet, 4, 4)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">{c.monthlySol} SOL/bln</div>
              <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                Deposit {c.depositSol} SOL
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: ContractRecord["status"] }) {
  const map: Record<ContractRecord["status"], { label: string; cls: string }> = {
    active: { label: "Aktif", cls: "bg-success/10 text-success" },
    ending: { label: "Hampir Berakhir", cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    ended: { label: "Selesai", cls: "bg-secondary text-muted-foreground" },
    review: { label: "Review", cls: "bg-primary/10 text-primary" },
    pending_signature: { label: "Tunggu TTD", cls: "bg-primary/10 text-primary" },
  };
  const { label, cls } = map[status];
  return (
    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${cls}`}>
      {label}
    </span>
  );
}

function TransactionsCard() {
  return (
    <section className="rounded-2xl bg-card ring-1 ring-border overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="font-bold">Riwayat Transaksi On-Chain</h2>
        <span className="text-[10px] font-mono uppercase text-muted-foreground">Solana RPC</span>
      </div>
      <div className="divide-y divide-border">
        {activity.map((a) => (
          <div key={a.id} className="p-4 flex items-center gap-4">
            <div className={`size-9 rounded-lg grid place-items-center ${kindStyle(a.kind)}`}>
              <FileCheck2 className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{a.label}</div>
              <div className="text-xs text-muted-foreground truncate">{a.detail}</div>
            </div>
            <div className="text-right hidden sm:block">
              {a.amountSol !== undefined && (
                <div className="font-semibold text-sm">{a.amountSol} SOL</div>
              )}
              <div className="text-[10px] font-mono text-muted-foreground">
                {a.txHash ? shortenAddress(a.txHash, 4, 4) : "—"}
              </div>
            </div>
            {a.txHash && (
              <a href="#" className="text-muted-foreground hover:text-primary">
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function kindStyle(k: string) {
  switch (k) {
    case "deposit":
    case "verification":
      return "bg-success/10 text-success";
    case "rent":
    case "signature":
      return "bg-primary/10 text-primary";
    default:
      return "bg-secondary text-muted-foreground";
  }
}

function ActivityCard() {
  const steps = [
    { label: "Review Kontrak", done: true },
    { label: "Tanda Tangan", done: true },
    { label: "Deposit Escrow", done: true },
    { label: "Aktif Berjalan", done: true, current: true },
    { label: "Selesai & Rilis", done: false },
  ];
  return (
    <section className="rounded-2xl bg-card ring-1 ring-border p-5">
      <h2 className="font-bold mb-1">Timeline Kontrak Aktif</h2>
      <p className="text-xs text-muted-foreground mb-5">Urban Studio Gading · 4 dari 5 langkah</p>
      <div className="space-y-1">
        {steps.map((s, i) => (
          <div key={s.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`size-6 rounded-full grid place-items-center text-[10px] font-bold ${
                  s.done
                    ? s.current
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-success text-success-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {s.done ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-px h-8 ${steps[i + 1].done ? "bg-success" : "bg-border"}`} />
              )}
            </div>
            <div className="pb-3">
              <div className={`text-sm font-medium ${s.done ? "" : "text-muted-foreground"}`}>{s.label}</div>
              {s.current && <div className="text-[11px] text-primary font-medium mt-0.5">Sedang berjalan</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QrCard() {
  return (
    <section className="rounded-2xl bg-ink text-ink-foreground p-5">
      <div className="flex items-center gap-3 mb-4">
        <QrCode className="size-5 text-success" />
        <h2 className="font-bold">QR Verification</h2>
      </div>
      <div className="aspect-square bg-white rounded-xl p-4 grid place-items-center mb-4">
        <div
          className="size-full"
          style={{
            background:
              "repeating-conic-gradient(#0a0a0a 0 25%, transparent 0 50%) 50%/16px 16px, linear-gradient(#0a0a0a, #0a0a0a) center/40% 40% no-repeat",
            backgroundColor: "#fff",
          }}
        />
      </div>
      <div className="text-[11px] font-mono text-white/60 text-center">
        Scan untuk verifikasi kontrak RS-2024-8821
      </div>
    </section>
  );
}

function PropertiesCard() {
  return (
    <section className="rounded-2xl bg-card ring-1 ring-border overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="font-bold">Listing Properti</h2>
        <button className="text-xs font-semibold text-primary">+ Tambah Properti</button>
      </div>
      <div className="divide-y divide-border">
        {properties.slice(0, 3).map((p) => (
          <div key={p.id} className="p-4 flex items-center gap-4">
            <img src={p.images[0]} alt={p.title} className="size-14 rounded-xl object-cover" loading="lazy" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{p.title}</div>
              <div className="text-xs text-muted-foreground truncate">{p.area}, {p.city}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-sm">{formatIDR(p.pricePerMonth)}</div>
              <div className="text-[10px] inline-flex items-center gap-1 text-success font-semibold">
                <CheckCircle2 className="size-3" /> Verified
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RevenueCard() {
  const data = [60, 72, 68, 85, 92, 78, 95];
  const max = Math.max(...data);
  return (
    <section className="rounded-2xl bg-card ring-1 ring-border p-5">
      <h2 className="font-bold mb-1">Pendapatan 7 Bulan</h2>
      <p className="text-xs text-muted-foreground mb-5">Total 24.3 SOL bulan ini</p>
      <div className="flex items-end gap-2 h-32">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className="w-full rounded-md bg-gradient-to-t from-primary to-primary/60"
              style={{ height: `${(v / max) * 100}%` }}
            />
            <div className="text-[9px] font-mono text-muted-foreground">M{i + 1}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
