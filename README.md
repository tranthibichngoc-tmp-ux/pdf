# Free PDF Tools — Next.js 14 SaaS

Production-ready PDF tools website. 100% free, no paywalls.

**Headline:** "Free PDF tools that other websites charge for"

## Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (blue/white/dark theme)
- lucide-react icons
- Client-side processing (mocked UI, ready for pdf-lib integration)

## Features
- 18 pages: Home + 17 tools
- Dark mode toggle (persists)
- Drag & drop upload zones
- Mock processing with instant download UI
- Fully responsive, modern SaaS design
- Privacy-first messaging

## Tools included
1. Merge PDF
2. Split PDF
3. Compress PDF
4. PDF to Word
5. Word to PDF
6. PDF to JPG
7. JPG to PDF
8. Rotate PDF
9. Delete Pages
10. Extract Pages
11. Protect PDF
12. Unlock PDF
13. Watermark PDF
14. PDF to PNG
15. PNG to PDF
16. Reorder Pages
17. Add Page Numbers

## Run locally
```bash
cd free-pdf-tools
npm install
npm run dev
```
Open http://localhost:3000

## Project structure
```
app/
  layout.tsx
  page.tsx (hero + tools grid)
  [tool]/page.tsx (17 tools)
components/
  Navbar.tsx
  Footer.tsx
  ToolCard.tsx
  UploadZone.tsx
  ToolPage.tsx
```

## Next steps
- Integrate pdf-lib or PDF.js for real processing
- Add WebAssembly workers for heavy operations
- Add analytics, SEO metadata per tool
# pdf
