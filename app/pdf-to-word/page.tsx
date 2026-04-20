import ToolPage from "@/components/ToolPage";

export const metadata = { title: "PDF to Word — FreePDF" };

export default function Page() {
  return (
    <ToolPage
      title="PDF to Word"
      description="Convert PDF to editable Word DOCX."
      actionLabel="Convert to Word"
    />
  );
}
