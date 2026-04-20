import ToolPage from "@/components/ToolPage";
export const metadata = { title: "PNG to PDF — FreePDF" };
export default function Page() {
  return <ToolPage title="PNG to PDF" description="Convert PNG images to PDF." accept=".png" multiple actionLabel="Create PDF" />;
}
