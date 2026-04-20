"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2 } from "lucide-react";

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState<{url: string, size: number, originalSize: number} | null>(null);

  const handleCompress = async () => {
    if (!file) return;
    setProcessing(true);
    
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      // Re-save with default compression
      const compressedBytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([compressedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setOutput({
        url,
        size: compressedBytes.length,
        originalSize: file.size
      });
    } catch (e) {
      alert("Failed to compress");
    }
    setProcessing(false);
  };

  const savings = output ? Math.round((1 - output.size / output.originalSize) * 100) : 0;

  return (
    <div className="container-narrow py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-2">Compress PDF</h1>
      <p className="text-center text-slate-600 dark:text-slate-300 mb-8">Reduce file size locally</p>
      
      <div className="card p-6">
        <UploadZone accept=".pdf" onFiles={files => setFile(files[0] || null)} />
        <button onClick={handleCompress} disabled={!file || processing} className="btn-primary mt-6 h-11 px-6">
          {processing ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Compressing...</> : "Compress"}
        </button>
        
        {output && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Compressed successfully</p>
                <p className="text-sm text-slate-600">{(output.originalSize/1024).toFixed(1)}KB → {(output.size/1024).toFixed(1)}KB ({savings}% smaller)</p>
              </div>
              <a href={output.url} download="compressed.pdf" className="btn-secondary">
                <Download className="h-4 w-4 mr-2" />Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}