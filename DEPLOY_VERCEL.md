# Deploy ke Vercel

Project ini sudah disiapkan untuk deploy ke Vercel dengan aman.

## Yang sudah dikonfigurasi

- **`vercel.json`** — `NITRO_PRESET=vercel`, build pakai `bun run build`, output `.vercel/output` (Build Output API v3, otomatis dipakai Vercel).
- **`vite.config.ts`** — saat `VERCEL=1` (otomatis di-set Vercel) atau `NITRO_PRESET=vercel`, Nitro build memakai preset `vercel`. Build lokal/Lovable tetap pakai Cloudflare seperti semula.
- SSR entry tetap `src/server.ts` (error wrapper).

## Langkah deploy

1. Push repo ke GitHub/GitLab/Bitbucket.
2. Di Vercel: **Add New Project** → import repo. Framework: **Other** (biarkan auto, `vercel.json` yang mengontrol).
3. **Environment Variables** — tambahkan SEMUA secret yang dipakai server functions (jangan commit ke repo):
   - Kalau pakai Lovable Cloud / Supabase: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only, JANGAN expose ke client), `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.
   - Secret runtime lain: tambah dengan prefix sesuai pemakaian. `VITE_*` = boleh terlihat di browser. Tanpa `VITE_` = server-only.
4. Deploy. Vercel akan menjalankan `bun install` lalu `bun run build`, dan Nitro menghasilkan Vercel Functions di `.vercel/output`.

## Checklist keamanan

- ❌ Jangan taruh service role / secret key di variable `VITE_*` — semua `VITE_*` ter-bundle ke client.
- ✅ Server functions (`createServerFn`) dan route `src/routes/api/**` membaca `process.env.*` hanya di sisi server.
- ✅ Webhook publik di `src/routes/api/public/**` — selalu verifikasi signature sebelum memproses payload.
- ✅ Pastikan RLS aktif di tabel Supabase; gunakan `requireSupabaseAuth` middleware untuk server function yang butuh user.
- ✅ Aktifkan **Deployment Protection** di Vercel untuk preview branch jika belum siap publik.
