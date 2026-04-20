"use client";

import { useState } from "react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

export default function WatermarkPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");

  const handleWatermark = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setDone(false);
    
    try {
      const file = files[0];
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = pdf.getPages();
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      
      pages.forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(watermarkText, {
          x: width / 2 - 100,
          y: height / 2,
          size: 48,
          font,
          color: rgb(0.8, 0.8, 0.8),
          rotate: degrees(-45),
          opacity: 0.3,
        });
      });
      
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Failed to add watermark");
    }
    setProcessing(false);
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = "watermarked.pdf";
    a.click();
  };

  return (
    <div className="container-narrow py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">Watermark PDF</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Add text watermark to all pages.</p>
        </div>
        <div className="card p-6 md:p-8">
          <UploadZone accept=".pdf" multiple={false} onFiles={setFiles} />
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <label className="text-sm font-medium">Watermark text</label>
            <input value={watermarkText} onChange={e=>setWatermarkText(e.target.value)} className="mt-1 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={handleWatermark} disabled={files.length === 0 || processing} className="btn-primary h-11 px-6">
              {processing ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Processing...</>) : "Add Watermark"}
            </button>
            {done && <div className="flex items-center gap-2 text-emerald-600 text-sm"><CheckCircle2 className="h-4 w-4" />Ready</div>}
          </div>
          {done && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center justify-between">
                <div><p className="font-medium">Your file is ready</p><p className="text-sm text-emerald-700 dark:text-emerald-300">Processed locally</p></div>
                <button className="btn-secondary" onClick={handleDownload}><Download className="h-4 w-4 mr-2" />Download</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}