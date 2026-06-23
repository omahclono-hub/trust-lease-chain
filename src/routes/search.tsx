import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  SlidersHorizontal,
  CheckCircle2,
  Sparkles,
  X,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import {
  properties as ALL_PROPERTIES,
  cities,
  allAmenities,
  formatIDR,
  shortenAddress,
  type PropertyType,
} from "@/lib/mock-data";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Cari Properti — RentSafe" },
      { name: "description", content: "Cari kos & kontrakan terverifikasi blockchain di seluruh Indonesia." },
    ],
  }),
  component: SearchPage,
});

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

const TYPES: { id: PropertyType; label: string }[] = [
  { id: "kos", label: "Kos" },
  { id: "kontrakan", label: "Kontrakan" },
  { id: "apartemen", label: "Apartemen" },
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string | "all">("all");
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [priceMax, setPriceMax] = useState(10_000_000);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(true);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggle = <T,>(arr: T[], v: T): T[] =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const filtered = useMemo(() => {
    let list = ALL_PROPERTIES.filter((p) => {
      if (query && !`${p.title} ${p.city} ${p.area}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (city !== "all" && p.city !== city) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (p.pricePerMonth > priceMax) return false;
      if (p.rating < minRating) return false;
      if (verifiedOnly && !p.verifiedOnChain) return false;
      if (availableOnly && !p.available) return false;
      if (amenities.length && !amenities.every((a) => p.amenities.includes(a))) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.pricePerMonth - b.pricePerMonth);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.pricePerMonth - a.pricePerMonth);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [query, city, types, priceMax, minRating, verifiedOnly, availableOnly, amenities, sort]);

  const FilterPanel = (
    <div className="space-y-6">
      <FilterGroup label="Lokasi">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value as any)}
          className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm"
        >
          <option value="all">Semua kota</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Tipe Properti">
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => {
            const on = types.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => setTypes((s) => toggle(s, t.id))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  on
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-foreground/20"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup label={`Harga Maksimum: ${formatIDR(priceMax)} / bln`}>
        <input
          type="range"
          min={1_000_000}
          max={10_000_000}
          step={500_000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </FilterGroup>

      <FilterGroup label={`Rating Minimum: ${minRating.toFixed(1)}★`}>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </FilterGroup>

      <FilterGroup label="Fasilitas">
        <div className="flex flex-wrap gap-1.5">
          {allAmenities.map((a) => {
            const on = amenities.includes(a);
            return (
              <button
                key={a}
                onClick={() => setAmenities((s) => toggle(s, a))}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
                  on
                    ? "bg-secondary border-foreground/20 text-foreground"
                    : "bg-card border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup label="Status">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="accent-primary"
          />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-success" />
            Hanya Verified On-Chain
          </span>
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
            className="accent-primary"
          />
          Hanya tersedia sekarang
        </label>
      </FilterGroup>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Search bar */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-5 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berdasarkan nama, kota, atau area…"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <button
            onClick={() => setSheetOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 rounded-xl border border-border bg-card font-medium"
          >
            <SlidersHorizontal className="size-4" /> Filter
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar filters */}
        <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <h2 className="font-semibold mb-5">Filter Pencarian</h2>
          {FilterPanel}
        </aside>

        {/* Results */}
        <main>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Properti Tersedia</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Menampilkan <strong className="text-foreground">{filtered.length}</strong> dari {ALL_PROPERTIES.length} properti
              </p>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium"
            >
              <option value="recommended">Rekomendasi</option>
              <option value="price-asc">Harga: Terendah</option>
              <option value="price-desc">Harga: Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-border">
              <p className="text-muted-foreground">Tidak ada properti yang cocok dengan filter Anda.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  to="/property/$id"
                  params={{ id: p.id }}
                  className="group rounded-2xl overflow-hidden bg-card ring-1 ring-border hover:ring-primary/30 hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      width={800}
                      height={640}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {p.verifiedOnChain && (
                        <span className="px-2 py-1 rounded-md bg-background/90 backdrop-blur flex items-center gap-1.5 ring-1 ring-border">
                          <span className="size-1.5 rounded-full bg-success" />
                          <span className="text-[10px] font-mono font-bold tracking-tighter">VERIFIED</span>
                        </span>
                      )}
                      {!p.available && (
                        <span className="px-2 py-1 rounded-md bg-foreground/90 text-background text-[10px] font-mono font-bold">
                          FULL
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0">
                        <h3 className="font-bold truncate">{p.title}</h3>
                        <div className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="size-3.5 shrink-0" /> <span className="truncate">{p.area}, {p.city}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm shrink-0">
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{p.rating}</span>
                        <span className="text-muted-foreground">({p.reviews})</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex items-end justify-between">
                      <div>
                        <div className="font-bold">{formatIDR(p.pricePerMonth)} <span className="text-muted-foreground text-xs font-normal">/bln</span></div>
                        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">≈ {p.priceSol} SOL</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-muted-foreground">
                          {shortenAddress(p.owner.wallet)}
                        </div>
                        <div className="inline-flex items-center gap-1 text-[10px] mt-0.5 font-semibold text-primary">
                          <Sparkles className="size-3" /> Rep {p.owner.reputation}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-center text-sm font-semibold text-primary group-hover:underline">
                      Lihat Detail →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter sheet */}
      {sheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm">
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-background p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold">Filter</h2>
              <button onClick={() => setSheetOpen(false)} className="size-8 grid place-items-center rounded-md hover:bg-secondary">
                <X className="size-4" />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setSheetOpen(false)}
              className="mt-8 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
            >
              Terapkan ({filtered.length} hasil)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2.5">{label}</h3>
      {children}
    </div>
  );
}
