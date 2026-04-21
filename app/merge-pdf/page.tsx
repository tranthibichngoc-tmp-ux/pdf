"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string>("");

  const handleMerge = async () => {
    if (files.length < 2) return;
    setProcessing(true);
    setDone(false);
    
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      }
      
      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Failed to merge PDFs");
    }
    setProcessing(false);
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = "merged.pdf";
    a.click();
  };

  return (
    <div className="container-narrow py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">Merge PDF</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Combine multiple PDFs into a single document. All processing happens locally.</p>
        </div>

        <div className="card p-6 md:p-8">
          <UploadZone accept=".pdf" multiple={true} onFiles={setFiles} />
          
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleMerge}
              disabled={files.length < 2 || processing}
              className="btn-primary h-11 px-6"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Merging...
                </>
              ) : (
                `Merge ${files.length} PDFs`
              )}
            </button>
            {done && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Ready
              </div>
            )}
          </div>

          {done && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-emerald-900 dark:text-emerald-100">Your merged PDF is ready</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">Processed locally — {files.length} files combined</p>
                </div>
                <button className="btn-secondary" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}