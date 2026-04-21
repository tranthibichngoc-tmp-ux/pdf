"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import { Download, Loader2, CheckCircle2, Archive } from "lucide-react";

export default function PdfToPng() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [outputUrls, setOutputUrls] = useState<string[]>([]);
  const [blobs, setBlobs] = useState<Blob[]>([]);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setDone(false);
    setOutputUrls([]);
    setBlobs([]);
    
    try {
      const pdfjsLib = await import('pdfjs-dist');
      // @ts-ignore
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@5.6.205/build/pdf.worker.min.mjs`;
      
      const file = files[0];
      const bytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const urls: string[] = [];
      const newBlobs: Blob[] = [];
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({ canvasContext: context, viewport, canvas }).promise;
        
        const blob = await new Promise<Blob>(resolve => canvas.toBlob(b => resolve(b!), 'image/png'));
        newBlobs.push(blob);
        const url = URL.createObjectURL(blob);
        urls.push(url);
      }
      
      setBlobs(newBlobs);
      setOutputUrls(urls);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Failed to convert PDF. Please try another file.");
    }
    setProcessing(false);
  };

  const handleDownload = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `page-${index + 1}.png`;
    a.click();
  };

  const handleDownloadAll = async () => {
    if (blobs.length === 0) return;
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    blobs.forEach((blob, i) => {
      zip.file(`page-${i + 1}.png`, blob);
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pdf-pages.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-narrow py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">PDF to PNG</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Convert PDF pages to PNG images. All processing happens locally.</p>
        </div>
        <div className="card p-6 md:p-8">
          <UploadZone accept=".pdf" multiple={false} onFiles={setFiles} />
          <div className="mt-6 flex items-center gap-3">
            <button onClick={handleConvert} disabled={files.length === 0 || processing} className="btn-primary h-11 px-6">
              {processing ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Converting...</>) : "Convert to PNG"}
            </button>
            {done && <div className="flex items-center gap-2 text-emerald-600 text-sm"><CheckCircle2 className="h-4 w-4" />Ready</div>}
          </div>
          {done && outputUrls.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <p className="font-medium mb-3">Your images are ready ({outputUrls.length} pages)</p>
              <div className="space-y-2">
                {outputUrls.length > 1 && (
                  <button className="btn-primary w-full justify-start" onClick={handleDownloadAll}>
                    <Archive className="h-4 w-4 mr-2" />Download all as ZIP
                  </button>
                )}
                {outputUrls.map((url, i) => (
                  <button key={i} className="btn-secondary w-full justify-start" onClick={() => handleDownload(url, i)}>
                    <Download className="h-4 w-4 mr-2" />Download page {i + 1}.png
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}