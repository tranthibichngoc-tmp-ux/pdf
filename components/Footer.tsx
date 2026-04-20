import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="container-narrow py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-semibold mb-3">FreePDF</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Free PDF tools that other websites charge for. No signup, no watermarks.</p>
          </div>
          <div>
            <div className="font-medium mb-3 text-sm">Popular Tools</div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/merge-pdf" className="hover:text-brand-600">Merge PDF</Link></li>
              <li><Link href="/compress-pdf" className="hover:text-brand-600">Compress PDF</Link></li>
              <li><Link href="/pdf-to-word" className="hover:text-brand-600">PDF to Word</Link></li>
              <li><Link href="/split-pdf" className="hover:text-brand-600">Split PDF</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-3 text-sm">Convert</div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/jpg-to-pdf" className="hover:text-brand-600">JPG to PDF</Link></li>
              <li><Link href="/pdf-to-jpg" className="hover:text-brand-600">PDF to JPG</Link></li>
              <li><Link href="/word-to-pdf" className="hover:text-brand-600">Word to PDF</Link></li>
              <li><Link href="/pdf-to-png" className="hover:text-brand-600">PDF to PNG</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-3 text-sm">Company</div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/privacy" className="hover:text-brand-600">Privacy</Link></li>
              <li><Link href="/faq" className="hover:text-brand-600">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-brand-600">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500">
          <p>© {new Date().getFullYear()} FreePDF. All files processed locally in your browser.</p>
          <div className="flex gap-3">
            <a href="#" aria-label="Twitter" className="hover:text-slate-900 dark:hover:text-white"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-slate-900 dark:hover:text-white"><Github className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
