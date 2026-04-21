"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function WordToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setDone(false);
    
    try {
      const mammoth = await import('mammoth');
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;
      
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;
      const lineHeight = 14;
      const margin = 50;
      
      let page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      let y = height - margin;
      
      const lines = text.split(/\n/);
      for (const line of lines) {
        const words = line.split(' ');
        let currentLine = '';
        
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);
          
          if (testWidth > width - 2 * margin) {
            if (y < margin + lineHeight) {
              page = pdfDoc.addPage();
              y = height - margin;
            }
            page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
            y -= lineHeight;
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        
        if (currentLine) {
          if (y < margin + lineHeight) {
            page = pdfDoc.addPage();
            y = height - margin;
          }
          page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
          y -= lineHeight;
        }
        y -= lineHeight * 0.5;
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Failed to convert Word to PDF. Ensure it's a .docx file.");
    }
    setProcessing(false);
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = files[0].name.replace(/\.docx?$/i, '.pdf');
    a.click();
  };

  return (
    <div className="container-narrow py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">Word to PDF</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Convert DOCX to PDF. All processing happens locally.</p>
        </div>
        <div className="card p-6 md:p-8">
          <UploadZone accept=".docx" multiple={false} onFiles={setFiles} />
          <div className="mt-6 flex items-center gap-3">
            <button onClick={handleConvert} disabled={files.length === 0 || processing} className="btn-primary h-11 px-6">
              {processing ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Converting...</>) : "Convert to PDF"}
            </button>
            {done && <div className="flex items-center gap-2 text-emerald-600 text-sm"><CheckCircle2 className="h-4 w-4" />Ready</div>}
          </div>
          {done && downloadUrl && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Your PDF is ready</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">Converted locally</p>
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
