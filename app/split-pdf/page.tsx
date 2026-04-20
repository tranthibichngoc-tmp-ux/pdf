import ToolPage from "@/components/ToolPage";

export const metadata = { title: "Split PDF — FreePDF" };

export default function Page() {
  return (
    <ToolPage
      title="Split PDF"
      description="Extract pages or split a PDF into multiple files."
      actionLabel="Split PDF"
      options={
        <div className="space-y-3">
          <div>
            <label className="text-sm block mb-1">Split mode</label>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs">Extract pages</button>
              <button className="btn-ghost text-xs">Split every page</button>
              <button className="btn-ghost text-xs">By range</button>
            </div>
          </div>
          <input placeholder="e.g., 1-3, 5, 8-10" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
        </div>
      }
    />
  );
}
