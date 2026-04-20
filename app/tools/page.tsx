import Link from "next/link";
import { Merge, Split, Shrink, FileText, FileUp, Image } from "lucide-react";

export const metadata = {
  title: "All Tools",
  description: "Browse all free PDF tools.",
};

const allTools = [
  { href: "/merge-pdf", name: "Merge PDF" },
  { href: "/split-pdf", name: "Split PDF" },
  { href: "/compress-pdf", name: "Compress PDF" },
  { href: "/edit-pdf", name: "Edit PDF" },
  { href: "/ocr-pdf", name: "OCR PDF" },
  { href: "/redact-pdf", name: "Redact PDF" },
  { href: "/fill-sign", name: "Fill and Sign" },
  { href: "/pdf-to-word", name: "PDF to Word" },
  { href: "/word-to-pdf", name: "Word to PDF" },
];

export default function Tools() {
  return (
    <div className="container-narrow py-16">
      <h1 className="text-3xl font-semibold mb-8">All PDF Tools</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTools.map(t => (
          <Link key={t.href} href={t.href} className="card p-5 hover:shadow-md transition-shadow">
            <h3 className="font-medium">{t.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}