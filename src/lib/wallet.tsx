import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

export type WalletId = "phantom" | "solflare" | "backpack" | "walletconnect";

export interface WalletInfo {
  id: WalletId;
  name: string;
  tagline: string;
  detect?: () => boolean;
}

export const WALLETS: WalletInfo[] = [
  {
    id: "phantom",
    name: "Phantom",
    tagline: "Wallet Solana paling populer",
    detect: () =>
      typeof window !== "undefined" &&
      Boolean((window as any).phantom?.solana?.isPhantom),
  },
  {
    id: "solflare",
    name: "Solflare",
    tagline: "Web wallet resmi Solana",
    detect: () =>
      typeof window !== "undefined" && Boolean((window as any).solflare?.isSolflare),
  },
  {
    id: "backpack",
    name: "Backpack",
    tagline: "Multichain xNFT wallet",
    detect: () =>
      typeof window !== "undefined" && Boolean((window as any).backpack?.isBackpack),
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    tagline: "Hubungkan wallet mobile via QR",
  },
];

interface WalletState {
  connected: boolean;
  connecting: boolean;
  walletId: WalletId | null;
  address: string | null;
  shortAddress: string | null;
  connect: (id: WalletId) => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletState | null>(null);

const STORAGE_KEY = "rentsafe.wallet";

function shorten(addr: string | null): string | null {
  if (!addr) return null;
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

function getProvider(id: WalletId): any | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  switch (id) {
    case "phantom":
      return w.phantom?.solana ?? null;
    case "solflare":
      return w.solflare ?? null;
    case "backpack":
      return w.backpack ?? null;
    default:
      return null;
  }
}

/** Generate a deterministic mock pubkey for demos (e.g. WalletConnect path). */
function mockAddress(seed: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  let out = "";
  for (let i = 0; i < 44; i++) {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    out += chars[hash % chars.length];
  }
  return out;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletId, setWalletId] = useState<WalletId | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const persist = useCallback((id: WalletId | null, addr: string | null) => {
    if (typeof window === "undefined") return;
    if (id && addr) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ id, addr }));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const connect = useCallback(
    async (id: WalletId) => {
      setConnecting(true);
      try {
        let addr: string | null = null;
        if (id === "walletconnect") {
          // WalletConnect requires its own UI; in this build we simulate a session.
          await new Promise((r) => setTimeout(r, 600));
          addr = mockAddress(`wc:${Date.now()}`);
        } else {
          const provider = getProvider(id);
          if (!provider) {
            toast.error(`${WALLETS.find((w) => w.id === id)?.name} tidak terdeteksi`, {
              description: "Install ekstensi wallet-nya lalu coba lagi.",
            });
            return;
          }
          const res = await provider.connect();
          addr = res?.publicKey?.toString?.() ?? provider.publicKey?.toString?.() ?? null;
          if (!addr) throw new Error("Tidak dapat membaca public key");
        }
        setWalletId(id);
        setAddress(addr);
        persist(id, addr);
        toast.success("Wallet terhubung", {
          description: shorten(addr) ?? undefined,
        });
      } catch (e: any) {
        toast.error("Gagal menghubungkan wallet", {
          description: e?.message ?? "Permintaan ditolak",
        });
      } finally {
        setConnecting(false);
      }
    },
    [persist],
  );

  const disconnect = useCallback(() => {
    if (walletId && walletId !== "walletconnect") {
      const provider = getProvider(walletId);
      provider?.disconnect?.().catch(() => undefined);
    }
    setWalletId(null);
    setAddress(null);
    persist(null, null);
    toast("Wallet terputus");
  }, [walletId, persist]);

  // Auto-reconnect on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const { id, addr } = JSON.parse(raw) as { id: WalletId; addr: string };
      if (id === "walletconnect") {
        setWalletId(id);
        setAddress(addr);
        return;
      }
      const provider = getProvider(id);
      if (!provider) return;
      provider
        .connect({ onlyIfTrusted: true })
        .then((res: any) => {
          const pk = res?.publicKey?.toString?.() ?? provider.publicKey?.toString?.() ?? addr;
          setWalletId(id);
          setAddress(pk);
        })
        .catch(() => undefined);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<WalletState>(
    () => ({
      connected: Boolean(address),
      connecting,
      walletId,
      address,
      shortAddress: shorten(address),
      connect,
      disconnect,
    }),
    [address, connecting, walletId, connect, disconnect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletState {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
