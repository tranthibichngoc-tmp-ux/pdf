import ToolPage from "@/components/ToolPage";
export const metadata = { title: "Watermark PDF — FreePDF" };
export default function Page() {
  return <ToolPage title="Watermark PDF" description="Add text or image watermark to each page." actionLabel="Add Watermark" options={<div className="grid md:grid-cols-2 gap-3"><input placeholder="Watermark text" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" /><select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"><option>Bottom-right</option><option>Center</option><option>Top-left</option><option>Tiled</option></select></div>} />;
}
