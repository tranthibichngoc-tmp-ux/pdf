"use client";

import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

export default function EditPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [text, setText] = useState("Sample Text");
  const [x, setX] = useState(50);
  const [y, setY] = useState(700);

  const handleEdit = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setDone(false);
    
    try {
      const file = files[0];
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = pdf.getPages();
      const firstPage = pages[0];
      
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      firstPage.drawText(text, {
        x: Number(x),
        y: Number(y),
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Failed to edit PDF");
    }
    setProcessing(false);
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = "edited.pdf";
    a.click();
  };

  return (
    <div className="container-narrow py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">Edit PDF</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Add text, images, and shapes to your PDF. All processing happens locally.</p>
        </div>

        <div className="card p-6 md:p-8">
          <UploadZone accept=".pdf" multiple={false} onFiles={setFiles} />
          
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <label className="text-sm font-medium">Text to add</label>
              <input value={text} onChange={e=>setText(e.target.value)} className="mt-1 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">X position</label>
                <input type="number" value={x} onChange={e=>setX(Number(e.target.value))} className="mt-1 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Y position</label>
                <input type="number" value={y} onChange={e=>setY(Number(e.target.value))} className="mt-1 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button onClick={handleEdit} disabled={files.length === 0 || processing} className="btn-primary h-11 px-6">
              {processing ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Processing...</>) : "Apply edits"}
            </button>
            {done && <div className="flex items-center gap-2 text-emerald-600 text-sm"><CheckCircle2 className="h-4 w-4" />Ready</div>}
          </div>

          {done && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center justify-between">
                <div><p className="font-medium text-emerald-900 dark:text-emerald-100">Your file is ready</p><p className="text-sm text-emerald-700 dark:text-emerald-300">Processed locally — no upload</p></div>
                <button className="btn-secondary" onClick={handleDownload}><Download className="h-4 w-4 mr-2" />Download</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}