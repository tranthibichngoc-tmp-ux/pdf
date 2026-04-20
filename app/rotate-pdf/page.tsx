import ToolPage from "@/components/ToolPage";

export const metadata = { title: "Rotate PDF — FreePDF" };

export default function Page() {
  return (
    <ToolPage
      title="Rotate PDF"
      description="Rotate pages 90°, 180°, or 270°."
      actionLabel="Rotate"
      options={
        <div className="flex gap-2">
          {["90°", "180°", "270°"].map(a => <button key={a} className="btn-secondary text-sm">{a} clockwise</button>)}
        </div>
      }
    />
  );
}
