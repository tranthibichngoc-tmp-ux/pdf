import ToolPage from "@/components/ToolPage";
export const metadata = { title: "Unlock PDF — FreePDF" };
export default function Page() {
  return <ToolPage title="Unlock PDF" description="Remove password from PDF (if you know it)." actionLabel="Unlock" options={<input type="password" placeholder="Current password" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />} />;
}
