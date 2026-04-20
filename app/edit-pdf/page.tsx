import ToolPage from "@/components/ToolPage";

export const metadata = {
  title: "Edit PDF - Free tool",
  description: "Edit PDF text and images directly in your browser. Free, no watermarks.",
};

export default function EditPDF() {
  return (
    <ToolPage
      title="Edit PDF"
      description="Add text, images, and shapes to your PDF. All processing happens locally."
      accept=".pdf"
      actionLabel="Apply edits"
      options={
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Mode</label>
            <div className="mt-2 flex gap-2">
              <button className="btn-secondary">Add Text</button>
              <button className="btn-ghost">Add Image</button>
              <button className="btn-ghost">Draw</button>
            </div>
          </div>
        </div>
      }
    />
  );
}