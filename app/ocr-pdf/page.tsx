"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

export default function OCRPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("eng");
  const [progress, setProgress] = useState(0);

  const handleOCR = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setDone(false);
    setText("");
    setProgress(0);
    
    try {
      const Tesseract = (await import('tesseract.js')).default;
      const file = files[0];
      
      let imageData: string | File;
      
      if (file.type === 'application/pdf') {
        // Convert first page of PDF to image
        const pdfjsLib = await import('pdfjs-dist');
        // @ts-ignore
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@5.6.205/build/pdf.worker.min.mjs`;
        const bytes = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        imageData = canvas.toDataURL('image/png');
      } else {
        imageData = file;
      }
      
      const result = await Tesseract.recognize(imageData, language, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      
      setText(result.data.text);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("OCR failed. Try a clearer image or PDF.");
    }
    setProcessing(false);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = files[0].name.replace(/\.[^/.]+$/, '') + '-ocr.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-narrow py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">OCR PDF</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Make scanned documents searchable. Runs locally in your browser.</p>
        </div>
        <div className="card p-6 md:p-8">
          <UploadZone accept=".pdf,image/*" multiple={false} onFiles={setFiles} />
          <div className="mt-6">
            <label className="text-sm font-medium">Language</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
            >
              <option value="eng">English</option>
              <option value="vie">Vietnamese</option>
              <option value="chi_sim">Chinese (Simplified)</option>
              <option value="chi_tra">Chinese (Traditional)</option>
            </select>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={handleOCR} disabled={files.length === 0 || processing} className="btn-primary h-11 px-6">
              {processing ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />OCR {progress}%</>) : "Run OCR"}
            </button>
            {done && <div className="flex items-center gap-2 text-emerald-600 text-sm"><CheckCircle2 className="h-4 w-4" />Done</div>}
          </div>
          {done && text && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium">Extracted text</p>
                <button className="btn-secondary text-sm" onClick={handleDownload}>
                  <Download className="h-3 w-3 mr-1" />Download TXT
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-sm bg-white dark:bg-slate-900 p-3 rounded-lg max-h-60 overflow-auto">{text}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}