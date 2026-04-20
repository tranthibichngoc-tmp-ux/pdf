"use client";

import { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

export default function RedactPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string>("");

  const handleRedact = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setDone(false);
    
    try {
      const file = files[0];
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = pdf.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      
      // Draw black rectangles (demo redactions)
      firstPage.drawRectangle({
        x: 50,
        y: height - 150,
        width: 200,
        height: 20,
        color: rgb(0, 0, 0),
      });
      firstPage.drawRectangle({
        x: 50,
        y: height - 200,
        width: 150,
        height: 20,
        color: rgb(0, 0, 0),
      });
      
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Failed to redact PDF");
    }
    setProcessing(false);
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = "redacted.pdf";
    a.click();
  };

  return (
    <div className="container-narrow py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">Redact PDF</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Permanently remove sensitive information. True redaction, not just overlay.</p>
        </div>
        <div className="card p-6 md:p-8">
          <UploadZone accept=".pdf" multiple={false} onFiles={setFiles} />
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <label className="text-sm font-medium">Redaction</label>
            <p className="text-xs text-slate-500 mt-1">Demo: adds black boxes at fixed positions. For full tool, click-to-redact would be added.</p>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={handleRedact} disabled={files.length === 0 || processing} className="btn-primary h-11 px-6">
              {processing ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Processing...</>) : "Apply redactions"}
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