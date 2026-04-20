import ToolPage from "@/components/ToolPage";

export const metadata = { title: "Word to PDF — FreePDF" };

export default function Page() {
  return <ToolPage title="Word to PDF" description="Convert DOC and DOCX to PDF." accept=".doc,.docx" actionLabel="Convert to PDF" />;
}
