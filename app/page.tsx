import Link from "next/link";
import { 
  Merge, Split, Shrink, FileText, FileUp, Image as ImageIcon, 
  RotateCw, Scissors, Files, Lock, Unlock, Stamp, ImageDown, 
  FileImage, ArrowUpDown, Hash, ShieldCheck, Zap, Globe
} from "lucide-react";
import ToolCard from "@/components/ToolCard";

const tools = [
  { href: "/merge-pdf", title: "Merge PDF", description: "Combine multiple PDFs into one", Icon: Merge, badge: "Popular" },
  { href: "/split-pdf", title: "Split PDF", description: "Extract pages or split by range", Icon: Split },
  { href: "/compress-pdf", title: "Compress PDF", description: "Reduce file size without quality loss", Icon: Shrink, badge: "Popular" },
  { href: "/pdf-to-word", title: "PDF to Word", description: "Convert PDF to editable DOCX", Icon: FileText },
  { href: "/word-to-pdf", title: "Word to PDF", description: "Convert DOCX to PDF", Icon: FileUp },
  { href: "/pdf-to-jpg", title: "PDF to JPG", description: "Export each page as image", Icon: ImageIcon },
  { href: "/jpg-to-pdf", title: "JPG to PDF", description: "Images to PDF in seconds", Icon: FileImage },
  { href: "/rotate-pdf", title: "Rotate PDF", description: "Rotate pages 90°, 180°, 270°", Icon: RotateCw },
  { href: "/delete-pages", title: "Delete Pages", description: "Remove unwanted pages", Icon: Scissors },
  { href: "/extract-pages", title: "Extract Pages", description: "Pull specific pages out", Icon: Files },
  { href: "/protect-pdf", title: "Protect PDF", description: "Add password encryption", Icon: Lock },
  { href: "/unlock-pdf", title: "Unlock PDF", description: "Remove password (if known)", Icon: Unlock },
  { href: "/watermark-pdf", title: "Watermark PDF", description: "Add text or image watermark", Icon: Stamp },
  { href: "/pdf-to-png", title: "PDF to PNG", description: "High-quality PNG export", Icon: ImageDown },
  { href: "/png-to-pdf", title: "PNG to PDF", description: "Convert PNGs to PDF", Icon: FileImage },
  { href: "/reorder-pages", title: "Reorder Pages", description: "Drag and drop to reorder", Icon: ArrowUpDown },
  { href: "/add-page-numbers", title: "Add Page Numbers", description: "Insert page numbers easily", Icon: Hash },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white dark:from-brand-950/20 dark:to-slate-950" />
        <div className="container-narrow pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-xs mb-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-slate-600 dark:text-slate-300">100% free • No signup • Files stay private</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Free PDF tools <span className="text-slate-400">that other websites</span> charge for
            </h1>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              Merge, split, compress, convert, and edit PDFs right in your browser. No watermarks, no limits, no account required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/merge-pdf" className="btn-primary h-11 px-6 text-base">
                <Zap className="h-4 w-4 mr-2" />
                Start merging
              </Link>
              <Link href="#tools" className="btn-secondary h-11 px-6 text-base">
                Browse all tools
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> Works offline</div>
              <div>•</div>
              <div>Mobile friendly</div>
              <div>•</div>
              <div>Open source spirit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="container-narrow py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold">All PDF Tools</h2>
          <p className="text-sm text-slate-500">{tools.length} tools available</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((t) => (
            <ToolCard key={t.href} {...t} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container-narrow py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Privacy-first", desc: "Everything runs in your browser. Files never upload to our servers.", icon: ShieldCheck },
            { title: "Actually free", desc: "No paywalls, no daily limits, no watermarks. Ever.", icon: Zap },
            { title: "Blazing fast", desc: "Built with Next.js 14. Optimized for speed on desktop and mobile.", icon: Globe },
          ].map((f) => (
            <div key={f.title} className="card p-6">
              <div className="h-10 w-10 rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium mb-1">{f.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="container-narrow py-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Why choose us over typical PDF sites</h2>
        <div className="card overflow-hidden">
          <div className="grid grid-cols-3 text-sm font-medium bg-slate-50 dark:bg-slate-900 p-4 border-b">
            <div>Feature</div>
            <div className="text-center">FreePDF</div>
            <div className="text-center text-slate-500">Others</div>
          </div>
          {[
            ["No signup required", "✓", "✗"],
            ["No watermarks", "✓", "✗"],
            ["Files stay local", "✓", "✗"],
            ["Unlimited use", "✓", "✗ Paid"],
            ["No daily limits", "✓", "✗"],
          ].map(([feat, us, them]) => (
            <div key={feat} className="grid grid-cols-3 p-4 border-b last:border-0 text-sm">
              <div>{feat}</div>
              <div className="text-center text-emerald-600 font-medium">{us}</div>
              <div className="text-center text-slate-500">{them}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container-narrow py-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="h-12 w-12 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto mb-3 text-lg font-semibold">1</div>
            <h3 className="font-medium mb-1">Upload</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Drag and drop your PDF. Nothing uploads.</p>
          </div>
          <div>
            <div className="h-12 w-12 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto mb-3 text-lg font-semibold">2</div>
            <h3 className="font-medium mb-1">Process</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Edit, merge, or convert instantly in browser.</p>
          </div>
          <div>
            <div className="h-12 w-12 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto mb-3 text-lg font-semibold">3</div>
            <h3 className="font-medium mb-1">Download</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Get your file. No tracking, no storage.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
