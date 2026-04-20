import ToolPage from "@/components/ToolPage";
export const metadata = { title: "Add Page Numbers — FreePDF" };
export default function Page() {
  return <ToolPage title="Add Page Numbers" description="Insert page numbers into your PDF." actionLabel="Add Numbers" options={<div className="grid md:grid-cols-3 gap-3"><select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"><option>Bottom center</option><option>Bottom right</option><option>Top center</option></select><input placeholder="Start at" defaultValue="1" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" /><select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"><option>1, 2, 3</option><option>Page 1</option></select></div>} />;
}
