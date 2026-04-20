import ToolPage from "@/components/ToolPage";

export const metadata = { title: "Merge PDF — FreePDF" };

export default function Page() {
  return (
    <ToolPage
      title="Merge PDF"
      description="Combine multiple PDFs into a single document. Drag to reorder."
      accept=".pdf"
      multiple={true}
      actionLabel="Merge PDFs"
      options={
        <div className="flex items-center gap-4">
          <label className="text-sm">Sort order:</label>
          <select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm">
            <option>As uploaded</option>
            <option>A → Z</option>
            <option>Z → A</option>
          </select>
        </div>
      }
    />
  );
}
