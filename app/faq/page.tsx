export const metadata = {
  title: "FAQ - Free PDF Tools",
  description: "Common questions about privacy, limits, and free access.",
};

const faqs = [
  { q: "Is it really free?", a: "Yes. All core tools are free forever. No watermarks, no daily limits." },
  { q: "Do my files upload to your servers?", a: "No. Everything processes locally in your browser. Files never leave your device." },
  { q: "Do I need to sign up?", a: "No signup required for any core tool." },
  { q: "What are the file size limits?", a: "Limited only by your device memory. Most browsers handle 500MB+ files easily." },
  { q: "Is my data private?", a: "Completely. We cannot see your files because they never upload." },
  { q: "Does it work offline?", a: "Yes, after first load. Tools run entirely client-side." },
];

export default function FAQ() {
  return (
    <div className="container-narrow py-16 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((f) => (
          <div key={f.q} className="card p-6">
            <h3 className="font-medium mb-2">{f.q}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}