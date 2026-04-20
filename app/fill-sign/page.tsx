import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Fill and Sign PDF - Free",
  description: "Fill forms and add signatures to PDFs. No signup required.",
};

export default function FillSign() {
  return (
    <ToolPage
      title="Fill and Sign"
      description="Complete forms and add your signature. Everything stays on your device."
      accept=".pdf"
      actionLabel="Download signed PDF"
      options={
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Signature</label>
            <div className="mt-2 h-24 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-sm text-slate-500">
              Draw or type signature here
            </div>
          </div>
        </div>
      }
    />
  );
}