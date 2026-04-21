"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2 } from "lucide-react";

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pages, setPages] = useState<{url: string, name: string}[]>([]);

  const handleSplit = async () => {
    if (!file) return;
    setProcessing(true);
    setPages([]);
    
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pageCount = pdf.getPageCount();
      const results = [];
      
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);
        const newBytes = await newPdf.save();
        const blob = new Blob([newBytes.buffer as ArrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        results.push({ url, name: `page-${i+1}.pdf` });
      }
      setPages(results);
    } catch (e) {
      alert("Failed to split PDF");
    }
    setProcessing(false);
  };

  return (
    <div className="container-narrow py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-2">Split PDF</h1>
      <p className="text-center text-slate-600 dark:text-slate-300 mb-8">Extract every page as separate PDF</p>
      
      <div className="card p-6">
        <UploadZone accept=".pdf" onFiles={files => setFile(files[0] || null)} />
        <button onClick={handleSplit} disabled={!file || processing} className="btn-primary mt-6 h-11 px-6">
          {processing ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Splitting...</> : "Split PDF"}
        </button>
        
        {pages.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="font-medium">Split into {pages.length} files:</p>
            {pages.map(p => (
              <a key={p.name} href={p.url} download={p.name} className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800">
                <span className="text-sm">{p.name}</span>
                <Download className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}