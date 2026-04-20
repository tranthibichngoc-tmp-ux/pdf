"use client";

import { useState } from "react";
import UploadZone from "./UploadZone";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

export default function ToolPage({
  title,
  description,
  accept = ".pdf",
  multiple = false,
  actionLabel = "Process",
  options,
}: {
  title: string;
  description: string;
  accept?: string;
  multiple?: boolean;
  actionLabel?: string;
  options?: React.ReactNode;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleProcess = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setDone(false);
    // Mock processing
    await new Promise(r => setTimeout(r, 1800));
    setProcessing(false);
    setDone(true);
  };

  const handleDownload = () => {
    if (files.length === 0) return;
    // For demo: download the first file (in real app, this would be processed output)
    const file = files[0];
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = `processed-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-narrow py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{description}</p>
        </div>

        <div className="card p-6 md:p-8">
          <UploadZone accept={accept} multiple={multiple} onFiles={setFiles} />
          
          {options && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              {options}
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleProcess}
              disabled={files.length === 0 || processing}
              className="btn-primary h-11 px-6"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                actionLabel
              )}
            </button>
            {done && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Ready to download
              </div>
            )}
          </div>

          {done && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-emerald-900 dark:text-emerald-100">Your file is ready</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">Processed locally — no upload</p>
                </div>
                <button className="btn-secondary" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-1">Private by design</h3>
            <p className="text-slate-600 dark:text-slate-400">Files are processed in your browser using WebAssembly. Nothing leaves your device.</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">No limits</h3>
            <p className="text-slate-600 dark:text-slate-400">Use as much as you want. No accounts, no watermarks.</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Works everywhere</h3>
            <p className="text-slate-600 dark:text-slate-400">Desktop, tablet, and mobile. Modern browsers supported.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
