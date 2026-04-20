import ToolPage from "@/components/ToolPage";
export const metadata = { title: "Extract Pages — FreePDF" };
export default function Page() {
  return <ToolPage title="Extract Pages" description="Extract specific pages into a new PDF." actionLabel="Extract" options={<input placeholder="Pages: e.g., 1-3, 7" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />} />;
}
