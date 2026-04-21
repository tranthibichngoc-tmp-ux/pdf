"use client";

import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2 } from "lucide-react";

export default function RotatePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [angle, setAngle] = useState(90);

  const handleRotate = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      pdf.getPages().forEach(page => {
        page.setRotation(degrees(angle));
      });
      const newBytes = await pdf.save();
      const blob = new Blob([newBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setOutput(URL.createObjectURL(blob));
    } catch (e) {
      alert("Failed to rotate");
    }
    setProcessing(false);
  };

  return (
    <div className="container-narrow py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-2">Rotate PDF</h1>
      <p className="text-center text-slate-600 mb-8">Rotate all pages</p>
      <div className="card p-6">
        <UploadZone accept=".pdf" onFiles={f => setFile(f[0]||null)} />
        <div className="mt-4 flex gap-2">
          {[90,180,270].map(a => (
            <button key={a} onClick={() => setAngle(a)} className={`px-4 py-2 rounded-lg border ${angle===a?'bg-brand-600 text-white':'bg-white dark:bg-slate-900'}`}>{a}°</button>
          ))}
        </div>
        <button onClick={handleRotate} disabled={!file||processing} className="btn-primary mt-6">
          {processing ? <><Loader2 className="h-4 w-4 mr-2 animate-spin"/>Rotating...</> : "Rotate"}
        </button>
        {output && <a href={output} download="rotated.pdf" className="btn-secondary mt-4 inline-flex"><Download className="h-4 w-4 mr-2"/>Download</a>}
      </div>
    </div>
  );
}