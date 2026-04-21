"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

export default function PdfToWord() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setDone(false);
    
    try {
      const pdfjsLib = await import('pdfjs-dist');
      // @ts-ignore
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@5.6.205/build/pdf.worker.min.mjs`;
      const { Document, Packer, Paragraph, TextRun } = await import('docx');
      
      const file = files[0];
      const bytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      
      const paragraphs = [];
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: pageText, size: 24 })],
            spacing: { after: 200 }
          })
        );
        
        if (i < pdf.numPages) {
          paragraphs.push(new Paragraph({ children: [new TextRun({ text: '', break: 1 })] }));
        }
      }
      
      const doc = new Document({
        sections: [{ children: paragraphs }]
      });
      
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Failed to convert PDF to Word");
    }
    setProcessing(false);
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = files[0].name.replace(/\.pdf$/i, '.docx');
    a.click();
  };

  return (
    <div className="container-narrow py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">PDF to Word</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Convert PDF to editable Word DOCX. All processing happens locally.</p>
        </div>
        <div className="card p-6 md:p-8">
          <UploadZone accept=".pdf" multiple={false} onFiles={setFiles} />
          <div className="mt-6 flex items-center gap-3">
            <button onClick={handleConvert} disabled={files.length === 0 || processing} className="btn-primary h-11 px-6">
              {processing ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Converting...</>) : "Convert to Word"}
            </button>
            {done && <div className="flex items-center gap-2 text-emerald-600 text-sm"><CheckCircle2 className="h-4 w-4" />Ready</div>}
          </div>
          {done && downloadUrl && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Your DOCX is ready</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">Text extracted from PDF</p>
                </div>
                <button className="btn-secondary" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
