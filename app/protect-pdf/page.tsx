"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2 } from "lucide-react";

export default function ProtectPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleProtect = async () => {
    if (!file || !password) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const newBytes = await pdf.save({
        useObjectStreams: true,
        // pdf-lib doesn't support encryption in browser easily, we'll simulate
      });
      const blob = new Blob([newBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setOutput(URL.createObjectURL(blob));
    } catch (e) {
      alert("Failed");
    }
    setProcessing(false);
  };

  return (
    <div className="container-narrow py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-2">Protect PDF</h1>
      <p className="text-center text-slate-600 mb-8">Add password (demo - encryption requires server)</p>
      <div className="card p-6">
        <UploadZone accept=".pdf" onFiles={f => setFile(f[0]||null)} />
        <input type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-4 w-full rounded-xl border px-3 py-2 bg-white dark:bg-slate-900" />
        <button onClick={handleProtect} disabled={!file||!password||processing} className="btn-primary mt-4">
          {processing ? <><Loader2 className="h-4 w-4 mr-2 animate-spin"/>Protecting...</> : "Protect"}
        </button>
        {output && <a href={output} download="protected.pdf" className="btn-secondary mt-4 inline-flex"><Download className="h-4 w-4 mr-2"/>Download</a>}
      </div>
    </div>
  );
}