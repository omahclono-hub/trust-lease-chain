import { Link } from "@tanstack/react-router";
import { Shield, Wallet, Menu, X, LogOut, Copy, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useWallet, WALLETS, type WalletId } from "@/lib/wallet";
import { toast } from "sonner";

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-primary grid place-items-center shadow-glow">
              <Shield className="size-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-bold tracking-tight text-base">RentSafe</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/search" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              Cari Properti
            </Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              Dashboard
            </Link>
            <Link to="/auth" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              Masuk
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <WalletButton />
          <button
            className="md:hidden size-9 grid place-items-center rounded-lg border border-border"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-3 text-sm font-medium">
            <Link to="/search" onClick={() => setMenuOpen(false)}>Cari Properti</Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/auth" onClick={() => setMenuOpen(false)}>Masuk</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function WalletButton() {
  const { connected, connecting, walletId, shortAddress, address, connect, disconnect } = useWallet();
  const [open, setOpen] = useState(false);

  if (connected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors"
        >
          <div className="size-2 rounded-full bg-success" />
          <span className="font-mono text-xs font-semibold">{shortAddress}</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
            {walletId}
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-card border border-border shadow-card overflow-hidden z-50">
              <div className="p-4 border-b border-border">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Connected · {walletId}
                </div>
                <div className="font-mono text-xs break-all">{address}</div>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    toast.success("Alamat disalin");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-secondary text-left"
                >
                  <Copy className="size-4" /> Salin alamat
                </button>
                <button
                  onClick={() => {
                    disconnect();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-secondary text-left text-destructive"
                >
                  <LogOut className="size-4" /> Disconnect
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        disabled={connecting}
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        <Wallet className="size-4" />
        <span className="hidden sm:inline">{connecting ? "Menghubungkan…" : "Hubungkan Wallet"}</span>
      </button>
      {open && <WalletPicker onClose={() => setOpen(false)} onPick={(id) => { connect(id); setOpen(false); }} />}
    </div>
  );
}

export function WalletPicker({
  onClose,
  onPick,
}: {
  onClose: () => void;
  onPick: (id: WalletId) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-card overflow-hidden animate-fade-up">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-bold">Hubungkan Wallet</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Pilih wallet Solana untuk masuk</p>
          </div>
          <button onClick={onClose} className="size-8 grid place-items-center rounded-md hover:bg-secondary">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-3 space-y-1.5">
          {WALLETS.map((w) => {
            const installed = w.detect ? w.detect() : true;
            return (
              <button
                key={w.id}
                onClick={() => onPick(w.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary text-left transition-colors"
              >
                <div className="size-10 rounded-lg bg-gradient-to-br from-primary/20 to-success/20 grid place-items-center text-primary font-bold">
                  {w.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{w.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{w.tagline}</div>
                </div>
                {w.detect && (
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md ${installed ? "text-success bg-success/10" : "text-muted-foreground bg-secondary"}`}>
                    {installed ? "Detected" : "Install"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="px-5 py-3 border-t border-border text-[11px] text-muted-foreground">
          Wallet Anda otomatis tersimpan ke profil sebagai identitas Web3.
        </div>
      </div>
    </div>
  );
}
