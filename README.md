# CLOUSRY'S SPACE

Kisisel portfolyo sitesi. Bu repo; motion, post-produksiyon, gorsel tasarim ve video vitrinleri icin hazirlanmis modern, iki dilli ve tema uyumlu bir personal portfolio websitesi sunar.

## Genel Bakis

Proje; minimal duzen, yumusak cam efekti, responsive yerlesim ve gomulu video portfolyo alani etrafinda kuruldu. Ister dogrudan kullan, ister kendi islerine gore forkleyip duzenle.

## Ozellikler

- Turkce / Ingilizce dil destegi
- Sistem uyumlu light / dark tema
- Liquid glass arayuz detaylari
- Video slider portfolyo alani
- Sosyal baglanti bolumu
- Mobil uyumlu responsive tasarim

## Teknoloji Yigini

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Lokal Calistirma

```bash
npm install
npm run dev
```

Tarayicida `http://localhost:3000` adresini ac.

## Scriptler

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Klasor Yapisi

```txt
src/
  app/
  components/
    ui/
  lib/
public/
  social/
```

One cikan dosyalar:

- `src/components/site-page.tsx`: Sayfa kompozisyonu
- `src/components/navbar.tsx`: Ust navigasyon
- `src/components/showreel-placeholder.tsx`: Video slider alani
- `src/components/capabilities-grid.tsx`: Yetkinlik kartlari
- `src/components/footer-cta.tsx`: Iletisim ve footer bolumu
- `src/components/site-controls.tsx`: Dil ve tema kontrol paneli
- `src/lib/site-copy.ts`: Cift dil metinleri

## Ozellestirme

Bu yapi kolayca kisisellestirilebilir:

- `src/lib/site-copy.ts` icinden tum metinleri guncelleyebilirsin
- `public/social/` altindan sosyal ikonlari degistirebilirsin
- `src/components/showreel-placeholder.tsx` icinden video embed linklerini degistirebilirsin
- `src/app/globals.css` icinden tema ve yuzey stillerini yeniden sekillendirebilirsin

## Acik Kaynak Notu

Bu repo acik kaynak bir portfolyo referansi olarak duzenlendi. Istersen kendi islerine uyarlayabilir, gelistirebilir ve yeniden tasarlayabilirsin.
