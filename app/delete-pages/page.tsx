import ToolPage from "@/components/ToolPage";
export const metadata = { title: "Delete Pages — FreePDF" };
export default function Page() {
  return <ToolPage title="Delete Pages" description="Remove specific pages from your PDF." actionLabel="Delete Pages" options={<input placeholder="Pages to delete: e.g., 2, 4-6" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />} />;
}
