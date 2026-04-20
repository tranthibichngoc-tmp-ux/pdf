import ToolPage from "@/components/ToolPage";
export const metadata = { title: "Protect PDF — FreePDF" };
export default function Page() {
  return <ToolPage title="Protect PDF" description="Add password protection to your PDF." actionLabel="Protect" options={<div className="space-y-2"><input type="password" placeholder="Password" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" /><input type="password" placeholder="Confirm password" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" /></div>} />;
}
