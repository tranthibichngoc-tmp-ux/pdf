import ToolPage from "@/components/ToolPage";

export const metadata = { title: "PDF to JPG — FreePDF" };

export default function Page() {
  return (
    <ToolPage
      title="PDF to JPG"
      description="Convert each PDF page to JPG images."
      actionLabel="Convert to JPG"
      options={
        <div className="flex items-center gap-4">
          <label className="text-sm">Quality:</label>
          <select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      }
    />
  );
}
