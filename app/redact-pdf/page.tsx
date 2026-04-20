import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Redact PDF - Remove sensitive information",
  description: "Permanently black out sensitive text in PDFs. Free redaction tool.",
};

export default function RedactPDF() {
  return (
    <ToolPage
      title="Redact PDF"
      description="Permanently remove sensitive information. True redaction, not just overlay."
      accept=".pdf"
      actionLabel="Apply redactions"
      options={
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Redaction color</label>
            <div className="mt-2 flex gap-2">
              <button className="h-8 w-8 rounded bg-black border-2 border-brand-600"></button>
              <button className="h-8 w-8 rounded bg-white border"></button>
            </div>
          </div>
        </div>
      }
    />
  );
}