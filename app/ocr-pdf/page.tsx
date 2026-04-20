import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "OCR PDF - Make scanned PDFs searchable",
  description: "Convert scanned PDFs to searchable text with OCR. Free and private.",
};

export default function OCRPDF() {
  return (
    <ToolPage
      title="OCR PDF"
      description="Make scanned documents searchable and selectable. Runs locally."
      accept=".pdf,image/*"
      actionLabel="Run OCR"
      options={
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Language</label>
            <select className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2">
              <option>English</option>
              <option>Vietnamese</option>
              <option>Chinese</option>
              <option>Auto-detect</option>
            </select>
          </div>
        </div>
      }
    />
  );
}