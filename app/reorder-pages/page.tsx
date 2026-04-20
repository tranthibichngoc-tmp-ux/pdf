import ToolPage from "@/components/ToolPage";
export const metadata = { title: "Reorder Pages — FreePDF" };
export default function Page() {
  return <ToolPage title="Reorder Pages" description="Drag and drop to reorder PDF pages visually." actionLabel="Save Order" options={<p className="text-sm text-slate-600 dark:text-slate-400">After upload, drag thumbnails to reorder (mock UI).</p>} />;
}
