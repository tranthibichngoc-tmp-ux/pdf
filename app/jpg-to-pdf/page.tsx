import ToolPage from "@/components/ToolPage";

export const metadata = { title: "JPG to PDF — FreePDF" };

export default function Page() {
  return <ToolPage title="JPG to PDF" description="Convert JPG images to a PDF document." accept=".jpg,.jpeg" multiple actionLabel="Create PDF" />;
}
