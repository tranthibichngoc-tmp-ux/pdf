import ToolPage from "@/components/ToolPage";

export const metadata = { title: "Compress PDF — FreePDF" };

export default function Page() {
  return (
    <ToolPage
      title="Compress PDF"
      description="Reduce PDF file size while preserving quality."
      actionLabel="Compress"
      options={
        <div>
          <label className="text-sm block mb-2">Compression level</label>
          <div className="grid grid-cols-3 gap-2">
            {["Low (high quality)", "Medium", "High (smallest)"].map((l,i)=>(
              <button key={l} className={i===1 ? "btn-primary text-xs" : "btn-secondary text-xs"}>{l}</button>
            ))}
          </div>
        </div>
      }
    />
  );
}
