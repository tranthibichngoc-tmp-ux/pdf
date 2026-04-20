"use client";

import { useCallback, useState } from "react";
import { Upload, File, X, Check } from "lucide-react";
import clsx from "clsx";

export default function UploadZone({
  accept = ".pdf",
  multiple = false,
  onFiles,
}: {
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const arr = Array.from(fileList);
    setFiles(multiple ? arr : arr.slice(0,1));
    onFiles?.(arr);
  }, [multiple, onFiles]);

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={clsx(
          "relative card p-8 border-dashed transition-colors",
          dragOver ? "border-brand-500 bg-brand-50/50 dark:bg-brand-950/20" : "border-slate-300 dark:border-slate-700"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="text-center pointer-events-none">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          </div>
          <h3 className="font-medium">Drop files here</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">or click to browse — {accept.replace(/\./g, '').toUpperCase()}</p>
          <p className="text-xs text-slate-500 mt-3">Files never leave your device. Processed locally.</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 card">
              <div className="h-9 w-9 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                <File className="h-4 w-4 text-brand-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{f.name}</p>
                <p className="text-xs text-slate-500">{(f.size/1024/1024).toFixed(2)} MB</p>
              </div>
              <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="btn-ghost h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
