"use client";

import Link from "next/link";
import { FileText, Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const tools = [
    { href: "/merge-pdf", label: "Merge" },
    { href: "/split-pdf", label: "Split" },
    { href: "/compress-pdf", label: "Compress" },
    { href: "/pdf-to-word", label: "PDF to Word" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/70 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="container-narrow">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-lg">FreePDF</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {tools.map(t => (
              <Link key={t.href} href={t.href} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                {t.label}
              </Link>
            ))}
            <Link href="/#tools" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">All Tools</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="btn-ghost h-9 w-9 p-0" aria-label="Toggle theme">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="md:hidden btn-ghost h-9 w-9 p-0" onClick={() => setOpen(!open)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800">
          <div className="container-narrow py-3 flex flex-col gap-3">
            {tools.map(t => (
              <Link key={t.href} href={t.href} className="py-1" onClick={() => setOpen(false)}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
