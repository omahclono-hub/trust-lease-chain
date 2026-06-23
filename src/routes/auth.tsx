import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  Upload,
  Shield,
  Home,
  UserCog,
  ArrowRight,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import { SiteNav, WalletPicker } from "@/components/site-nav";
import { useWallet, type WalletId } from "@/lib/wallet";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Masuk atau Daftar — RentSafe" },
      { name: "description", content: "Masuk ke RentSafe dengan email atau wallet Solana Anda." },
    ],
  }),
  component: AuthPage,
});

type Role = "tenant" | "owner" | "admin";
type Mode = "login" | "register";

const roles: { id: Role; label: string; icon: typeof Home; desc: string }[] = [
  { id: "tenant", label: "Penyewa", icon: Home, desc: "Cari kos & kontrakan aman" },
  { id: "owner", label: "Pemilik", icon: UserCog, desc: "Kelola listing & penyewa" },
  { id: "admin", label: "Admin", icon: Shield, desc: "Moderasi & verifikasi" },
];

function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [role, setRole] = useState<Role>("tenant");
  const [pickerOpen, setPickerOpen] = useState(false);
  const { connect, connected, shortAddress } = useWallet();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === "login" ? "Berhasil masuk" : "Akun berhasil dibuat", {
      description: `Selamat datang, ${role === "tenant" ? "Penyewa" : role === "owner" ? "Pemilik" : "Admin"}!`,
    });
    navigate({ to: "/dashboard" });
  };

  const onPickWallet = (id: WalletId) => {
    connect(id);
    setPickerOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="grid lg:grid-cols-[1.05fr_1fr] min-h-[calc(100vh-4rem)]">
        {/* Left: form */}
        <div className="px-6 py-12 lg:px-16 lg:py-16 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="inline-flex p-1 rounded-full bg-secondary border border-border mb-8">
              {(["login", "register"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    mode === m ? "bg-card text-foreground shadow-card" : "text-muted-foreground"
                  }`}
                >
                  {m === "login" ? "Masuk" : "Daftar"}
                </button>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {mode === "login" ? "Masuk ke RentSafe" : "Buat akun RentSafe"}
            </h1>
            <p className="text-muted-foreground mb-8 text-pretty">
              {mode === "login"
                ? "Gunakan email atau wallet Solana untuk melanjutkan."
                : "Daftar sekali, gunakan wallet sebagai identitas Web3 Anda."}
            </p>

            {/* Role selector */}
            <div className="mb-6">
              <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                Pilih Peran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => {
                  const Active = role === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        Active
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:border-foreground/20"
                      }`}
                    >
                      <r.icon className={`size-4 mb-2 ${Active ? "text-primary" : "text-muted-foreground"}`} />
                      <div className="text-sm font-semibold">{r.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{r.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wallet connect */}
            <div className="mb-6 p-4 rounded-xl bg-ink text-ink-foreground">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold">Identitas Web3</div>
                  <div className="text-xs text-white/60">
                    {connected ? `Wallet terhubung: ${shortAddress}` : "Hubungkan wallet untuk autentikasi"}
                  </div>
                </div>
                {connected ? (
                  <CheckCircle2 className="size-5 text-success" />
                ) : (
                  <Wallet className="size-5 text-white/40" />
                )}
              </div>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-semibold transition-colors"
              >
                {connected ? "Ganti Wallet" : "Hubungkan Phantom / Solflare / Backpack / WalletConnect"}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "register" && (
                <Field icon={User} label="Nama Lengkap" type="text" placeholder="Budi Setiawan" />
              )}
              <Field
                icon={Mail}
                label={mode === "login" ? "Email atau Wallet Address" : "Email"}
                type="text"
                placeholder="anda@email.com"
              />
              {mode === "register" && (
                <Field icon={Phone} label="Nomor Telepon" type="tel" placeholder="+62 812 ..." />
              )}
              <Field icon={Lock} label="Password" type="password" placeholder="••••••••" />
              {mode === "register" && (
                <Field icon={Lock} label="Konfirmasi Password" type="password" placeholder="••••••••" />
              )}

              {mode === "register" && role === "owner" && (
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                    Upload Dokumen Identitas
                  </label>
                  <label className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border bg-secondary/40 cursor-pointer hover:bg-secondary transition-colors">
                    <Upload className="size-4 text-muted-foreground" />
                    <span className="text-sm">KTP / SIM / Sertifikat Properti</span>
                    <input type="file" accept="image/*,application/pdf" className="hidden" />
                  </label>
                </div>
              )}

              {mode === "login" && (
                <div className="flex items-center justify-between text-sm pt-1">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="rounded border-border" />
                    Remember me
                  </label>
                  <a href="#" className="text-primary font-medium">Lupa password?</a>
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-95 transition-opacity shadow-glow"
              >
                {mode === "login" ? "Masuk" : "Buat Akun"}
                <ArrowRight className="size-4" />
              </button>

              <p className="text-center text-sm text-muted-foreground pt-2">
                {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-primary font-semibold"
                >
                  {mode === "login" ? "Daftar sekarang" : "Masuk di sini"}
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Right: visual panel */}
        <div className="hidden lg:block relative bg-ink text-ink-foreground overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 70% 30%, oklch(0.58 0.18 250 / 0.6), transparent 55%), radial-gradient(circle at 20% 80%, oklch(0.72 0.17 158 / 0.3), transparent 50%)",
            }}
          />
          <div className="relative h-full flex flex-col justify-between p-12">
            <Link to="/" className="inline-flex items-center gap-2 w-fit">
              <div className="size-7 rounded-md bg-primary grid place-items-center">
                <Shield className="size-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-bold tracking-tight">RentSafe</span>
            </Link>

            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 mb-6">
                <span className="size-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
                  Solana Mainnet · Live
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-balance">
                Wallet Anda adalah identitas. Smart contract menjaga deposit.
              </h2>
              <p className="text-white/60 mb-8 text-pretty">
                Setiap login dengan wallet otomatis tersimpan ke profil Anda untuk verifikasi, tanda tangan
                kontrak, dan riwayat transaksi.
              </p>

              <div className="space-y-3">
                {[
                  { title: "Auto Reconnect", body: "Sekali connect, sesi tetap aktif lintas perangkat." },
                  { title: "Escrow On-Chain", body: "Deposit terkunci di Solana, transparan & anti-manipulasi." },
                  { title: "Reputation Score", body: "Reputasi Anda dihitung dari riwayat on-chain." },
                ].map((f) => (
                  <div key={f.title} className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                    <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">{f.title}</div>
                      <div className="text-xs text-white/60">{f.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-white/30">
              © 2025 RentSafe · NETWORK_ID: SOLANA_MAINNET_BETA
            </div>
          </div>
        </div>
      </div>
      {pickerOpen && <WalletPicker onClose={() => setPickerOpen(false)} onPick={onPickWallet} />}
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  ...props
}: { icon: typeof Mail; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          {...props}
          className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
        />
      </div>
    </div>
  );
}
